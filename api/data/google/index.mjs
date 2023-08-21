import {OAuth2Client} from "google-auth-library";
import {google} from "googleapis";
import refreshTokens from "../../auth/google/_refreshTokens.mjs";

const client_id = process.env.CLIENT_ID
const secret = process.env.CLIENT_SECRET
const unlocksbackupfilename = process.env.UNLOCKS_BACKUP_FILE_NAME

const oAuth2Client = new OAuth2Client(
  client_id,
  secret
);

export default async function handler(request, response) {
  const { tokens, unlocks } = request.body;
  const body = {};
  let status = 200;

  const tokensToUse = await refreshTokens(tokens);
  oAuth2Client.setCredentials(tokensToUse.tokens);

  body.credentials = tokens.refreshed ? tokensToUse : null;

  const drive = google.drive({version: 'v3', auth: oAuth2Client});
  const files = await getFiles(drive)
  const unlocksBackupFile = findFile(files, unlocksbackupfilename);
  if (!unlocksBackupFile) {
    await createFileWithData(drive, unlocksbackupfilename, unlocks)
  } else {
    await updateFileWithData(drive, unlocksBackupFile.id, unlocks)
  }
  
  response.status(status).json(body);
}

const getFiles = async (drive) => {
  const res = await drive.files.list({
    pageSize: 10,
    fields: 'nextPageToken, files(id, name)',
  });
  return res.data.files;
}

const findFile = (files, name) => {
  if (files.length > 0) {
    return files.find(file => file.name === name);
  }
  return null;
}

const createFileWithData = async (drive, name, data) => {
  // Create folder
  const res = await drive.files.create({
    requestBody: {
      name: "Remnant2Tools",
      mimeType: 'application/vnd.google-apps.folder'
    }
  });

  if (res.status === 200) {
    const folderId = res.data.id;
    await drive.files.create({
      requestBody: {
        name,
        mimeType: 'text/plain',
        parents: [folderId]
      },
      media: {
        mimeType: 'text/plain',
        body: data
      }
    });
  }
}

const updateFileWithData = async (drive, id, data) => {
  await drive.files.update({
    fileId: id,
    media: {
      mimeType: 'text/plain',
      body: data
    }
  });
}
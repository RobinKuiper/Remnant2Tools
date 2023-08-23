import zlib from "zlib";

export const config = {
  api: {
    bodyParser: false
  }
}

export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get('file');
  const buffer = await file.arrayBuffer()
  const converted = decompressSave(Buffer.from(buffer)).toString().toLowerCase();

  return new Response(
    JSON.stringify({
      converted
    }),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    },
  );
}

function readChunkHeader(buffer) {
  return {
    unknown: buffer.readBigUInt64LE(0),
    unknown2: buffer.readBigUInt64LE(8),
    unknown3: buffer.readUInt8(16),
    CompressedSize1: buffer.readBigUInt64LE(17),
    DecompressedSize1: buffer.readBigUInt64LE(25),
    CompressedSize2: buffer.readBigUInt64LE(33),
    DecompressedSize2: buffer.readBigUInt64LE(41)
  };
}

function decompressSave(fileBuffer) {
  const memstream = [];
  let offset = 0xC;

  while (offset < fileBuffer.length) {
    const headerBuffer = fileBuffer.slice(offset, offset + 49); // Adjust the length accordingly
    const header = readChunkHeader(headerBuffer);

    const compressedData = fileBuffer.slice(offset + 49, offset + 49 + Number(header.CompressedSize1));
    const decompressedData = zlib.inflateSync(compressedData);

    memstream.push(decompressedData);
    offset += 49 + Number(header.CompressedSize1);
  }

  return Buffer.concat(memstream);
}
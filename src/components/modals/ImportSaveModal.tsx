import "./ImportSaveModal.scss";
import React, { useState } from "react";
import Modal from "react-modal";
import { Link, graphql, useStaticQuery } from "gatsby";
import Loader from "../Loader";
import { FileUploader } from "react-drag-drop-files";
import { toast } from "react-toastify";
import { AiOutlineClose, AiOutlineFileAdd, AiOutlineMergeCells, AiOutlineSave, AiOutlineWarning } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../hooks";
import type { RootState } from "../../store";
import { updateUnlocks } from "../../features/data/dataSlice";

Modal.setAppElement("#___gatsby");

interface Props {
  setIsOpen: (value: ((prevState: boolean) => boolean) | boolean) => void;
  isOpen: boolean;
}

const ImportSaveModal = ({ setIsOpen, isOpen }: Props) => {
  const data = useStaticQuery(graphql`
    {
      items: allItem(
        filter: {
          category: {
            in: [
              "mutators"
              "armor"
              "rings"
              "amulets"
              "relics"
              "relicfragments"
              "mods"
              "traits"
              "weapons"
              "archetypes"
            ]
          }
          links: { weapon: { externalId: { eq: null } } }
        }
      ) {
        nodes {
          externalId
          name
          category
          fragment
        }
      }
    }
  `);
  const { items } = data;
  const dispatch = useAppDispatch();
  const { unlocks } = useAppSelector((state: RootState) => state.data);
  const [loading, setLoading] = useState(false);
  // const [notInUnlocksData, setNotInUnlocksData] = useState<{ name: string; category: string }[] | null>();
  const [notInUnlocksIds, setNotInUnlocksIds] = useState<number[] | null>();

  const closeModal = () => {
    setIsOpen(false);
    // setNotInUnlocksData(null);
    setNotInUnlocksIds(null);
  };

  const handleFile = async files => {
    const file = files[0];
    if (!file) {
      return;
    }

    setLoading(true);

    const formdata = new FormData();
    formdata.append("file", file);
    const result = await fetch("/api/data/convert", {
      method: "POST",
      body: formdata,
    });

    const { converted: contents } = await result.json();

    const decompressedData = contents.toString().toLowerCase();
    const foundIds = [];
    items.nodes.forEach(item => {
      const name = item.name.replace(/[^a-zA-Z]/g, "").toLowerCase();
      // console.log(`Checking ${name}`)
      if (decompressedData.includes(name)) {
        // console.log(`File includes ${name}`)
        foundIds.push(item.externalId);
      }
    });

    // const notInCurrentUnlocks = [];
    const idsNotInCurrentUnlocks = [];
    foundIds.forEach(id => {
      const item = items.nodes.find(item => item.externalId === id);
      if (!unlocks.includes(id) && item) {
        // notInCurrentUnlocks.push({ name: item.name, category: item.category });
        idsNotInCurrentUnlocks.push(id);
      }
    });

    // setNotInUnlocksData(notInCurrentUnlocks);
    setNotInUnlocksIds(idsNotInCurrentUnlocks);
    setLoading(false);
  };

  const endConvert = () => {
    dispatch(updateUnlocks());
    closeModal();
  };

  const mergeData = () => {
    localStorage.setItem("data", JSON.stringify([...unlocks, ...notInUnlocksIds]));
    toast.success("Successfully merged data");
    endConvert();
  };

  const overwriteData = () => {
    localStorage.setItem("data", JSON.stringify(notInUnlocksIds));
    toast.success("Successfully overwritten data");
    endConvert();
  };

  const renderFileUploaderOrResult = () => {
    if (!notInUnlocksIds) {
      return (
        <FileUploader
          multiple={true}
          handleChange={handleFile}
          name="file"
          types={["sav"]}
          classes="dropzone"
          children={
            <div className="dropzone-content">
              <AiOutlineFileAdd size={25} color="#a65252" />
              <div className="dropzone-description">
                <span>
                  <span className="underline">Upload</span> or drop a file right here
                </span>
                <span title="types: sav" className="file-types">
                  sav
                </span>
              </div>
            </div>
          }
        />
      );
    } else {
      return (
        <div>
          <p>
            Found items not in your unlocks: <strong>{notInUnlocksIds.length}</strong>
          </p>
          <div className="buttons">
            <button className="merge" onClick={mergeData}>
              <AiOutlineMergeCells size={25} />
              Merge
            </button>
            <button className="overwrite" onClick={overwriteData}>
              <AiOutlineWarning size={25} />
              Overwrite
            </button>
          </div>
        </div>
      );
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Select Item"
      className="modal"
      overlayClassName="overlay"
    >
      <div className="import-save-modal-container">
        <button className="close" onClick={closeModal}>
          <AiOutlineClose size={20} />
        </button>

        <h2>
          <AiOutlineSave size={30} />
          Import Save File
        </h2>

        <div className="description">
          <p>
            To effortlessly import unlocked states you can use the file selector below.
            <br />
            Your save file will be decompressed and read out as good as possible.
            <br />
          </p>

          <p>
            You can find your save file in the following location:
            <pre>C:\Users\_your_username_\Saved Games\Remnant2\Steam\_steam_id_\</pre>
          </p>
        </div>

        {loading ? <Loader loading={loading} color="#000" /> : renderFileUploaderOrResult()}

        <p>
          The idea for the code to decompress the save file comes from{" "}
          <Link to="https://github.com/Razzmatazzz" target="_blank">
            Razzmatazzz
          </Link>
          <br />
          Please give him a well deserved thank you!
        </p>
      </div>
    </Modal>
  );
};

export default ImportSaveModal;

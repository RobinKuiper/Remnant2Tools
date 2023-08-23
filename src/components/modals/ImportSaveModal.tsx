import React, {useState} from "react";
import Modal from "react-modal";
import {styled} from "styled-components";
import {Link, graphql, useStaticQuery} from "gatsby";
import Loader from "../Loader";
import {FileUploader} from "react-drag-drop-files";
import {toast} from "react-toastify";
import {AiOutlineFileAdd, AiOutlineMergeCells, AiOutlineWarning} from "react-icons/ai";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {RootState} from "../../store";
import {updateUnlocks} from "../../features/data/dataSlice";

Modal.setAppElement("#___gatsby");

interface Props {
  setIsOpen: (value: ((prevState: boolean) => boolean) | boolean) => void;
  isOpen: boolean;
}

const ImportSaveModal = ({setIsOpen, isOpen}: Props) => {
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
  const {items} = data;
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

    const {converted: contents} = await result.json();

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
    dispatch(updateUnlocks())
    closeModal();
  }

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
              <AiOutlineFileAdd size={25} color="#a65252"/>
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
              <AiOutlineMergeCells size={25}/>
              Merge
            </button>
            <button className="overwrite" onClick={overwriteData}>
              <AiOutlineWarning size={25}/>
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
      <Content>
        <h2>Import Save File</h2>

        <div className="description">
          <p>
            To effortlessly import unlocked states you can use the awesome tool from{" "}
            <Link to="https://github.com/Razzmatazzz" target="_blank">
              Razzmatazzz
            </Link>
            ;{" "}
            <Link to="https://github.com/Razzmatazzz/RemnantSaveGuardian/releases" _target="_blank">
              Remnant Save Guardian
            </Link>
            <br/>
            In{" "}
            <Link to="https://github.com/Razzmatazzz/RemnantSaveGuardian/releases" _target="_blank">
              Remnant Save Guardian
            </Link>{" "}
            you can export your saves as plain text, which you can use to save your progress here.
          </p>

          <p>
            Don't forget to thank{" "}
            <Link to="https://github.com/Razzmatazzz" target="_blank">
              Razzmatazzz
            </Link>{" "}
            for his amazing work!
          </p>
        </div>

        {loading ? <Loader loading={loading} color="#000"/> : renderFileUploaderOrResult()}
      </Content>
    </Modal>
  );
};

export default ImportSaveModal;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  margin: 0 20px;

  //min-width: 400px;
  //height: 70%;
  background-color: #f1f1f1;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.7);

  p {
    a {
      color: darkred;
      text-decoration: none;
      transition: color 0.3s ease;

      &:hover {
        color: red;
      }
    }
  }

  .dropzone {
    border: 2px dashed #a65252;
    padding: 10px;
    cursor: pointer;

    .dropzone-content {
      display: flex;
      align-items: center;
      gap: 5px;

      .dropzone-description {
        display: flex;
        justify-content: space-between;
        flex-grow: 1;

        & > span {
          font-size: 12px;
          color: rgb(102, 102, 102);
        }

        &.file-types {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          max-width: 100px;
        }

        .underline {
          text-decoration: underline;
        }
      }
    }
  }

  .buttons {
    display: flex;
    gap: 10px;

    button {
      display: flex;
      align-items: center;
      gap: 5px;
      padding: 10px 10px 10px 5px;
      color: #fff;

      &.merge {
        background: #4242e1;

        &:hover {
          background: #3030e0;
        }
      }

      &.overwrite {
        background: #e04d4d;

        &:hover {
          background: #c52828;
        }
      }
    }
  }
`;

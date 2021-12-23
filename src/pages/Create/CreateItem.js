import React, { useState } from "react";
import "./CreateItem.css";
import { BsImage, BsFillExclamationTriangleFill } from "react-icons/bs";
import { Web3Storage } from "web3.storage";
import {create} from '../../functions/functions'
const pinataSDK = require('@pinata/sdk');



const CreateItem = () => {
  const pinata = pinataSDK('5808d8dd3adf27708b39', '488f930d1fdaede40ffabae65afdc2d25a8172d8f33d7208d537416c4e9d3b6b');
  const token = process.env.REACT_APP_WEB3_TOKEN;
  const client = new Web3Storage({ token });
  const [file, setFile] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageName,setImageName] = useState(null);
  const [imagePrice,setImagePrice] = useState(null);

  let cid;
  const uploadFile = () => {
    document.getElementById("fileUpload").click();
  };

  const handleFileChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
    setSelectedFile(e.target.files);
  };

  const onNameChange = (e) =>{  
    setImageName(e.target.value)
  }

  const onPriceChange = (e) =>{  
    setImagePrice(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedFile == null && imageName==null && imagePrice==null) {
      window.alert("Please select a file to upload || please fill all the details");
    } else {
      console.log(selectedFile)
      cid = await client.put(selectedFile);
      if (cid) {
        console.log(`https://${cid}.ipfs.dweb.link/${selectedFile[0].name}`);

        const obj = {
          "description": `${imageName}`, 
          "external_url": `https://${cid}.ipfs.dweb.link/${selectedFile[0].name}`, 
          "image": `https://${cid}.ipfs.dweb.link/${selectedFile[0].name}`, 
          "name": `${imageName}`,
          "attributes": [{
              "trait_type": "Color", 
              "value": "Default"
            }
          ]
      }

        pinata.pinJSONToIPFS(obj).then(async(result) => {
          console.log(result.IpfsHash,'pinata true');
          await create(('https://gateway.pinata.cloud/ipfs/' + `${result.IpfsHash}`),imagePrice)
      }).catch((err) => {
          console.log(err);
      });

        setSelectedFile(null);
        window.alert("File uploaded successfully");
        setFile(null);
        setImageName(null);
        setImagePrice(null);
      }
    }
  };

  return (
    <div className="create-item-page">
      <h1 className="create-item-head">Create new item</h1>
      <div className="image-upload">
        {console.log(selectedFile, "file")}
        <h4 className="subheads">Image, Video, Audio, or 3D Model</h4>
        <p className="text-tag">
          File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG,
          GLB, GLTF. Max size: 100 MB
        </p>
        <button onClick={() => uploadFile()}>
          {file ? (
            <img src={file} alt="preview" />
          ) : (
            <BsImage className="upload-icon" />
          )}
        </button>
        <input
          onChange={handleFileChange}
          accept="image/*,video/*,audio/*,webgl/*,.glb,.gltf"
          id="fileUpload"
          type="file"
          className="file-upload"
          hidden
        />
      </div>

      <div className="text-fields">
        <h4 className="subheads">Name</h4>
        <input
          type="text"
          className="name-input"
          placeholder="Item Name"
          required
          onChange={onNameChange}
        />
        <input type="number" className="price-input" placeholder="Price" onChange={onPriceChange}/>
        {/* <h4 className="subheads">External Link</h4>
        <p className="text-tag">
          OpenSea will include a link to this URL on this item's detail page, so
          that users can click to learn more about it. You are welcome to link
          to your own webpage with more details.
        </p>
        <input
          type="text"
          className="name-input"
          placeholder="https://yoursite.io/item/123"
        />
        <h4 className="subheads">Description</h4>
        <p className="text-tag">
          The description will be included on the item's detail page underneath
          its image.{" "}
          <a
            className="info-link"
            href="https://www.markdownguide.org/cheat-sheet/"
          >
            Markdown
          </a>{" "}
          syntax is supported.
        </p>
        <textarea
          rows="2"
          cols="50"
          className="resizable-input"
          placeholder="Provide a detailed description of your item."
        />
        <h4 className="subheads">Collection</h4>
        <p className="text-tag">
          This is the collection where your item will appear. ⓘ
        </p>
        <input
          list="collections"
          className="collection-dropdown"
          placeholder="Select collection"
        />
        <datalist id="collections">
          <option value=" " />
        </datalist> */}
      </div>
      {/* <div className="grid-boxes">
        <div className="horizontal-card properties">
          <div className="col-one">
            <AiOutlineMenuFold className="icon" />
            <div className="text-content">
              <h4 className="subheads">Properties</h4>
              <h5>Textual traits that show up as rectangles</h5>
            </div>
          </div>
          <IoMdAdd
            onClick={() => setProperties(!properties)}
            className="add-icon"
          />
          {properties ? (
            <>
              <div className="modal-bg">
                <div className="modal">
                  <div className="modal-main-head-holder">
                    <h1 className="modal-head">Add Properties </h1>
                    <FaTimes
                      onClick={() => setProperties(!properties)}
                      className="close-modal-icon"
                    />
                  </div>
                  <div className="modal-content">
                    <h3 className="modal-subhead">
                      Properties show up underneath your item, are clickable,
                      and can be filtered in your collection's sidebar.
                    </h3>
                    <div className="secondary-head-holder">
                      <h3 className="secondary-head">Type</h3>
                      <h3 className="secondary-head">Name</h3>
                    </div>
                    <div className="input-holder">
                      <FaTimes className="delete-button" />
                      <input
                        className="input-with-shadow character-input"
                        type="text"
                        placeholder="Character"
                      />
                      <input
                        className="input-with-shadow name-modal-input"
                        type="text"
                        placeholder="Male"
                      />
                    </div>
                    <button className="add-button">Add more</button>
                  </div>
                  <button type="submit" className="save-button">
                    Save
                  </button>
                </div>
              </div>
            </>
          ) : null}
        </div>
        <div className="horizontal-card levels">
          <div className="col-one">
            <RiStarSFill className="icon" />
            <div className="text-content">
              <h4 className="subheads">Levels</h4>
              <h5>Numerical traits that show as a progress bar</h5>
            </div>
          </div>
          <IoMdAdd className="add-icon" onClick={() => setLevels(!levels)} />
          {levels ? (
            <>
              <div className="modal-bg">
                <div className="modal">
                  <div className="modal-main-head-holder">
                    <h1 className="modal-head">Add Levels</h1>
                    <FaTimes
                      onClick={() => setLevels(!levels)}
                      className="close-modal-icon"
                    />
                  </div>
                  <div className="modal-content">
                    <h3 className="modal-subhead">
                      Levels show up underneath your item, are clickable, and
                      can be filtered in your collection's sidebar.
                    </h3>
                    <div className="secondary-head-holder">
                      <h3 className="secondary-head">Name</h3>
                      <h3 className="secondary-head">Value</h3>
                    </div>
                    <div className="input-holder">
                      <FaTimes className="delete-button" />
                      <input
                        className="input-with-shadow speed-input"
                        type="text"
                        placeholder="Speed"
                      />
                      <input
                        className="input-with-shadow name-modal-input"
                        type="text"
                        placeholder="3"
                      />
                      <input
                        className="input-with-shadow"
                        style={{ width: "20%" }}
                        value="Of"
                        disabled
                      />
                      <input className="input-with-shadow" type="number" />
                    </div>
                    <button className="add-button">Add more</button>
                  </div>
                  <button type="submit" className="save-button">
                    Save
                  </button>
                </div>
              </div>
            </>
          ) : null}
        </div>
        <div className="horizontal-card stats">
          <div className="col-one">
            <IoIosStats className="icon" />
            <div className="text-content">
              <h4 className="subheads">Stats</h4>
              <h5>Numerical traits that just show as numbers</h5>
            </div>
          </div>
          <IoMdAdd className="add-icon" onClick={() => setStats(!stats)} />
          {stats ? (
            <>
              <div className="modal-bg">
                <div className="modal">
                  <div className="modal-main-head-holder">
                    <h1 className="modal-head">Add Stats</h1>
                    <FaTimes
                      onClick={() => setStats(!stats)}
                      className="close-modal-icon"
                    />
                  </div>
                  <div className="modal-content">
                    <h3 className="modal-subhead">
                      Stats show up underneath your item, are clickable, and can
                      be filtered in your collection's sidebar.
                    </h3>
                    <div className="secondary-head-holder">
                      <h3 className="secondary-head">Name</h3>
                      <h3 className="secondary-head">Value</h3>
                    </div>
                    <div className="input-holder">
                      <FaTimes className="delete-button" />
                      <input
                        className="input-with-shadow speed-input"
                        type="text"
                        placeholder="Speed"
                      />
                      <input
                        className="input-with-shadow name-modal-input"
                        type="text"
                        placeholder="3"
                      />
                      <input
                        className="input-with-shadow"
                        style={{ width: "20%" }}
                        value="Of"
                        disabled
                      />
                      <input className="input-with-shadow" type="number" />
                    </div>
                    <button className="add-button">Add more</button>
                  </div>
                  <button type="submit" className="save-button">
                    Save
                  </button>
                </div>
              </div>
            </>
          ) : null}
        </div>
        <div className="horizontal-card unlockable-content">
          <div className="col-one">
            <FiUnlock className="icon" />
            <div className="text-content">
              <h4 className="subheads">Unlockable Content</h4>
              <h5>
                Include unlockable content that can only be revealed by the
                owner of the item.
              </h5>
            </div>
          </div>
          <input
            onChange={(e) => SetUnlockable(e.target.checked)}
            className="styled-checkbox"
            type="checkbox"
          />
        </div>
        {unlockable ? (
          <>
            <textarea
              rows="3"
              cols="50"
              className="resizable-input second-input"
              placeholder="Enter content (access key, code to redeem, link to a file, etc.)"
            />
            <h5 className="markdwn-supprted">
              <a
                className="info-link"
                href="https://www.markdownguide.org/cheat-sheet/"
              >
                Markdown
              </a>{" "}
              syntax is supported.
            </h5>
          </>
        ) : null}
        <div className="horizontal-card unlockable-content explict-content">
          <div className="col-one">
            <BsFillExclamationTriangleFill className="icon" />
            <div className="text-content">
              <h4 className="subheads">Explicit & Sensitive Content</h4>
              <h5>Set this item as explicit and sensitive content ⓘ</h5>
            </div>
          </div>
          <input className="styled-checkbox" type="checkbox" />
        </div>
      </div>
      <div className="text-fields bottom-comp">
        <h4 className="subheads">Supply</h4>
        <p className="text-tag">
          The number of copies that can be minted. No gas cost to you!
          Quantities above one coming soon. ⓘ
        </p>
        <input
          type="text"
          value="1"
          className="name-input disabled-input"
          disabled
        />
        <h4 className="subheads">Blockchain</h4>
        <select className="blockchain-dropdown">
          <option value="Ethereum">Ethereum</option>
        </select>
        <h4 className="subheads">Freeze metadata ⓘ</h4>
        <p className="text-tag">
          Freezing your metadata will allow you to permanently lock and store
          all of this item's content in decentralized file storage.
        </p>
        <input
          type="text"
          value="To freeze your metadata, you must create your item first."
          className="name-input "
          disabled
        />
      </div> */}
      <div className="bottom-button">
        <button onClick={handleSubmit} className="submit-button">
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateItem;

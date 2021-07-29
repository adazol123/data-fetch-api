import React, { useContext } from "react";
import DataContext from "../../util/DataContext";
import { Modal } from "../Modals/Modal";

const NewsModal = () => {
  const { toggle, setToggle, selectedItem } = useContext(DataContext);

  if(!selectedItem) return <Modal toggle={toggle} setToggle={setToggle}>Loading...</Modal>

  return (

    <Modal toggle={toggle} setToggle={setToggle}>
      <p className="modal-info">Do you want to visit?</p>
      <p className="modal-subtitle">{selectedItem[0] && selectedItem[0]}</p>
      <p className="modal-link">
        Source:
        <span className="url"> {selectedItem[2] && selectedItem[2].name}</span>
      </p>
      <div className="modal-footer">
        <a
          href={selectedItem[1] && selectedItem[1]}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setToggle((prev) => false)}
        >
          Continue
        </a>
        <button onClick={() => setToggle((prev) => false)}>Cancel</button>
      </div>
    </Modal>

  );
};

export default NewsModal;

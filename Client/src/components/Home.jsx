import React, { useState } from "react";
import Tablecomp from "./Tablecomp";
import Modal from "./Modal";
import "../index.css";
const Home = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      {showModal ? (
        <Modal setShowModal={setShowModal} />
      ) : (
        <div className="homediv">
          <center className="centerr">
            <h3>Entity Table</h3>
          </center>
          <Tablecomp />
          <center>
            <button onClick={() => setShowModal(true)} className="add">
              Add Entry
            </button>
          </center>
        </div>
      )}
    </>
  );
};

export default Home;

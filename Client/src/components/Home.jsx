import React, { useEffect, useState } from "react";
import Tablecomp from "./Tablecomp";
import Modal from "./Modal";
import "../index.css";

const Home = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
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

      {showModal && <Modal setShowModal={setShowModal} />}
    </>
  );
};
export default Home;

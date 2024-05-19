import React from "react";
import axios from "axios";
import { CircleX } from "lucide-react";


  return (
    <button onClick={handleDelete} className="deleteButton">
      <CircleX />
    </button>
  );
};

export default DeleteButton;

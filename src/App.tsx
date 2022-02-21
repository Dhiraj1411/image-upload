import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Album from "./album";
import FullScreenUploadImg from "./uploadImg";
function App() {
  const [openUplodImg, setOpenUploadImg] = useState(false);
  const openFullScreenUploadImg = () => {
    setOpenUploadImg(true);
  };

  const handleClose = () => {
    setOpenUploadImg(false);
  };

  return (
    <React.Fragment>
      <Album />
      <Fab
        style={{ position: "fixed", bottom: 20, right: 20 }}
        color="primary"
        aria-label="add"
        onClick={openFullScreenUploadImg}
      >
        <AddIcon />
      </Fab>
      <FullScreenUploadImg hideDialog={handleClose} open={openUplodImg} />
    </React.Fragment>
  );
}

export default App;

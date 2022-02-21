import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { useState } from "react";

interface Props {
  open: boolean;
  hideDialog: Function;
}

const Input = styled("input")({
  display: "none",
});

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenUploadImg(props: Props) {
  const theme = createTheme({
    palette: {
      mode: "light",
    },
  });
  const [open, setOpen] = React.useState(false);

  const [formField, setFormField] = useState({
    title: "",
    image: "",
    description: "",
  });

  React.useEffect(() => {
    setOpen(props.open);
  }, [props]);

  const handleClose = () => {
    props.hideDialog(false);
  };

  const handleChange = (event: any) => {
    if (event.target.id === "imgTitle")
      setFormField((prevState) => ({
        ...prevState,
        title: event.target.value,
      }));
    if (event.target.id === "imgDescription")
      setFormField((prevState) => ({
        ...prevState,
        description: event.target.value,
      }));
    if (event.target.id === "imgPicker")
      setFormField((prevState) => ({
        ...prevState,
        image: event.target.value,
      }));

    console.log(formField);

    const formData = new FormData();
    formData.append("title", formField.title);
    formData.append("image", formField.image);
    formData.append("description", formField.description);

    fetch("url", {
      method: "POST",
      mode: "cors",
      body: formData,
    }).then((success) => {
      console.log(success);
    });
  };

  const submit = () => {
    handleClose();
    console.log(formField);
    alert("Form has been submitted");
  };

  return (
    <ThemeProvider theme={theme}>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography
              sx={{ ml: 2, flex: 1 }}
              variant="h6"
              component="div"
            ></Typography>
            <Button autoFocus color="inherit" onClick={submit}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <Box
          style={{ margin: "20px" }}
          component="form"
          noValidate={false}
          autoComplete="off"
          onSubmit={submit}
        >
          <TextField
            style={{ marginBottom: "30px" }}
            fullWidth={true}
            id="imgTitle"
            label="Title"
            variant="standard"
            value={formField.title}
            onChange={handleChange}
          />
          <input type="file" id="imgPicker" onChange={handleChange} />
          <TextField
            fullWidth={true}
            multiline={true}
            style={{ marginTop: "20px" }}
            id="imgDescription"
            label="Description"
            variant="standard"
            value={formField.description}
            onChange={handleChange}
          />
        </Box>
      </Dialog>
    </ThemeProvider>
  );
}

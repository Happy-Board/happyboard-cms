"use client";

import * as React from "react";
import styles from "./src/styles/popup.module.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { MdAddCircle, MdBuild, MdClose } from "react-icons/md";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

import { useCreateCat } from "./src/hooks/Categories/useCreateCat";
import { useUpdateCat } from "./src/hooks/Categories/useUpdateCat";
import { Flip, toast } from "react-toastify";
import { IconButton } from "@mui/material";

library.add(fas);

const style = {
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#151c2c",
  border: "none",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
  gap: "20px",
};

const iconList = [
  "newspaper",
  "book",
  "globe",
  "rss",
  "calendar-alt",
  "tag",
  "bookmark",
  "pen",
  "pencil-alt",
  "table",
  "image",
  "video",
  "microphone",
  "mobile-alt",
  "lightbulb",
  "bullhorn",
  "flag",
  "star",
  "heart",
  "laptop",
  "icons",
  "burger",
  "futbol",
  "compass-drafting",
];

const PopUp = ({ onCategoryAdded }) => {
  const [open, setOpen] = React.useState(false);
  const [selectedIcon, setSelectedIcon] = React.useState("");
  const [catTitle, setCatTitle] = React.useState("");
  const [catDesc, setCatDesc] = React.useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const { loadCreate } = useCreateCat();

  const handleIconChange = (event) => {
    setSelectedIcon(event.target.value);
  };

  const handleSubmit = async () => {
    await loadCreate(catTitle, catDesc, selectedIcon);
    toast.success("New category is created successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Flip,
      icon: ({ theme, type }) => <MdAddCircle style={{ color: "green" }} />,
    });
    handleClose();
    if (onCategoryAdded) {
      onCategoryAdded();
    }
  };

  return (
    <div>
      <button className={styles.addButton} onClick={handleOpen}>
        {" "}
        Add Category
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            ...style,
            position: "relative",
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <MdClose />
          </IconButton>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create New
          </Typography>
          <input
            className={styles.input}
            type="text"
            placeholder="New category title"
            value={catTitle}
            onChange={(e) => setCatTitle(e.target.value)}
          />
          <input
            className={styles.input}
            type="text"
            placeholder="Category description"
            value={catDesc}
            onChange={(e) => setCatDesc(e.target.value)}
          />
          <Select
            value={selectedIcon}
            onChange={handleIconChange}
            displayEmpty
            className={styles.select}
          >
            <MenuItem className={styles.menuItem} value="">
              Choose an icon
            </MenuItem>
            {iconList.map((icon) => (
              <MenuItem key={icon} value={icon}>
                <FontAwesomeIcon icon={["fa-", icon]} /> {icon}
              </MenuItem>
            ))}
          </Select>
          <button
            onClick={() => {
              handleSubmit();
            }}
            className={styles.submitBox}
          >
            {"Create Category"}
          </button>
        </Box>
      </Modal>
    </div>
  );
};
const ExistPopUp = ({ catName, catIcon, catId, onCategoryUpdated }) => {
  const [open, setOpen] = React.useState(false);
  const [selectedIcon, setSelectedIcon] = React.useState(catIcon);
  const [catTitle, setCatTitle] = React.useState(catName);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const { loadUpdate } = useUpdateCat();

  const handleIconChange = (event) => {
    setSelectedIcon(event.target.value);
  };

  const handleSubmit = async () => {
    await loadUpdate(catId, catTitle, selectedIcon);
    toast.success("Category's updated successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Flip,
      icon: ({ theme, type }) => <MdBuild style={{ color: "green" }} />,
    });
    handleClose();
    if (onCategoryUpdated) {
      onCategoryUpdated();
    }
  };

  return (
    <div>
      <button
        className={`${styles.status} ${styles.fix}`}
        title="Fix"
        onClick={handleOpen}
      >
        <MdBuild />
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            ...style,
            position: "relative",
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <MdClose />
          </IconButton>
          <Typography id="modal-modal-description" variant="h6" component="h2">
            Update Category
          </Typography>
          <input
            className={styles.input}
            type="text"
            value={catTitle}
            onChange={(e) => setCatTitle(e.target.value)}
          />

          <Select
            value={selectedIcon}
            onChange={handleIconChange}
            displayEmpty
            className={styles.select}
            renderValue={(selected) => (
              <div>
                <FontAwesomeIcon
                  icon={["fas", selected]}
                  style={{ marginRight: "10px" }}
                />
                {selected}
              </div>
            )}
          >
            {iconList.map((icon) => (
              <MenuItem key={icon} value={icon}>
                <FontAwesomeIcon
                  icon={["fas", icon]}
                  style={{ marginRight: "10px" }}
                />
                {icon}
              </MenuItem>
            ))}
          </Select>
          <button
            className={styles.submit}
            onClick={() => {
              handleSubmit();
            }}
          >
            {"Update Category"}
          </button>
        </Box>
      </Modal>
    </div>
  );
};

export { PopUp, ExistPopUp };

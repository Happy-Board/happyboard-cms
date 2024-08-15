'use client'

import * as React from 'react';
import styles from '@/styles/popup.module.css'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { MdAdd, MdBuild } from 'react-icons/md';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import { useCreateCat } from '@/hooks/Categories/useCreateCat';
import { useUpdateCat } from '@/hooks/Categories/useUpdateCat';

library.add(fas);

const style = {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#151c2c',
    border: 'none',
    boxShadow: 24,
    p: 4,
    borderRadius: '10px',
    gap: '20px'
};

const iconList = ['newspaper', 'book', 'globe', 'rss', 'calendar-alt',
    'tag', 'bookmark', 'pen', 'pencil-alt', 'table', 'image', 'video',
    'microphone', 'mobile-alt', 'lightbulb', 'bullhorn', 'flag', 'star',
    'heart', 'laptop', 'icons', 'burger', 'futbol', 'compass-drafting'];

const PopUp = () => {
    const [open, setOpen] = React.useState(false);
    const [selectedIcon, setSelectedIcon] = React.useState('');
    const [catTitle, setCatTitle] = React.useState('');
    const [catDesc, setCatDesc] = React.useState('');


    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        window.location.reload();
    };

    const { loadCreate } = useCreateCat();

    const handleIconChange = (event) => {
        setSelectedIcon(event.target.value);
    };

    const handleSubmit = () => {
        loadCreate(catTitle, catDesc, selectedIcon);
    };


    return (
        <div>
            <button className={styles.addButton} onClick={handleOpen}><MdAdd /> Add Category</button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
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
                        <MenuItem className={styles.menuItem} value="" >
                            Choose an icon
                        </MenuItem>
                        {iconList.map((icon) => (
                            <MenuItem key={icon} value={icon}>
                                <FontAwesomeIcon icon={['fa-', icon]} /> {icon}
                            </MenuItem>
                        ))}
                    </Select>
                    <button onClick={() => {
                        handleSubmit();
                        window.location.reload();
                    }} >
                        {'Create Category'}
                    </button>
                </Box>
            </Modal>
        </div>
    );
}
const ExistPopUp = ({ catName, catIcon, catId }) => {
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

    const handleSubmit = () => {
        loadUpdate(catId, catTitle, selectedIcon);
    };



    return (<div>
        <button className={`${styles.status} ${styles.fix}`} title='Fix' onClick={handleOpen}><MdBuild /></button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
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
                            <FontAwesomeIcon icon={['fas', selected]} style={{marginRight: '10px'}} />
                            {selected}
                        </div>
                    )}
                >
                    {iconList.map((icon) => (
                        <MenuItem key={icon} value={icon}>
                            <FontAwesomeIcon icon={['fas', icon]} style={{marginRight: '10px'}} />
                            {icon}
                        </MenuItem>
                    ))}
                </Select>
                <button onClick={() => {
                    handleSubmit();
                    window.location.reload();
                }} >
                    {'Update Category'}
                </button>
            </Box>
        </Modal>
    </div>);
}


export { PopUp, ExistPopUp }
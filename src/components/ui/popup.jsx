'use client'

import * as React from 'react';
import styles from '@/styles/popup.module.css'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { MdAdd, MdBuild } from 'react-icons/md';

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

const PopUp = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (<div>
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
                <input className={styles.input} type="text" placeholder={`New catgory here`} />

            </Box>
        </Modal>
    </div>);
}
const ExistPopUp = ({ catName }) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
                    Current Category
                </Typography>
                <p className={styles.catName}>{catName}</p>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Create New
                </Typography>

                <input className={styles.input} type="text" placeholder={`New catgory here`} />
            </Box>
        </Modal>
    </div>);
}


export { PopUp, ExistPopUp }
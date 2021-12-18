import { FC, ReactElement } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useDeleteBoardMutation } from '../../features/myBoards/myBoardsApi';
import { useNavigate } from 'react-router-dom';

interface Props {
    open: boolean;
    handleClose: () => void;
    slug?: string;
}

const DeleteBoard: FC<Props> = ({ open, handleClose, slug }): ReactElement => {
    const [deleteBoard, { isLoading }] = useDeleteBoardMutation();
    let navigate = useNavigate();
    const handleDeleteBoard = () => {
        deleteBoard(slug as string);
        navigate('..', { replace: true });
    };
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {'Do you want to  Delete?'}
            </DialogTitle>

            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button color="error" onClick={handleDeleteBoard} autoFocus>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteBoard;

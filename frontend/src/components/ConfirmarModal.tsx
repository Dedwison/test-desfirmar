
import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography
} from '@mui/material';

interface Props {
    open: boolean;
    onClose: () => void;
    onConfirm: () => Promise<void> | void;
    mensaje: string;
}

const ConfirmModal = ({
    open,
    onClose,
    onConfirm,
    mensaje
}: Props) => {
    const handleConfirm = async () => {
        try {
            await onConfirm();
        } catch (error) {
            console.error('Error al confirmar:', error);
        } finally {
            onClose();
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Atención</DialogTitle>
            <DialogContent>
                <Typography>{mensaje}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="error">
                    Cancelar
                </Button>
                <Button onClick={handleConfirm} variant='contained' color="primary">
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmModal;    
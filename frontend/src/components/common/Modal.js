import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Box,
  Button,
  useMediaQuery,
  useTheme,
  Divider
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

/**
 * A reusable modal component for forms and dialogs
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.open - Whether the modal is open
 * @param {function} props.onClose - Callback when modal is closed
 * @param {string} props.title - Modal title
 * @param {React.ReactNode} props.children - Modal content
 * @param {React.ReactNode} props.actions - Modal action buttons
 * @param {string} props.maxWidth - Maximum width of modal (xs, sm, md, lg, xl)
 * @param {boolean} props.fullScreen - Whether modal should be full screen on mobile
 * @param {boolean} props.disableBackdropClick - Whether clicking backdrop should close modal
 * @param {boolean} props.hideCloseButton - Whether to hide the close button
 * @param {Object} props.sx - Additional styles to apply
 */
const Modal = ({
  open,
  onClose,
  title,
  children,
  actions,
  maxWidth = 'sm',
  fullScreen = false,
  disableBackdropClick = false,
  hideCloseButton = false,
  sx = {}
}) => {
  const theme = useTheme();
  const fullScreenOnMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const handleBackdropClick = (event) => {
    if (disableBackdropClick) {
      event.stopPropagation();
    }
  };
  
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth
      fullScreen={fullScreen || (fullScreenOnMobile && fullScreen !== false)}
      onClick={handleBackdropClick}
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: { xs: fullScreen || (fullScreenOnMobile && fullScreen !== false) ? 0 : 2, sm: 2 },
          ...sx
        }
      }}
    >
      {/* Dialog Title */}
      {title && (
        <>
          <DialogTitle 
            sx={{ 
              px: 3, 
              py: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
              {title}
            </Typography>
            {!hideCloseButton && (
              <IconButton
                edge="end"
                color="inherit"
                onClick={onClose}
                aria-label="close"
                size="small"
              >
                <CloseIcon />
              </IconButton>
            )}
          </DialogTitle>
          <Divider />
        </>
      )}
      
      {/* Dialog Content */}
      <DialogContent sx={{ px: 3, py: 2 }}>
        {children}
      </DialogContent>
      
      {/* Dialog Actions */}
      {actions && (
        <>
          <Divider />
          <DialogActions sx={{ px: 3, py: 2 }}>
            {actions}
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

/**
 * Confirmation dialog component built on top of Modal
 */
export const ConfirmationDialog = ({
  open,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmColor = 'primary',
  maxWidth = 'xs',
  ...props
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      maxWidth={maxWidth}
      actions={
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <Button onClick={onClose} variant="outlined">
            {cancelText}
          </Button>
          <Button onClick={onConfirm} variant="contained" color={confirmColor}>
            {confirmText}
          </Button>
        </Box>
      }
      {...props}
    >
      <Typography variant="body1">{message}</Typography>
    </Modal>
  );
};

export default Modal;

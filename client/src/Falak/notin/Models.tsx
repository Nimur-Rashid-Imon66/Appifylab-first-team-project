

import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';


export default function Models({open, setOpen}) {

  
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

//   const handleClickOpen = () => {
//     // setOpen(true);
//   };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        fullWidth
        maxWidth="md"
        className="mx-auto"
        sx={{
            width: '100%',
            '@media (min-width:1000px)': {
              width: '80%', 
            },
            '@media (min-width:1224px)': {
              width: '50%', 
              
            },
          }}
      >
        <DialogTitle id="responsive-dialog-title">
          {"              Edit Post"}
        </DialogTitle>
        <DialogContent>
           <h1>inside models</h1>
           <button onClick={()=>setOpen(false)}>save</button>
        </DialogContent>
       
      </Dialog>
    </React.Fragment>
  );
}
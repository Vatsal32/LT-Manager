import * as React from 'react';
import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import './Pending.css';
import PropTypes from "prop-types";
export default function Pend(props) {
  return (
    <Box sx={{ width: '95%' ,bgcolor: 'background.paper',padding:'10px'}}>


      <Divider />
      <ListItemButton className='pendingitem' sx={{display:'grid'}} component="a" href="#simple-list" >
        <ListItemText className='pendingitemtext' primary={props.userName} sx={{ width: 'auto' }} />
        <ListItemText className='pendingitemlt' primary={props.LtNumber} />
        <ListItemText className='pendingitemtext' primary={props.date}/>

      </ListItemButton>
      <Divider />

    </Box>
  );
}

Pend.propTypes={
  userName:PropTypes.string.isRequired,
  LtNumber:PropTypes.string.isRequired,
  date:PropTypes.string.isRequired,
};
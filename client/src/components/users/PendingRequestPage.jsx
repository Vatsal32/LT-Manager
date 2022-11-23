import * as React from 'react';
import Box from '@mui/material/Box';

import './PendingRequestPage.css';
import pendingdata from './pendingdata';
import Pend from './Pend';
export default function PendingRequestPage() {

  const elements = pendingdata.map((item, key) => {
    return (
      <Pend
        key={key}
        userName={item.userName}
        LtNumber={item.LtNumber}
        date={item.date}
      />

    );
  });

  return (
    <div className='pendingdiv'>
      <Box className='pendingbox' sx={{ boxShadow: '10'}}>
        {elements}
      </Box>
    </div>
  );
}
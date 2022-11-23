import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import "./Help.css";
export default function SimpleAccordion() {
  return (
    <>
      <div className='helppage'>
        <Accordion className='helpdrop'>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Who can book an LT ?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              1. Normal users can send requests to book LTs after login.
            </Typography>
            <Typography>
              2. Superadmins can directly book LTs without any approvals.
            </Typography>
            <Typography>
              3. Normal admins cannot book LTs.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion className='helpdrop'>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>How to book an LT ?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              1. Anyone can view the timetable even without login.
            </Typography>
            <Typography>
              2. Selecting any cells in timetable will give a login prompt.
            </Typography>
            <Typography>
              3. After login selecting a cell will open a booking page.
            </Typography>
            <Typography>
              4. Fill in teh required details such as LT Number, select start and end date,etc and submit for approval.
            </Typography>
            <Typography>
              5. Your request will show up on timetable as red block till it is approved.
            </Typography>
          </AccordionDetails>
        </Accordion>


        <Accordion className='helpdrop'>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Why my Page says Access Denied ?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              1. If you are a normal user, you cannot approve request, add Lts or create new users.
            </Typography>
            <Typography>
              2. If you are an admin, you cannot book LTs by yourself you need to contact the superadmin.
            </Typography>
            <Typography>
              3. Normal admins cannot book LTs.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion className='helpdrop'>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>How to create an account ?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              1. A new user cannot directly create an account.
            </Typography>
            <Typography>
              2. You need to contact your admins or super adimns to create a new user and provide login credentials.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
      <div className='helpfooter'>
        <p className='helpp'>For any more queries, contact us at abc@lnmiit.ac.in</p>
      </div>
    </>
  );
}
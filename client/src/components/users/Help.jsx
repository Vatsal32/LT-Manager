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
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>{"Text in 'Batches Attending' input disappears"}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              1. This field shows the target batches which will be present in LT.
            </Typography>
            <Typography>
              2. The required format for input is 18 19 20.
            </Typography>
            <Typography>
              3. Entering more than 3 decimals will remove the number.
            </Typography>
            <Typography>
              4. So write each batch as 1 or 2 digits and seperate them by space.
            </Typography>
          </AccordionDetails>
        </Accordion>


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
              4. Fill in the required details such as LT Number, select start and end date,etc and submit for approval.
            </Typography>
            <Typography>
              5. Your request will show up on timetable as yellow block till it is approved.
            </Typography>
            {/* <img src="./images/yellow.jpg"/> */}
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


      <Accordion className='helpdrop'>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Page says please book a slot at least 3 days earlier</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              1. You must book the LT atleast 3 days prior to the event.
            </Typography>
            <Typography>
              2. For example if today is 23rd november you can book slots from 26th november onwards.
            </Typography>
          </AccordionDetails>
        </Accordion>


        <Accordion className='helpdrop'>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Slots already occupied</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              This message is displayed when you try to book a slot which is : 
            </Typography>
            <Typography>
              1. Already booked.
            </Typography>
            <Typography>
              2. or has some request pending approval.
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
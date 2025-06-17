import React, { useContext } from 'react';
import { Box } from '@mui/material';
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useNavigate } from 'react-router-dom';
import { CREATE_USER, CREATEFIRM, extraSmallFontSize, HOME, PRIMARY_COLOR, SECONDARY_COLOR, USE_PRIVACY, USE_REFUND, USE_TERMS } from '../../Helpers/ConstantProperties';
import { FirmContext } from '../Contexts/FirmContext';
import FirmBox from './FirmBox';
import FirmCard from './FirmCard';

const JoinFirmMessage = () => {
  const website = "https://www.opankys.com";
  const contactNumber = "+91-9175009033";
  const { firms, setCurrentFirm } = useContext(FirmContext);
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        alignItems: "center",
        justifyContent: 'center',
      }}
    >
      <Grid2
        display={"block"}
        container
        spacing={4}
      >
        <Grid2 xs={12} paddingTop={{ xs: 20, md: 0 }}>
          <Grid2 container spacing={2} justifyContent="center">
            {firms.map((firm, index) => (
              <Grid2 key={firm.khID} xs={12} sm={6} md={4} lg={3}>
                <FirmBox
                  firm={firm}
                  index={index}
                  onClick={() => {
                    setCurrentFirm(firm);
                    navigate(HOME);
                  }}
                />
              </Grid2>
            ))}
          </Grid2>
        </Grid2>

        <Grid2 xs={12}>
          <Box display={"block"}>
            <Grid2 container>

              <Grid2 sm={6} sx={{ display: 'flex', justifyContent: 'center' }} width={'100%'}>
                <FirmCard
                  title="Create Firm"
                  description="New Here.. Own a Business? Create Firm"
                  website={website}
                  contactNumber={contactNumber}
                  navigateTo={() => navigate(CREATEFIRM)}
                  PRIMARY_COLOR={PRIMARY_COLOR}
                  SECONDARY_COLOR={SECONDARY_COLOR}
                />
              </Grid2>

              <Grid2 sm={6} sx={{ display: 'flex', justifyContent: 'center' }} width={'100%'}>
                <FirmCard
                  title="Join Firm"
                  description="Please contact Edhaas Visuals:"
                  website={website}
                  contactNumber={contactNumber}
                  navigateTo={() => navigate(CREATE_USER)}
                  PRIMARY_COLOR={PRIMARY_COLOR}
                  SECONDARY_COLOR={SECONDARY_COLOR}
                />
              </Grid2>
            </Grid2>
          </Box>
        </Grid2>


        <Grid2 xs={12}>
          <Box display={"block"}>
            <Grid2 container textAlign={"center"} fontSize={extraSmallFontSize}>

              <Grid2 xs={3}>
                &copy; 2024 Opankys INC. All rights reserved.
              </Grid2>

              <Grid2 xs={3} className="pointer" onClick={() => navigate(USE_TERMS)}>
                Terms And Conditions
              </Grid2>

              <Grid2 xs={3} className="pointer" onClick={() => navigate(USE_PRIVACY)}>
                Privacy Policy
              </Grid2>

              <Grid2 xs={3} className="pointer" onClick={() => navigate(USE_REFUND)}>
                Refund Policy
              </Grid2>

            </Grid2>
          </Box>
        </Grid2>

      </Grid2>
    </Box>
  );
};

export default JoinFirmMessage;
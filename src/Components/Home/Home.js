import { AppBar, Box, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { FirmContext } from '../Contexts/FirmContext';
import FirmCard from '../Card/FirmCard';

const Home = () => {
    const { currentFirm } = useContext(FirmContext);
    return (
        <Box height={"100%"}>
            <AppBar />
            <Box
                alignContent={"center"}
                justifyItems={"center"}
                height={"50%"}>

                <Typography fontFamily={"Roboto"} fontSize={30} className='shining'>
                    {"Welcome to "}

                    <Typography component={"p"} fontSize={70}>
                        Acrytech
                    </Typography>

                </Typography>
            </Box>
            <Box
                justifySelf={"end"}
                alignContent={"end"}
                marginRight={2}
                width={{ xs: "90%", md: "30%" }}
                height={"50%"}>
                <FirmCard item={currentFirm} hideButton={true} />
            </Box>
        </Box>
    );
};

export default Home;
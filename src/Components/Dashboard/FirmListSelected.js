import { Container, Box, Grid } from "@mui/material";
import { useContext } from "react";
import { FirmContext } from "../Contexts/FirmContext";
import FirmCard from "../Card/FirmCard";
import JoinFirmMessage from "../Firm/JoinFirmMessage";

function FirmListSelected() {
    const { currentFirm, firms, khID } = useContext(FirmContext);

    if (firms?.length === 0) {
        return (
            <Container>
                <JoinFirmMessage />
            </Container>
        );
    }

    if (khID) {
        return (
            <Box
                className="h-100"
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}>
                <FirmCard item={currentFirm} hideButton={true} />
            </Box>
        );
    }

    return (
        <Grid container spacing={2}>
            {
                firms?.map(
                    (element, index) => <Grid item xs={12} sm={6} md={4} lg={3} >
                        <FirmCard key={index} item={element} />
                    </Grid>

                )
            }
        </Grid>
    );
}

export default FirmListSelected;
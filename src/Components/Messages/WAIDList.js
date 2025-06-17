import { useContext } from "react";
import { FirmContext } from "../Contexts/FirmContext";
import { AuthContext } from "../Auth/Auth";
import { extraSmallFontSize, MESSAGE_QK, PRIMARY_COLOR, regularFontSize, WAID_QK } from "../../Helpers/ConstantProperties";
import { useQuery } from "@tanstack/react-query";
import { serviceHelpers } from "../../Helpers/ServiceHelpers";
import { GenericErrorComponent } from "../GenericComponents/FormComponent/GenericAlertComponent";
import GenericSpinner from "../GenericComponents/FormComponent/GenericSpinner";
import Grid2 from "@mui/material/Unstable_Grid2";
import { Box, Paper, Typography } from "@mui/material";
import { getLocalDateString } from "../../Helpers/helpers";

export default function WAIDList({ onWAIDSelect, selectedWAID }) {
    const { khID } = useContext(FirmContext);
    const { uid } = useContext(AuthContext);

    const queryKey = [
        uid,
        khID,
        MESSAGE_QK,
        WAID_QK,
    ]

    var { data, error, isLoading } = useQuery({
        queryKey: queryKey,
        queryFn: async () => await serviceHelpers.getWaID(khID)
    });

    if (error) {
        return <GenericErrorComponent error={error} />;
    }

    if (isLoading) {
        return <GenericSpinner />;
    }

    const classForTab = (waid) => waid === selectedWAID ? "bg-primary-subtle rounded" : ""

    if (data) {
        return (
            <Grid2 spacing={2}>
                {
                    data.map((waid) => (
                        <Grid2 key={waid.id} xs={12}>
                            <Box
                                className="pointer"
                                onClick={() => { onWAIDSelect(waid.id) }}>
                                <Paper
                                    className={classForTab(waid.id)}
                                    elevation={1} sx={{ padding: 2 }}>
                                    <Typography fontSize={regularFontSize}>
                                        {waid.id}
                                    </Typography>

                                    <Typography fontSize={extraSmallFontSize} color={PRIMARY_COLOR}>
                                        {getLocalDateString(waid.updatedAt)}
                                    </Typography>
                                </Paper>
                            </Box>
                        </Grid2>
                    ))
                }
            </Grid2>
        )
    }

    return <></>

}
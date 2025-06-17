import { useContext } from "react";
import { AuthContext } from "../Auth/Auth";
import { FirmContext } from "../Contexts/FirmContext";
import { serviceHelpers } from "../../Helpers/ServiceHelpers";
import { useQuery } from "@tanstack/react-query";
import { GenericErrorComponent } from "../GenericComponents/FormComponent/GenericAlertComponent";
import GenericSpinner from "../GenericComponents/FormComponent/GenericSpinner";
import { MESSAGE_QK } from "../../Helpers/ConstantProperties";
import WAMessageInput from "./WAMessageInput";
import WAChatWindow from "./WAChatWindow";
import Grid2 from "@mui/material/Unstable_Grid2";

export default function WAMessageWindow({ wa_id }) {
    const { khID } = useContext(FirmContext);
    const { uid } = useContext(AuthContext);

    const queryKey = [
        uid,
        khID,
        MESSAGE_QK,
        wa_id
    ]

    var { data, error, isLoading } = useQuery({
        queryKey: queryKey,
        queryFn: async () => await serviceHelpers.getWhatsAppMessages(khID, wa_id)
    });

    if (error) {
        return <GenericErrorComponent error={error} />;
    }

    if (isLoading) {
        return <GenericSpinner />;
    }

    if (data) {
        return (
            <Grid2 container spacing={0} className="h-100">
                <Grid2 xs={12} sm={6} className="h-100">
                    <WAChatWindow data={data} />
                </Grid2>
                <Grid2 xs={12} sm={6}>
                    <WAMessageInput wa_id={wa_id} />
                </Grid2>
            </Grid2>
        );
    }

    return <></>
}
import { CircularProgress, Typography } from "@mui/material"
import { checkValue, DecodeServerError } from "../../Helpers/helpers"
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Auth/Auth";
import { FirmContext } from "../Contexts/FirmContext";
import { UPDATE_ON_INQUIRY } from "../../Helpers/ConstantProperties";
import { GenericAlert } from "../GenericComponents/Alerts/GenericAlert";
import { serviceHelpers } from "../../Helpers/ServiceHelpers";
import { InquiryRejectionObj, NO_DATA } from "../../Helpers/ExtraProperties";
import Grid2 from "@mui/material/Unstable_Grid2";

export const DashboardCardRejection = ({ item, }) => {
    const { uid } = useContext(AuthContext);
    const { khID } = useContext(FirmContext);
    const statusCategory = InquiryRejectionObj;

    const { data, isLoading, error } = useQuery(
        {
            queryKey: [
                uid,
                khID,
                UPDATE_ON_INQUIRY,
                item?.id
            ]
            ,
            queryFn: async () =>
                await serviceHelpers.getLeadHistory(khID, item?.id)
        }
    );

    if (error) return <GenericAlert error={DecodeServerError(error)} />

    if (isLoading) return <CircularProgress />

    if (!data || data.length === 0) {
        return <>{NO_DATA}</>
    }

    return (
        <>
            <Grid2 xs={12} sm={4} md={2} >
                <Typography
                    variant="body2"
                    sx={{
                        textAlign: { xs: 'left', sm: 'center' },
                        color: statusCategory.color
                    }}
                >
                    {checkValue(statusCategory?.name)}
                </Typography>
            </Grid2>
            <Grid2 xs={12} sm={4} md={2} >
                <Typography
                    className="text-black"
                    variant="body2"
                    sx={{
                        textAlign: { xs: 'left', sm: 'center' },
                        color: statusCategory.color
                    }}
                >
                    {item.sourceOfLead}
                </Typography>
            </Grid2>

            <Grid2 xs={12} sm={4} md={3.5}>
                <Typography
                    className="text-danger text-truncate"
                    variant="body2"
                    sx={{
                        textAlign: { xs: 'left', sm: 'center' },
                    }}
                >
                    {data[data.length - 1].note}
                </Typography>
            </Grid2>
        </>
    )
}
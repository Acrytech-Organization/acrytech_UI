import { CircularProgress } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { GenericAlert } from "../GenericComponents/Alerts/GenericAlert";
import { useContext } from "react";
import { AuthContext } from "../Auth/Auth";
import { FirmContext } from "../Contexts/FirmContext";
import { UPDATE_ON_INQUIRY } from "../../Helpers/ConstantProperties";
import { serviceHelpers } from "../../Helpers/ServiceHelpers";
import { useQuery } from '@tanstack/react-query';
import { DecodeServerError } from "../../Helpers/helpers";
import InquiryHistoryDetails from "./InquiryHistoryDetails";

function InquiryContent({ item, customQueryKey = UPDATE_ON_INQUIRY }) {
    const { uid } = useContext(AuthContext);
    const { khID } = useContext(FirmContext)

    const { data, isLoading, error } = useQuery(
        {
            queryKey: [
                uid,
                khID,
                customQueryKey,
                item?.id
            ]
            ,
            queryFn: async () =>
                await serviceHelpers.getLeadHistory(khID, item?.id, item.createdAt)
        }
    );

    if (error) return <GenericAlert error={DecodeServerError(error)} />

    if (isLoading) return <CircularProgress />

    return (
        <Grid2 sx={{ padding: 2 }}>
            {data?.map((trx, index) => (
                <div key={index} className='d-flex flex-column border border-secondry rounded-3 p-1 px-3 m-1'>
                    <InquiryHistoryDetails transaction={trx} />
                </div>
            ))}
        </Grid2>
    );
}

export default InquiryContent;
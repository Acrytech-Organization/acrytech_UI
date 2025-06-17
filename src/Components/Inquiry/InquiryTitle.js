import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import UpdateInquiryStatus from "./UpdateInquiryStatus";
import InquiryDetails from "./InquiryDetails";

function InquiryTitle({ item, handleCancel }) {
    return (
        <div className='px-5 py-2 m-2'>
            <Grid2 container spacing={2} direction='column'>
                <InquiryDetails item={item} />
                <UpdateInquiryStatus item={item} />
            </Grid2>
        </div>
    )
}

export default InquiryTitle;
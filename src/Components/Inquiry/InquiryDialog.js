import Dialog from '@mui/material/Dialog';
import DialogHeader from '../GenericComponents/Layout/DialogHeader';
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { InquiryDetail } from './InquiryDetail';
import Button from '@mui/material/Button';
import { RED_BUTTON } from '../../Helpers/ConstantProperties';

function InquiryDialog({ item, dialog, setDialog }) {
    const handleCancel = () => {
        setDialog(false);
    };

    return (
        <Dialog
            open={dialog}
            onClose={handleCancel}
            maxWidth="lg"
            fullWidth
        >
            <Grid2 className="pb-2">
                <DialogHeader title={'Inquiry Details'} handleCancel={handleCancel} />
                <InquiryDetail item={item} />
                <Grid2 className="w-100 d-flex justify-content-center">
                    <Button sx={{ backgroundColor:RED_BUTTON }} onClick={handleCancel} variant="contained" >
                        Cancel
                    </Button>
                </Grid2>
            </Grid2>
        </Dialog>
    );
}

export default InquiryDialog;
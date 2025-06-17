import React, { useContext } from 'react';
import MenuItem from '@mui/material/MenuItem';
import InquiryUpdate from '../../Inquiry/InquiryUpdate';
import { INQUIRY_REJECT_TAG, rejectComments } from '../../../Helpers/ExtraProperties';
import { checkAdmin } from '../../../Helpers/helpers';
import { FirmContext } from '../../Contexts/FirmContext';

const RejectInquiry = ({ handleMenuItemClick, item, handleClose, MenuItemText = "Cancle/Reject" }) => {
    const queryFunction = (state) => {
        return {
            status: INQUIRY_REJECT_TAG,
            rejectionReasonId: state.id,
            tag: INQUIRY_REJECT_TAG
        }
    }

    const successMessage = (data) => `Successfully Rejected with id ${data.id}`

    const OptionLabel = (option) => `${option.id} . ${option.message}`

    const formName = `Reason for ${MenuItemText}`

    const { currentFirm } = useContext(FirmContext);

    const contents = (
        <InquiryUpdate
            OptionalLabel={OptionLabel}
            dropDownList={rejectComments}
            successMessage={successMessage}
            item={item}
            mutationFunction={queryFunction}
            formName={formName}
            currentDropDownValue={rejectComments[0]}
            handleClose={handleClose}
        />
    )

    const onClick = () => handleMenuItemClick(contents, MenuItemText)

    return (
        <MenuItem disabled={!checkAdmin(currentFirm.currentAccess)} onClick={onClick}>{MenuItemText}</MenuItem>
    );
};

export default RejectInquiry;
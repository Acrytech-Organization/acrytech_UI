import { Box, Button, MenuItem } from '@mui/material';
import React, { useContext } from 'react';
import { GenericVerifyComponent } from '../../GenericComponents/VerifyComponent/FirmVerifyComponent';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { serviceHelpers } from '../../../Helpers/ServiceHelpers';
import { CLOSED, UPDATE_ON_INQUIRY } from '../../../Helpers/ConstantProperties';
import { FirmContext } from '../../Contexts/FirmContext';
import { DecodeServerError } from '../../../Helpers/helpers';
import { useSnackbar } from '../../Contexts/SnackbarProvider';

const CloseInquiry = ({
    handleMenuItemClick,
    item,
    MenuItemText = "Close Inquiry",
    handleClose
}) => {
    const queryClient = useQueryClient();
    const { khID } = useContext(FirmContext);
    const { showSnackbar } = useSnackbar()

    const queryFn = async () => {

        const update = {
            status: CLOSED
        }

        const note = "Inquiry Closed.";

        const result = await serviceHelpers.updateLeadStatus(khID, update, item.id, note);
        handleClose();
        return result
    }

    const { mutate } = useMutation({
        mutationFn: queryFn,
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({
                predicate: (query) => query.queryKey.includes(UPDATE_ON_INQUIRY)
            })

            showSnackbar("Inquiry Closed", 'success')
        },
        onError: (error) => {
            const message = DecodeServerError(error);
            showSnackbar(message, 'error');
        },
    })

    const contents = (
        <Box textAlign={"center"}>
            <GenericVerifyComponent
                title={
                    "Closed Inquiries are removed from the day to day working. But not delete."} />
            <Button color='error' variant="outlined" onClick={() => mutate()}>
                Close
            </Button>
        </Box>
    )

    const onClick = () => handleMenuItemClick(contents, MenuItemText)

    return (
        <MenuItem onClick={onClick}>{MenuItemText}</MenuItem>
    );
};

export default CloseInquiry;
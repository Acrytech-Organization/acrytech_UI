import React, { useContext } from 'react';
import { MenuItem } from '@mui/material';
import { serviceHelpers } from '../../../Helpers/ServiceHelpers';
import { DecodeServerError } from '../../../Helpers/helpers';
import { PRODUCT_TYPE_FINISHED, REVISE_QUOTATION, UPDATE_ON_INQUIRY } from '../../../Helpers/ConstantProperties';
import { useSnackbar } from '../../Contexts/SnackbarProvider';
import { FirmContext } from '../../Contexts/FirmContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DateContext } from '../../Contexts/DateContext';

const ReviseQuotation = ({ item }) => {
    const { khID } = useContext(FirmContext);
    const { currentDate } = useContext(DateContext);
    const { showSnackbar } = useSnackbar();
    const hasFinishProduct = item.products.some(product => product.product.type === PRODUCT_TYPE_FINISHED);

    const queryFunction = async () => {

        const comment = () => `Inquiry status updated to ${REVISE_QUOTATION} with id ${item.id}`;
        const updatedStatus = { status: REVISE_QUOTATION };

        const data = await serviceHelpers.updateLeadStatus(
            khID,
            updatedStatus,
            item.id,
            comment(),
            currentDate
        );
        return { id: data.id, comment };
    };

    const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: queryFunction,

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes(UPDATE_ON_INQUIRY),
      });

      showSnackbar(data.comment, 'success');
    },

    onError: (error) => {
      const message = DecodeServerError(error);
      showSnackbar(message, 'error');
    },

  });

    function handleOnClick() {
        mutate();
    };

    return (
        <MenuItem disabled={hasFinishProduct} onClick={handleOnClick}>Revise Quotation</MenuItem>
    );
};

export default ReviseQuotation;

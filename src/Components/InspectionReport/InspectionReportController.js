import React, { useContext } from 'react';
import { useSnackbar } from '../Contexts/SnackbarProvider';
import { FirmContext } from '../Contexts/FirmContext';
import { serviceHelpers } from '../../Helpers/ServiceHelpers';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@mui/material';
import { checkValidity, DecodeServerError, formatDateTime } from '../../Helpers/helpers';
import { CREATE_INSPECTIONS, UPDATE_ON_INQUIRY, VIEW_INSPECTION } from '../../Helpers/ConstantProperties';
import { useNavigate } from 'react-router-dom';

const InspectionReportController = ({ item, inputValues, index, formId, resetInputValues }) => {
  const { currentFirm } = useContext(FirmContext);
  const { showSnackbar } = useSnackbar();
  const dateObj = new Date();
  const { formattedDate, formattedTime } = formatDateTime(dateObj);
  const navigate = useNavigate();

  const products = item?.products;

  const queryFunction = async () => {

    if (products && products[index]) {
      const reports = products[index].reports || [];
      reports.push({
        ...inputValues,
        reportDate: formattedDate,
        reportTime: formattedTime,
      });
      products[index].reports = reports;
    }

    const comment = `Inspection Report updated for Product ${products[index].product.name}`;

    const data = await serviceHelpers.updateLeadStatus(
      currentFirm.khID,
      { products: products },
      item.id,
      comment
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

      showSnackbar(`${data.comment}`, 'success');
      resetInputValues();
      navigate(VIEW_INSPECTION,
        {
          state: {
            item: { ...item, products: products },
            product: products[index],
            index: index,
            source: CREATE_INSPECTIONS
          }
        })
    },

    onError: (error) => {
      const message = DecodeServerError(error);
      showSnackbar(message, 'error');
    },

  });

  const handleSubmit = () => {
    const form = document.getElementById(formId);
    let isValid = checkValidity(form, 'input:not(#groupId input), textarea:not(#groupId textarea), select:not(#groupId select)')
    if (isValid) {
        mutate()
    }
}

  return (
    <Button variant="contained" color="success" onClick={() => handleSubmit()}>
      Save Report
    </Button>
  );
};

export default InspectionReportController;

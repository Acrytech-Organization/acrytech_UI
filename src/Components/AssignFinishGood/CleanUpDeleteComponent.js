import { Button, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UPDATE_ON_INQUIRY } from '../../Helpers/ConstantProperties';
import { DecodeServerError, getValueInPercentOfTotal } from '../../Helpers/helpers';
import { GenericErrorComponent } from '../GenericComponents/FormComponent/GenericAlertComponent';
import { useSnackbar } from '../Contexts/SnackbarProvider';
import { useContext, useState } from 'react';
import { serviceHelpers } from '../../Helpers/ServiceHelpers';
import { FirmContext } from '../Contexts/FirmContext';
import { CircularProgressWithLabel } from '../GenericComponents/XlsxFileReader/GenericBulkCreation';
import Grid2 from '@mui/material/Unstable_Grid2';

export const CleanUpDeleteComponent = ({ deletingData }) => {
    const { khID } = useContext(FirmContext);
    const queryClient = useQueryClient();
    const { showSnackbar } = useSnackbar();
    const [status, setStatus] = useState({ inc: 0, err: 0 })

    const queryFunction = async () => {
        try {
            Object.keys(deletingData).forEach(type => {
                deletingData[type].forEach(async (item, index) => {
                    switch (type) {
                        case "CustomProduct":
                            await serviceHelpers.deleteProducts(khID, item.id)
                            setStatus(prev => ({ ...prev, inc: prev.inc++ }))
                            break
                        case "inquiries":
                            await serviceHelpers.deleteAccount(khID, item.id)
                            setStatus(prev => ({ ...prev, inc: prev.inc++ }))
                            break
                        case "vouchers":
                            await serviceHelpers.deleteChallans(khID, item.id)
                            setStatus(prev => ({ ...prev, inc: prev.inc++ }))
                            break
                        default:
                            break;
                    }
                })
            })
        } catch (e) {
            setStatus(prev => ({ ...prev, err: prev.err++ }))
        }
    }

    const { mutate, isPending, error } = useMutation({
        mutationFn: queryFunction,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                predicate: (query) => query.queryKey.includes(UPDATE_ON_INQUIRY),
            });
            showSnackbar(`Deleted SuccessFully`, 'success');
        },

        onError: (error) => {
            const message = DecodeServerError(error);
            showSnackbar(message, 'error');
        },
    });

    if (error) {
        return <GenericErrorComponent error={error} />;
    }

    if (isPending) {
        return <Grid2 className="w-100 d-flex flex-column p-2 gap-2">
            <ul className="list-group">
                <Grid2 className="list-group-item p-2">
                    <Typography variant="body1" color="initial">{status.inc}{'  '}/{'  '}{deletingData.totalDeletingElements}{'  '}{"Deleted Successfully "} !!</Typography>
                </Grid2>
                <CircularProgressWithLabel value={getValueInPercentOfTotal((status.inc), deletingData.totalDeletingElements)} />
            </ul>
        </Grid2>
    }

    return (
        <Grid2 width={"100%"} className="d-flex justify-content-between border border-1 p-2 m-1">
            <Typography variant="body1" color="initial">Clear All inquiries With Respective Custom Products and Transactions and Vouchers Inquiries</Typography>
            <Button onClick={mutate} variant="contained" endIcon={<DeleteIcon />}>
                Clean
            </Button>
        </Grid2>
    )
}
import { CircularProgress, IconButton, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import React, { useContext } from 'react';
import { commonFontSize, commonFontWeight, GENERATE_REQUIREMENT, NOT_AVAILABLE, UPDATE_ON_INQUIRY } from '../../Helpers/ConstantProperties';
import { getTotalQuantity } from '../Dashboard/InquiryCalculations';
import { DecodeServerError, getSaleRate, ShowNumber } from '../../Helpers/helpers';
import DeleteIcon from '@mui/icons-material/Delete';
import { serviceHelpers } from '../../Helpers/ServiceHelpers';
import { FirmContext } from '../Contexts/FirmContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from '../Contexts/SnackbarProvider';
import { useNavigate } from 'react-router-dom';
import DependencyTable from './DependancyTable';

const FGRequirementTable = ({ inquiry, disableActions }) => {
    const { khID } = useContext(FirmContext);
    const { showSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const qty = getTotalQuantity(inquiry);

    const deleteSFG = async ({ index, sfgObject }) => {
        await serviceHelpers.deleteProducts(khID, sfgObject.id);

        inquiry.sfg.splice(index, 1);
        const notes = "SFG " + sfgObject.name + " deleted";

        return await serviceHelpers.updateInquiry(khID, inquiry, inquiry.id, notes);
    }

    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (props) => deleteSFG(props),
        onSuccess: () => {
            queryClient.invalidateQueries({
                predicate: (query) => query.queryKey.includes(UPDATE_ON_INQUIRY),
            });
            showSnackbar(`Deleted SuccessFully`, 'success');
            navigate(GENERATE_REQUIREMENT, { state: { item: inquiry } });
        },
        onError: (error) => {
            const message = DecodeServerError(error);
            showSnackbar(message, 'error');
        }
    })

    if (inquiry.sfg?.length > 0) {
        return (
            <Grid2 container className="mt-2">

                <Grid2 xs={12} className="d-none d-sm-block">
                    <Typography
                        component={"span"}
                        fontSize={commonFontSize}
                        fontWeight={commonFontWeight}>
                        <Grid2
                            textAlign={"center"}
                            container
                            className='bg-primary-subtle rounded p-2'>
                            <Grid2 md>Product Name</Grid2>
                            <Grid2 md={1}>Quantity</Grid2>
                            <Grid2 md={2}>Rate</Grid2>
                            <Grid2 md>Requirements</Grid2>
                            {!disableActions && <Grid2 md={1}>Actions</Grid2>}
                        </Grid2>
                    </Typography>
                </Grid2>


                {
                    inquiry.sfg?.map((product, index) => {
                        const qtyAvailable = qty[product.product.id]?.units > 0;

                        return (
                            <Grid2 xs={12} key={index} paddingY={1.5} borderBottom={"1px solid lightgray"}>
                                <Typography component={"span"} fontSize={commonFontSize}>
                                    <Grid2
                                        alignItems={"center"}
                                        textAlign={"center"}
                                        container >
                                        <Grid2 md>{product.product.name}</Grid2>
                                        <Grid2 md={1}>{qty[product.product.id]?.units}</Grid2>
                                        <Grid2 md={2}>
                                            {
                                                0 === getSaleRate(product)
                                                    ? NOT_AVAILABLE
                                                    : ShowNumber(getSaleRate(product), 2, true)}
                                        </Grid2>
                                        <Grid2 md>
                                            <DependencyTable
                                                product={product}
                                                units={qty[product.product.id]?.units}
                                            />
                                        </Grid2>
                                        {
                                            !disableActions &&
                                            <Grid2 md={1}>
                                                <IconButton
                                                    onClick={() => mutate({
                                                        index: index,
                                                        sfgObject: product.product
                                                    })}

                                                    disabled={qtyAvailable}>

                                                    {
                                                        isPending
                                                            ? <CircularProgress />
                                                            : <DeleteIcon color="error" />
                                                    }

                                                </IconButton>
                                            </Grid2>
                                        }
                                    </Grid2>
                                </Typography>
                            </Grid2>
                        )
                    })
                }
            </Grid2>
        )
    }

    return <></>

};

export default FGRequirementTable;
import { Button, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import React, { useState } from 'react';
import { commonFontSize, commonFontWeight } from '../../Helpers/ConstantProperties';
import { checkValueNumber } from '../../Helpers/helpers';
import InquiryQCAction from './InquiryQCAction';
import GenericSpinner from '../GenericComponents/FormComponent/GenericSpinner';

const InquiryQCTable = ({
    productionPlan,
    onChangeAction,
    isPending,
    mutate }) => {

    const [disabled, setDisabled] = useState(true);

    const onChange = (action, product) => {
        onChangeAction(action, product)
        setDisabled(false);
    }

    return (
        <Grid2 container>
            <Grid2 xs={12} className="d-none d-sm-block">
                <Typography
                    component={"span"}
                    fontSize={commonFontSize}
                    fontWeight={commonFontWeight}>
                    <Grid2
                        textAlign={"center"}
                        container
                        className='bg-primary-subtle rounded p-2'>
                        <Grid2 md={3}>Product Name</Grid2>
                        <Grid2 md>QC Passed</Grid2>
                        <Grid2 md>QC Rejected</Grid2>
                        <Grid2 md>Quantity For QC</Grid2>
                        <Grid2 md>Action</Grid2>
                    </Grid2>
                </Typography>
            </Grid2>

            <Grid2 xs={12}>
                <Typography component={"span"} fontSize={commonFontSize}>
                    {
                        productionPlan.map((product, index) => (
                            <Grid2
                                key={index}
                                textAlign={"center"}
                                container
                                className="p-2">

                                <Grid2 xs={12} md={3}>{product.name}</Grid2>

                                <Grid2 xs={12} md>
                                    {checkValueNumber(product.passed)}
                                </Grid2>

                                <Grid2 xs={12} md>
                                    {checkValueNumber(product.rejected)}
                                </Grid2>

                                <Grid2 xs={12} md>
                                    {checkValueNumber(product.inQC)}
                                </Grid2>

                                <Grid2 xs={12} md>
                                    <InquiryQCAction
                                        product={product}
                                        onChange={(action) => {
                                            onChange(action, product)
                                        }} />
                                </Grid2>

                            </Grid2>
                        ))
                    }
                </Typography>
            </Grid2>

            <Grid2 xs={12} textAlign={"center"}>
                {
                    isPending
                        ? <GenericSpinner />
                        : <Button onClick={mutate} disabled={disabled}>
                            Save
                        </Button>
                }
            </Grid2>
        </Grid2>
    )
};

export default InquiryQCTable;
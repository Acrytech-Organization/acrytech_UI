import React, { useContext } from 'react';
import { Paper, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { commonFontSize, commonFontWeight, PRIMARY_COLOR, PRODUCT_NAME, QTY, Units, } from '../../../Helpers/ConstantProperties';
import GenericDialog from '../../GenericComponents/Dialog/GenericDialog';
import { RequirementAction } from '../RequirementAction';
import { DetailPaneContext } from '../../Inquiry/InquiryInformation';
import { PROCESS_GROUP_NAME, RM_GROUP_NAME } from '../../../Helpers/ExtraProperties';

const RawMaterialField = ({ label, value }) => (
    <Grid2 xs={12} sm={4}>
        <Typography fontSize={commonFontSize} fontWeight={commonFontWeight} component="div" textAlign={{ sm: 'center', xs: 'left' }}>
            {label}
        </Typography>
        <Typography fontSize={commonFontSize} component="div">
            {value}
        </Typography>
    </Grid2>
);

const SmallScreenRawMaterialContent = ({
    row,
    Component,
    setComponent,
    Open,
    setOpen,
    ProcessDialogComponent,
    RawMaterialDialogComponent,
    handleDelete,
    allowActions,
    formatRawMaterials
}) => {
    const enableAction = useContext(DetailPaneContext);
    return (
        <Paper elevation={2} className="mt-3 p-2 rounded-0">
            <Grid2 container spacing={1}>
                <Grid2 xs={12}>
                    <Typography color={PRIMARY_COLOR} fontSize={commonFontSize} fontWeight={commonFontWeight} component="div">
                        {row.product.name}
                    </Typography>
                </Grid2>
                <Grid2 xs={12}>
                    <Typography fontSize={commonFontSize} component="div">
                        <strong>Product Code:</strong> {row.product.productItemcode}
                    </Typography>
                </Grid2>
                <Grid2 xs={12}>
                    <Typography fontSize={commonFontSize} component="div">
                        <strong>Qty:</strong> {row.units} {row.product.unit}
                    </Typography>
                </Grid2>
                <Grid2 xs={12} sx={{ my: 1 }}>
                    <Typography color={PRIMARY_COLOR} fontSize={commonFontSize} fontWeight={commonFontWeight} component="div" textAlign={'center'}>
                        Raw Material & processes
                    </Typography>
                </Grid2>
                <RawMaterialField label="Raw Material:" value={formatRawMaterials(PRODUCT_NAME, RM_GROUP_NAME)} />
                <RawMaterialField label="rmQty:" value={formatRawMaterials(QTY, RM_GROUP_NAME)} />
                <RawMaterialField label="Raw Material Price:" value={formatRawMaterials(Units, RM_GROUP_NAME)} />
                <RawMaterialField label="Process Name:" value={formatRawMaterials(PRODUCT_NAME, PROCESS_GROUP_NAME)} />
                <RawMaterialField label="Process Qty:" value={formatRawMaterials(QTY, PROCESS_GROUP_NAME)} />
                <RawMaterialField label="Process Price :" value={formatRawMaterials(Units, PROCESS_GROUP_NAME)} />
                {!enableAction?.disableAction && allowActions && (
                    <Grid2 container spacing={0} justifyContent="flex-end" xs={12} sx={{ mt: 2 }}>
                        <RequirementAction
                            ProcessComponent={ProcessDialogComponent}
                            RawMaterialComponent={RawMaterialDialogComponent}
                            setOpen={setOpen}
                            setComponent={setComponent}
                            handleDelete={handleDelete}
                        />
                    </Grid2>
                )}
            </Grid2>
            <GenericDialog
                title={Component?.extraProperties?.dialogTitle}
                open={Open}
                setOpen={setOpen}
                content={Component?.Component}>
            </GenericDialog>
        </Paper >
    );
};

export default SmallScreenRawMaterialContent;

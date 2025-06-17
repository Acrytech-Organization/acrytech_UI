import React, { useContext } from 'react';
import { Paper } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import ProductContentCell from '../../Inquiry/ProductContentCell';
import GenericDialog from '../../GenericComponents/Dialog/GenericDialog';
import { RequirementAction } from '../RequirementAction';
import { DetailPaneContext } from '../../Inquiry/InquiryInformation';
import { PROCESS_GROUP_NAME, RM_GROUP_NAME } from '../../../Helpers/ExtraProperties';
import { PRODUCT_NAME, QTY, Units } from '../../../Helpers/ConstantProperties';

const RawMaterialContent = ({
    row,
    rawMaterialExtraProps,
    processExtraProps,
    Component,
    setComponent,
    Open,
    setOpen,
    ProcessDialogComponent,
    RawMaterialDialogComponent,
    handleDelete,
    formatRawMaterials

}) => {
    const enableAction = useContext(DetailPaneContext);
    let col = {
        processName: 1.5,
        rawMaerialName: 1.5
    };
    if (enableAction?.disableAction) {
        col.processName = 2.25;
        col.rawMaerialName = 2.25
    }


    return (
        <Paper elevation={0} className="px-sm-2 rounded-0 ">
            <Grid2 container>
                <ProductContentCell xs={12} md={1}>
                    {row.product.name}
                </ProductContentCell>
                <ProductContentCell xs={12} md={1}>
                    {row.product.productItemcode}
                </ProductContentCell>
                <ProductContentCell xs={12} md={1}>
                    {row.units}
                </ProductContentCell>
                <ProductContentCell xs={12} md={col.rawMaerialName}>
                    {
                        formatRawMaterials(PRODUCT_NAME, RM_GROUP_NAME)
                    }
                </ProductContentCell>
                <ProductContentCell xs={12} md={1.5}>
                    {
                        formatRawMaterials(QTY, RM_GROUP_NAME)
                    }
                </ProductContentCell>
                <ProductContentCell xs={12} md={1}>
                    {
                        formatRawMaterials(Units, RM_GROUP_NAME)
                    }
                </ProductContentCell>
                <ProductContentCell xs={12} md={col.processName}>
                    {
                        formatRawMaterials(PRODUCT_NAME, PROCESS_GROUP_NAME)
                    }
                </ProductContentCell>
                <ProductContentCell xs={12} md={1}>
                    {
                        formatRawMaterials(QTY, PROCESS_GROUP_NAME)
                    }
                </ProductContentCell>
                <ProductContentCell xs={12} md={1}>
                    {formatRawMaterials(Units, PROCESS_GROUP_NAME)}
                </ProductContentCell>
                {
                    !enableAction?.disableAction &&
                    (<ProductContentCell xs={12} md={1.5}>
                        <RequirementAction
                            ProcessComponent={ProcessDialogComponent}
                            RawMaterialComponent={RawMaterialDialogComponent}
                            setOpen={setOpen}
                            setComponent={setComponent}
                            handleDelete={handleDelete}
                            processExtraProps={processExtraProps}
                            rawMaterialExtraProps={rawMaterialExtraProps}
                        />
                    </ProductContentCell>)
                }
            </Grid2>
            <GenericDialog
                title={Component?.extraProperties?.dialogTitle}
                open={Open}
                setOpen={setOpen}
                content={Component?.Component}>
            </GenericDialog>
        </Paper >
    )
}
export default RawMaterialContent;
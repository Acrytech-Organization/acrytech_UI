import React from 'react';
import { Paper } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import InquiryProductActionButtons from '../Inquiry/InquiryProductActionButtons';
import ProductContentCell from '../Inquiry/ProductContentCell';
import { ShowNumber, useScreenSize, SMALL_SCREEN, MEDIUM_SCREEN } from '../../Helpers/helpers';
import { PRIMARY_COLOR } from '../../Helpers/ConstantProperties';

const RequirementRawMaterialContent = ({
    row,
    index,
    editIndex,
    handleFieldChange,
    startEditing,
    cancelEditing,
    clearField,
    allowActions,
    addButtonExtraProps,
    groupFieldName
}) => {
    const isEditing = editIndex === index;
    const screenSize = useScreenSize();

    return (
        <Paper elevation={screenSize === SMALL_SCREEN || screenSize === MEDIUM_SCREEN ? 2 : 0} className="px-sm-2 rounded-0 ">
            <Grid2 container spacing={0} p={2}>
                <ProductContentCell xs={12} md={3} color={PRIMARY_COLOR}>
                    <strong>{row.product?.name}</strong>
                </ProductContentCell>
                <ProductContentCell
                    xs={12}
                    md={3}
                    isEditing={isEditing}
                    value={row.units}
                    onChange={(e) => handleFieldChange(e, 'units', index)}
                    type="number"
                >
                    {row.units} {row.product.unit}
                </ProductContentCell>
                <ProductContentCell
                    xs={12}
                    md={3}
                    isEditing={isEditing}
                    value={row.rate}
                    onChange={(e) => handleFieldChange(e, 'saleRate', index)}
                    type="number"
                >
                    {ShowNumber(row.rate, 2, true)}
                </ProductContentCell>
                <Grid2
                    xs={12}
                    md={3}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <InquiryProductActionButtons
                        isEditing={isEditing}
                        startEditing={startEditing}
                        cancelEditing={cancelEditing}
                        clearField={clearField}
                        index={index}
                        allowActions={allowActions}
                        addButtonExtraProps={addButtonExtraProps}
                        groupFieldName={groupFieldName}
                        item={row}
                    />
                </Grid2>
            </Grid2>
        </Paper>
    );
};

export default RequirementRawMaterialContent;

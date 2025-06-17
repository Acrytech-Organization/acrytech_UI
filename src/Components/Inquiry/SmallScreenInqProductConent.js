import React, { useContext, useState } from 'react';
import { Paper, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { commonFontSize, commonFontWeight, PRIMARY_COLOR } from '../../Helpers/ConstantProperties';
import ProductContentCell from './ProductContentCell';
import InquiryProductActionButtons from './InquiryProductActionButtons';
import { getProductHeadings, getSaleRate, ShowNumber } from '../../Helpers/helpers';
import { DetailPaneContext } from './InquiryInformation';

const SmallScreenInqProductContent = ({
    row,
    index,
    editIndex,
    handleFieldChange,
    startEditing,
    cancelEditing,
    clearField,
    allowActions,
    addButtonExtraProps,
    headingList,
    groupFieldName,
    CustomActionComponent,
    editSalerate,
    setEditIndex
}) => {
    const isEditing = editIndex === index;
    const headings = headingList ? headingList : getProductHeadings(addButtonExtraProps.enableAdd, editSalerate);
    const [saleRate, setSaleRate] = useState(getSaleRate(row));
    const [units, setUnits] = useState(row.units)
    const [description, setDescription] = useState(row.productdescription)
    const enableAction = useContext(DetailPaneContext);

    const save = () => {
        handleFieldChange({ target: { value: saleRate } }, 'saleRate', index)
        handleFieldChange({ target: { value: units } }, 'units', index)
        handleFieldChange({ target: { value: description } }, 'productdescription', index)
        setEditIndex(-1)
    }

    const renderContent = (label) => {
        switch (label) {
            case 'Product Name':
            case 'Raw Material':
            case 'Process':
            case 'Name':
                return (
                    <Typography
                        component="span"
                        color={PRIMARY_COLOR}
                        sx={{ fontWeight: commonFontWeight }}
                    >
                        {row.product?.name}
                    </Typography>
                );
            case 'Product Code':
            case 'Item code':
                return row.product?.productItemcode;
            case 'Qty':
            case 'Quantity':
                return (
                    <ProductContentCell
                        md={12}
                        isEditing={isEditing}
                        value={units}
                        type="number"
                        onChange={(e) => setUnits(e.target.value)}>
                        {(Math.abs(units))}
                    </ProductContentCell>
                );
            case 'Price/Unit':
            case 'Sale Rate':
                return (
                    <ProductContentCell
                        md={12}
                        isEditing={isEditing}
                        value={saleRate}
                        type="number"
                        onChange={(e) => setSaleRate(e.target.value)}
                    >
                        {ShowNumber(saleRate, 2, true)}
                    </ProductContentCell>
                );

            case 'Description':
                return (
                    <ProductContentCell
                        md={12}
                        isEditing={isEditing}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    >
                        {description}
                    </ProductContentCell>
                );
            default:
                return null;
        }
    };

    return (
        <Paper elevation={2} className="mt-3 p-2 rounded-0">
            <Grid2 container spacing={1}>
                {headings.map((heading, i) => (
                    <Grid2
                        key={i}
                        xs={12}
                        sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}
                    >
                        <Typography
                            component="div"
                            fontSize={commonFontSize}
                            sx={{ display: 'flex', alignItems: 'center' }}
                        >
                            {heading.label !== 'Actions' && (
                                <Typography component="span" fontWeight={commonFontWeight} sx={{ mr: 1 }}>
                                    {heading.label}:
                                </Typography>
                            )}
                            {renderContent(heading.label)}
                        </Typography>
                    </Grid2>
                ))}
                {
                    !enableAction?.disableAction && (addButtonExtraProps.enableAdd || allowActions) && (
                        <Grid2 container justifyContent="flex-end" xs={12}>
                            {

                                CustomActionComponent ?
                                    CustomActionComponent :
                                    <InquiryProductActionButtons
                                        isEditing={isEditing}
                                        startEditing={startEditing}
                                        cancelEditing={cancelEditing}
                                        clearField={clearField}
                                        index={index}
                                        allowActions={allowActions}
                                        addButtonExtraProps={addButtonExtraProps}
                                        item={row}
                                        groupFieldName={groupFieldName}
                                        onSave={save}
                                    />}
                        </Grid2>
                    )}
            </Grid2>
        </Paper>
    );
};

export default SmallScreenInqProductContent;

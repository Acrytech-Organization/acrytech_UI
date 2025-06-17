import React, { useContext, useState } from 'react';
import { Paper } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import InquiryProductActionButtons from './InquiryProductActionButtons';
import ProductContentCell from './ProductContentCell';
import { DetailPaneContext } from './InquiryInformation';
import { getSaleRate, ShowNumber } from '../../Helpers/helpers';

const InquiryProductContent = ({
    row,
    index,
    editIndex,
    handleFieldChange,
    startEditing,
    cancelEditing,
    clearField,
    allowActions,
    addButtonExtraProps,
    groupFieldName,
    CustomActionComponent,
    editSalerate,
    setEditIndex
}) => {
    const [saleRate, setSaleRate] = useState(getSaleRate(row));
    const [units, setUnits] = useState(row.units)
    const [description, setDescription] = useState(row.productdescription)

    const isEditing = editIndex === index;

    const enableAction = useContext(DetailPaneContext);

    const hideAction = enableAction?.disableAction || !allowActions

    let gridSize = {};


    if (editSalerate && hideAction) {
        gridSize = {
            name: 2, itemCode: 3, units: 2, saleRate: 2, description: 3
        }
    }
    else if (!editSalerate && !hideAction) {
        gridSize = {
            name: 3, itemCode: 2, units: 2, description: 3, action: 2
        }
    }
    else if (!editSalerate && hideAction) {
        gridSize = {
            name: 2, itemCode: 3, units: 3, description: 4
        }
    }
    else {
        gridSize = {
            name: 2, itemCode: 2, units: 1, saleRate: 2, description: 3, action: 2
        }
    }
    const save = () => {
        handleFieldChange({ target: { value: saleRate } }, 'saleRate', index)
        handleFieldChange({ target: { value: units } }, 'units', index)
        handleFieldChange({ target: { value: description } }, 'productdescription', index)
        setEditIndex(-1)
    }

    return (
        <Paper elevation={0} className="px-sm-2 rounded-0">
            <Grid2 container>
                <ProductContentCell md={gridSize.name}>
                    {row.product?.name}
                </ProductContentCell>
                <ProductContentCell md={gridSize.itemCode}>
                    {row.product?.productItemcode}
                </ProductContentCell>
                <ProductContentCell
                    md={gridSize.units}
                    isEditing={isEditing}
                    value={units}
                    onChange={(e) => setUnits(e.target.value)}
                    type="number"
                >
                    {(Math.abs(units))}
                </ProductContentCell>
                {editSalerate && <ProductContentCell
                    md={gridSize.saleRate}
                    isEditing={isEditing}
                    value={saleRate}
                    onChange={(e) => setSaleRate(e.target.value)}
                    type="number"
                >
                    {ShowNumber(saleRate, 2, true)}
                </ProductContentCell>}
                <ProductContentCell
                    xs={12} md={gridSize.description}
                    isEditing={isEditing}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                >
                    {description}
                </ProductContentCell>
                {
                    !enableAction?.disableAction && allowActions &&
                    <Grid2
                        md={gridSize.action}
                        sx={{
                            display: 'flex',
                            justifyContent: addButtonExtraProps?.enableAdd ? 'center' : 'flex-end',
                            alignItems: 'center'
                        }}
                    >
                        {
                            CustomActionComponent ?
                                CustomActionComponent
                                :
                                <InquiryProductActionButtons
                                    isEditing={isEditing}
                                    startEditing={startEditing}
                                    cancelEditing={cancelEditing}
                                    clearField={clearField}
                                    groupFieldName={groupFieldName}
                                    index={index}
                                    allowActions={allowActions}
                                    addButtonExtraProps={addButtonExtraProps}
                                    item={row}
                                    onSave={save}
                                />}
                    </Grid2>}
            </Grid2>
        </Paper>
    );
};

export default InquiryProductContent;

import React, { useState } from 'react'
import { MEDIUM_SCREEN, SMALL_SCREEN, useScreenSize } from '../../Helpers/helpers';
import ProductContentCell from '../Inquiry/ProductContentCell';
import InquiryProductActionButtons from '../Inquiry/InquiryProductActionButtons';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { PRIMARY_COLOR } from '../../Helpers/ConstantProperties';
import { Paper } from '@mui/material';
import SmallScreenInqProductContent from '../Inquiry/SmallScreenInqProductConent';

const ResponsiveRmAndProcessContent = (props) => {
    const screenSize = useScreenSize();
    return screenSize === SMALL_SCREEN || screenSize === MEDIUM_SCREEN
        ? <SmallScreenInqProductContent {...props} />
        : <ProductTableContent {...props} />;
}
export default ResponsiveRmAndProcessContent

const ProductTableContent = ({
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
    setEditIndex
}) => {
    const isEditing = editIndex === index;
    const screenSize = useScreenSize();
    const [saleRate, setSaleRate] = useState(row.saleRate);
    const [fgRate, setfgRate] = useState(row.fgRate)

    const save = () => {
        handleFieldChange({ target: { value: saleRate } }, 'saleRate', index)
        handleFieldChange({ target: { value: fgRate } }, 'fgRate', index)
        setEditIndex(-1)
    }

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
                    value={saleRate}
                    onChange={(e) => setSaleRate(e.target.value)}
                    type="number"
                >
                    {row.saleRate}
                </ProductContentCell>
                <ProductContentCell
                    xs={12}
                    md={3}
                    isEditing={isEditing}
                    value={fgRate}
                    onChange={(e) => setfgRate(e.target.value)}
                    type="number"
                >
                    {row.fgRate}
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
                        onSave={save}
                    />
                </Grid2>
            </Grid2>
        </Paper>
    );
};
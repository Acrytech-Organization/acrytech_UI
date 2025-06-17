import React, { useContext, useState } from 'react';
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import InquiryProductHeading from './InquiryProductHeading';
import ResponsiveInquiryProductContent from './ResponsiveInquiryProductContent';
import { FirmContext } from '../Contexts/FirmContext';
import { canEditSaleRate } from '../../Helpers/helpers';

const InquiryProductDetails = ({
    data,
    clearField,
    addButtonExtraProps = { enableAdd: false },
    allowActions = true,
    editProp = () => { },
    HeadingComponent = InquiryProductHeading,
    ResponsiveContentComponent = ResponsiveInquiryProductContent,
    groupFieldName = 'products',
    headingList
}) => {
    const { currentFirm } = useContext(FirmContext);
    const editSalerate = canEditSaleRate(currentFirm)
    const List = data[groupFieldName] || [];

    const [editIndex, setEditIndex] = useState(-1);
    const [originalData, setOriginalData] = useState({});

    if (List.length === 0) return <></>;

    const handleFieldChange = (e, prop, index) => {
        editProp(e.target.value, prop, index, groupFieldName);
    };

    const startEditing = (index) => {
        setOriginalData(List[index]);
        setEditIndex(index);
    };

    const cancelEditing = () => {
        editProp(originalData?.productName, 'productName', editIndex, groupFieldName);
        editProp(originalData?.productdescription, 'productdescription', editIndex, groupFieldName);
        editProp(originalData?.units, 'units', editIndex, groupFieldName);
        editProp(originalData?.saleRate, 'saleRate', editIndex, groupFieldName);
        setEditIndex(-1);
    };

    return (
        <Grid2 container width={'100%'} direction="column" marginTop={1} marginBottom={2} spacing={{ xs: 0, sm: 2, md: 0, lg: 0 }}>
            <Grid2
                xs={12}
                sx={{ display: { xs: 'none', sm: 'none', md: 'block', lg: 'block' } }}
            >
                <HeadingComponent heading={headingList} addButtonExtraProps={addButtonExtraProps} />
            </Grid2>
            <Grid2 container>
                {List.map((row, index) => (
                    <Grid2
                        xs={12}
                        key={index}
                        sx={{
                            border: { xs: 'none', sm: 'none', md: '1px solid lightgray', lg: '1px solid lightgray' },
                            borderColor: 'divider',
                        }}
                    >
                        <ResponsiveContentComponent
                            row={row}
                            index={index}
                            editIndex={editIndex}
                            handleFieldChange={handleFieldChange}
                            startEditing={startEditing}
                            cancelEditing={cancelEditing}
                            clearField={clearField}
                            allowActions={allowActions}
                            addButtonExtraProps={addButtonExtraProps}
                            item={data}
                            headingList={headingList}
                            groupFieldName={groupFieldName}
                            editSalerate={editSalerate}
                            setEditIndex = {setEditIndex}
                        />
                    </Grid2>
                ))}
            </Grid2>
        </Grid2>
    );
}

export default InquiryProductDetails;

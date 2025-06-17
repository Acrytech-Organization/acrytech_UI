import { Box } from "@mui/material";
import SmallScreenInqProductContent from "./SmallScreenInqProductConent";
import InquiryProductContent from "./InquiryProductContent";

const ResponsiveInquiryProductContent = ({
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
    data,
    CustomActionComponent,
    editSalerate,
    setEditIndex
}) => {
    return (
        <>
            <Box sx={{ display: { xs: 'block', sm: 'block', md: 'none', lg: 'none' } }}>
                <SmallScreenInqProductContent
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
                    CustomActionComponent={CustomActionComponent}
                    editSalerate={editSalerate}
                    setEditIndex = {setEditIndex}
                />
            </Box>

            <Box sx={{ display: { xs: 'none', sm: 'none', md: 'block', lg: 'block' } }}>
                <InquiryProductContent
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
                    groupFieldName={groupFieldName}
                    headingList={headingList}
                    CustomActionComponent={CustomActionComponent}
                    editSalerate={editSalerate}
                    setEditIndex = {setEditIndex}
                />
            </Box>
        </>
    )
};

export default ResponsiveInquiryProductContent;

import { Paper } from "@mui/material";
import InquiryProductDetails from "../Inquiry/InquiryProductDetails";
import ProductContentCell from "../Inquiry/ProductContentCell";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { MEDIUM_SCREEN, SMALL_SCREEN, useScreenSize } from "../../Helpers/helpers";
import InquiryProductActionButtons from "../Inquiry/InquiryProductActionButtons";
import { PRIMARY_COLOR } from "../../Helpers/ConstantProperties";
function QcTable(props) {

    return <InquiryProductDetails
        {...props}
        allowActions={true}
        ResponsiveContentComponent={QcTableContent}
    />
}

export default QcTable;

const QcTableContent = ({
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
                <ProductContentCell xs={12} md={4} 
                color={PRIMARY_COLOR}
                isEditing={isEditing}
                    value={row.QcMaterialname}
                    onChange={(e) => handleFieldChange(e, 'QcMaterialname', index)}
                >
                    <strong>{row.QcMaterialname}</strong>
                </ProductContentCell>
                <ProductContentCell xs={12} md={4} color={PRIMARY_COLOR}
                isEditing={isEditing}
                value={row.QcDimention}
                onChange={(e) => handleFieldChange(e, 'QcDimention', index)}>
                    <strong>{row.QcDimention}</strong>
                </ProductContentCell>
               
                <Grid2
                    xs={12}
                    md={4}
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
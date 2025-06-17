import { Paper } from "@mui/material";
import InquiryProductDetails from "../Inquiry/InquiryProductDetails";
import ProductContentCell from "../Inquiry/ProductContentCell";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { MEDIUM_SCREEN, SMALL_SCREEN, useScreenSize } from "../../Helpers/helpers";
import InquiryProductActionButtons from "../Inquiry/InquiryProductActionButtons";
import { PRIMARY_COLOR } from "../../Helpers/ConstantProperties";
function InpectionTable(props) {

    return <InquiryProductDetails
        {...props}
        allowActions={true}
        ResponsiveContentComponent={InpectionTableContent}
    />
}

export default InpectionTable;

const InpectionTableContent = ({
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
                <ProductContentCell xs={12} md={3}
                color={PRIMARY_COLOR}
                isEditing={isEditing}
                    value={row.inspectionParameter}
                    onChange={(e) => handleFieldChange(e, 'inspectionParameter', index)}
                >
                    <strong>{row.inspectionParameter}</strong>
                </ProductContentCell>
                <ProductContentCell xs={12} md={3} color={PRIMARY_COLOR}
                isEditing={isEditing}
                value={row.inspectionDiamention}
                onChange={(e) => handleFieldChange(e, 'inspectionDiamention', index)}>
                    <strong>{row.inspectionDiamention}</strong>
                </ProductContentCell>
                <ProductContentCell xs={12} md={3} color={PRIMARY_COLOR}
                isEditing={isEditing}
                value={row.inspectionTolerance}
                onChange={(e) => handleFieldChange(e, 'inspectionTolerance', index)}>
                    <strong>{row.inspectionTolerance}</strong>
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
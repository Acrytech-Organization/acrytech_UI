import { Paper, Typography } from "@mui/material";
import CardActionButtons from "../GenericComponents/DataView/CardActionButtons";
import GenericSkeleton from "../GenericComponents/DataView/GenericSkeleton";
import { commonFontWeight, CREATE_DISCOUNT, NEW_DISCOUNT, UPDATE_ON_DISCOUNT } from "../../Helpers/ConstantProperties";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useNavigate } from "react-router-dom";
import { GenericErrorComponent, GenericSuccessComponent } from "../GenericComponents/FormComponent/GenericAlertComponent";
import { serviceHelpers } from "../../Helpers/ServiceHelpers";
import EditMenuItem from "../GenericComponents/DataView/EditMenuItem";
import DeleteMenuItem from "../GenericComponents/DataView/DeleteMenuItem";

function DiscountCard({ item }) {
    const navigate = useNavigate();

    const successMessage = "Successfully Deleted!";

    const deleteDicountSlab = async (khID) => {
        return await serviceHelpers.deleteDiscountSlab(khID, item.id);
    };

    const onDelete = {
        ErrorComponent: ({ error }) => <GenericErrorComponent error={error} />,
        SuccessComponent: ({ data }) => <GenericSuccessComponent data={data} message={successMessage} />,
        navigateTo: NEW_DISCOUNT,
        queryFunction: deleteDicountSlab,
        queryKeyValue: UPDATE_ON_DISCOUNT,
    };

    const onEdit = () => {
        navigate(CREATE_DISCOUNT, { state: item });
    };

    if (item.showSkeleton) return <GenericSkeleton />;

    return (
        <Grid2 key={item.id} xs={12}>
            <Paper sx={{ padding: '0.3rem', minWidth: 0, px: 2 }} elevation={2} >
                <Grid2 container direction={'row'} alignItems="center" spacing={2}>
                    <Grid2 xs={12} md={4}>
                        <Typography
                            noWrap
                            variant="subtitle2"
                            sx={{
                                fontWeight: commonFontWeight,
                                paddingLeft: { xs: '0.3rem' },
                                textAlign: { xs: 'left' }
                            }}
                        >
                            {item.name}
                        </Typography>
                    </Grid2>
                    <Grid2 xs={12} md={4}>
                        <Typography
                            noWrap
                            variant="body2"
                            sx={{
                                textAlign: { xs: 'left' },
                                paddingLeft: { xs: '0.3rem' },
                                color: 'text.secondary'
                            }}
                        >
                            Discount Rate: {item.discountRate}%
                        </Typography>
                    </Grid2>
                    <Grid2 xs={12} md={4} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <CardActionButtons menuList={[
                            <EditMenuItem onEdit={onEdit} />,
                            <DeleteMenuItem onDelete={onDelete} />
                        ]} />
                    </Grid2>
                </Grid2>
            </Paper>
        </Grid2>
    );
}

export default DiscountCard;
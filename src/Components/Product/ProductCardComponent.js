
import { Paper, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import CardActionButtons from "../GenericComponents/DataView/CardActionButtons";
import GenericSkeleton from "../GenericComponents/DataView/GenericSkeleton";
import { useLocation, useNavigate } from "react-router-dom";
import { GenericErrorComponent, GenericSuccessComponent } from "../GenericComponents/FormComponent/GenericAlertComponent";
import { commonFontSize, EDITPRODUCT, PRIMARY_COLOR, UPDATE_ON_PRODUCT } from "../../Helpers/ConstantProperties";
import { serviceHelpers } from "../../Helpers/ServiceHelpers";
import { getSaleRate, ShowNumber, SMALL_SCREEN, useScreenSize } from "../../Helpers/helpers";
import EditMenuItem from "../GenericComponents/DataView/EditMenuItem";
import DeleteMenuItem from "../GenericComponents/DataView/DeleteMenuItem";

function ProductCardComponent({ item }) {
    const navigate = useNavigate();
    const screenSize = useScreenSize();
    const location = useLocation();
    const currentPath = location.pathname;

    if (item.showSkeleton) return <GenericSkeleton />;

    let successMessage = "Product Deleted Successfully"

    const deleteProductQueryFunction = async (khid) => {
        return await serviceHelpers.deleteProducts(khid, item.id);
    }

    const onDelete = {
        ErrorComponent: ({ error }) => <GenericErrorComponent error={error} />,
        SuccessComponent: ({ data }) => <GenericSuccessComponent data={data} message={successMessage} />,
        navigateTo: currentPath,
        queryFunction: deleteProductQueryFunction,
        queryKeyValue: UPDATE_ON_PRODUCT,
    }

    const onEdit = () => {
        navigate(EDITPRODUCT, { state: { ...item, navigateTo: currentPath, editProduct: true } })
    }

    const showCard = screenSize === SMALL_SCREEN ? true : false

    return (
        <Paper key={item.id} elevation={1}>
            <Grid2 container paddingX={1} paddingBottom={{ xs: 1, md: 0 }}>

                <Grid2 xs={9} md={5} alignSelf={"center"}>
                    <Typography
                        noWrap
                        className="text-truncate"
                        color={PRIMARY_COLOR}
                        textAlign={"start"}>
                        {item.name}
                    </Typography>
                </Grid2>

                <Grid2
                    textAlign={"left"}
                    display={showCard ? "block" : "none"}
                    xs={3}
                    alignSelf={"center"}>
                    <CardActionButtons menuList={[
                        <EditMenuItem onEdit={onEdit} />,
                        <DeleteMenuItem onDelete={onDelete} />
                    ]} />
                </Grid2>

                <Grid2 xs={3} md={2} alignSelf={"center"}>
                    <Typography noWrap textAlign={{ md: "center", xs: "left" }} fontSize={commonFontSize}>
                        {item.productItemcode}
                    </Typography>
                </Grid2>

                <Grid2 xs={3} md={1} alignSelf={"center"}>
                    {item.unit}
                </Grid2>

                <Grid2 xs={3} md={1} alignSelf={"center"}>
                    <Typography textAlign={"center"} fontSize={commonFontSize}>
                        {`${item.GSTRate || 0} %`}
                    </Typography>
                </Grid2>

                <Grid2 xs={3} md={1} alignSelf={"center"}>
                    <Typography textAlign={"right"} paddingRight={2} fontSize={commonFontSize}>
                        {ShowNumber(parseFloat(getSaleRate(item)), 2, true)}
                    </Typography>
                </Grid2>

                <Grid2 md></Grid2>

                <Grid2
                    display={showCard ? "none" : "block"}
                    xs={12}
                    alignSelf={"center"}
                    md={1}>
                    <CardActionButtons menuList={[
                        <EditMenuItem onEdit={onEdit} />,
                        <DeleteMenuItem onDelete={onDelete} />
                    ]} />
                </Grid2>

            </Grid2>
        </Paper>
    )
}

export default ProductCardComponent;
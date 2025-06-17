import { Avatar, Paper, Typography, Box } from "@mui/material";
import { getInitials, stringToColor } from "../../Helpers/helpers";
import CardActionButtons from "../GenericComponents/DataView/CardActionButtons";
import GenericSkeleton from "../GenericComponents/DataView/GenericSkeleton";
import { APPROVED, commonFontWeight, CREATE_USER, NEW_USERS, NOT_APPROVED, UPDATE_ON_USER } from "../../Helpers/ConstantProperties";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useNavigate } from "react-router-dom";
import { serviceHelpers } from "../../Helpers/ServiceHelpers";
import { GenericErrorComponent, GenericSuccessComponent } from "../GenericComponents/FormComponent/GenericAlertComponent";
import EditMenuItem from "../GenericComponents/DataView/EditMenuItem";
import DeleteMenuItem from "../GenericComponents/DataView/DeleteMenuItem";

function UserCard({ item }) {
    const navigate = useNavigate();

    const successMessage = "Successfully Deleted!";

    const deleteUser = async (khID) => {
        return await serviceHelpers.deleteUser(khID, item.id);
    };

    const onDelete = {
        ErrorComponent: ({ error }) => <GenericErrorComponent error={error} />,
        SuccessComponent: ({ data }) => <GenericSuccessComponent data={data} message={successMessage} />,
        navigateTo: NEW_USERS,
        queryFunction: deleteUser,
        queryKeyValue: UPDATE_ON_USER,
    };

    const onEdit = () => {
        navigate(CREATE_USER, { state: item });
    };

    if (item.showSkeleton) return <GenericSkeleton />;

    return (
        <Grid2 key={item.id} xs={12}>
            <Paper className='' sx={{ padding: '0.3rem', minWidth: 0 }} elevation={2}>
                <Grid2 container alignItems="center" spacing={2}>
                    <Grid2 xs={12} sm={4} md={3} lg={2}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar sx={{ bgcolor: stringToColor(item.displayName), width: 35, height: 35, marginRight: 2, fontSize: "0.75rem" }}>
                                {getInitials(item.displayName)}
                            </Avatar>
                            <Box>
                                <Typography
                                    noWrap
                                    variant="subtitle2"
                                    color={"primary.main"}
                                    sx={{
                                        fontWeight: commonFontWeight,
                                        textAlign: { xs: 'left' }
                                    }}
                                >
                                    {item.displayName}
                                </Typography>
                                <Typography
                                    noWrap
                                    variant="body2"
                                    sx={{
                                        textAlign: { xs: 'left' },
                                        color: 'text.secondary'
                                    }}
                                >
                                    {item.city}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid2>
                    <Grid2 xs={12} sm={4} md={2} lg={2}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography
                                noWrap
                                variant="subtitle2"
                                sx={{
                                    fontWeight: commonFontWeight,
                                    paddingLeft: { xs: '0.3rem' },
                                    textAlign: { xs: 'left' }
                                }}
                            >
                                {item.approved ? APPROVED : NOT_APPROVED}
                            </Typography>
                        </Box>
                    </Grid2>
                    <Grid2 xs={12} sm={3} md={2} lg={3}>
                        <Typography
                            variant="body2"
                            sx={{
                                textAlign: { xs: 'left', sm: 'center' },
                                paddingLeft: { xs: '0.3rem' },
                                color: 'text.secondary'
                            }}
                        >
                            {item.phoneNumber}
                        </Typography>
                    </Grid2>
                    <Grid2 xs={12} sm={6} md={3.5} lg={3}>
                        <Typography
                            variant="body2"
                            sx={{
                                textAlign: { xs: 'left', },
                                paddingLeft: { xs: '0.3rem' },
                                color: 'text.secondary'
                            }}
                        >
                            {item.email}
                        </Typography>
                    </Grid2>
                    <Grid2 xs={12} sm={6} md={1.5} lg={2} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
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

export default UserCard;
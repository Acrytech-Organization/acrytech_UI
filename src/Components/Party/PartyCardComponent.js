import React, { useContext } from 'react';
import { Paper, Typography, Box, Avatar } from '@mui/material';
import CardActionButtons from '../GenericComponents/DataView/CardActionButtons';
import { useNavigate } from 'react-router-dom';
import { BALANCE, commonFontSize, commonFontWeight, CUSTOMER, CUSTOMER_INFO, EDITPARTY, MANAGE_CUSTOMERS, UPDATE_ON_PARTY } from '../../Helpers/ConstantProperties';
import { serviceHelpers } from '../../Helpers/ServiceHelpers';
import { GenericErrorComponent, GenericSuccessComponent } from '../GenericComponents/FormComponent/GenericAlertComponent';
import { checkValue, getDateDifferance, getInitials, ShowNumber, stringToColor } from '../../Helpers/helpers';
import GenericSkeleton from '../GenericComponents/DataView/GenericSkeleton';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../Auth/Auth';
import { FirmContext } from '../Contexts/FirmContext';
import EditMenuItem from '../GenericComponents/DataView/EditMenuItem';
import DeleteMenuItem from '../GenericComponents/DataView/DeleteMenuItem';

const PartyCardComponent = ({ item }) => {
    const { uid } = useContext(AuthContext);
    const { khID } = useContext(FirmContext);
    const navigate = useNavigate();

    const successMessage = "Party Successfully Deleted";

    const deleteUserRoleQueryFunction = async (khID) => {
        return await serviceHelpers.deleteParty(khID, item.id);
    };

    const { data, isLoading } = useQuery({
        queryKey: [
            uid,
            khID,
            item.showSkeleton,
            BALANCE + item.id
        ],
        queryFn: async () => {
            if (item.showSkeleton) return {};
            return await serviceHelpers.getInvoices(khID, null, null, item.id, true);
        }
    })

    const onDelete = {
        ErrorComponent: ({ error }) => <GenericErrorComponent error={error} />,
        SuccessComponent: ({ data }) => <GenericSuccessComponent data={data} message={successMessage} />,
        navigateTo: MANAGE_CUSTOMERS,
        queryFunction: deleteUserRoleQueryFunction,
        queryKeyValue: UPDATE_ON_PARTY,
    };

    const onEdit = () => {
        navigate(EDITPARTY, { state: item });
    };

    if (item.showSkeleton || isLoading) return <GenericSkeleton />;

    const removeExtraSpace = {
        m: 0, p: 0
    }

    let gridProps = {}

    const followUpDue = getDateDifferance(item.lastUpdated, new Date(item.followUpDate))

    const navigateToCustomerInfo = () => navigate(CUSTOMER_INFO, { state: item })

    if (item.type === CUSTOMER) {
        gridProps.className = "pointer"
        gridProps.onClick = navigateToCustomerInfo
    }

    return (
        <Paper key={item.id} sx={{ padding: '0.3rem', minWidth: 0 }} elevation={2}>
            <Grid2 container alignItems="center" spacing={2}>
                <Grid2 xs={12} sm={4} md={3} lg={2}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ bgcolor: stringToColor(item.name), width: 35, height: 35, marginRight: 2, fontSize: commonFontSize }}>
                            {getInitials(item.name)}
                        </Avatar>
                        <Grid2 {...gridProps} lg={12} {...removeExtraSpace}>
                            <Grid2 {...removeExtraSpace}>
                                <Typography
                                    variant="subtitle2"
                                    className='text-break text-wrap'
                                    color={"primary.main"}
                                    sx={{
                                        fontWeight: commonFontWeight,
                                        textAlign: { xs: 'left' }
                                    }}
                                >
                                    {checkValue(item.name)}
                                </Typography>
                            </Grid2>
                            <Grid2 {...removeExtraSpace}>
                                <Typography
                                    className='text-break text-wrap'
                                    variant="body2"
                                    sx={{
                                        textAlign: { xs: 'left' },
                                        color: 'text.secondary'
                                    }}
                                >
                                    {checkValue(item.city)}
                                </Typography>
                            </Grid2>
                        </Grid2>
                    </Box>
                </Grid2>
                <Grid2 xs={12} sm={4} md={2} lg={2}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Grid2 className='d-flex' {...removeExtraSpace}>
                            {followUpDue >= 0 && <Typography
                                noWrap
                                variant="subtitle2"
                                sx={{
                                    fontWeight: commonFontWeight,
                                    paddingLeft: { xs: '0.3rem' },
                                    textAlign: { xs: 'left' }
                                }}
                            >
                                Follow-Up Due
                            </Typography>}
                            {
                                item.type === CUSTOMER &&
                                (<Typography
                                    noWrap
                                    variant="subtitle2"
                                    color={followUpDue >= 0 ? "primary.main" : "warning.main"}
                                    sx={{
                                        fontWeight: commonFontWeight,
                                        paddingLeft: { xs: '0.3rem' },
                                        textAlign: { xs: 'left' }
                                    }}
                                >
                                    {
                                        followUpDue >= 0 ? checkValue(followUpDue) : `OverDue for ${Math.abs(followUpDue)} days`}
                                </Typography>)}
                        </Grid2>
                        <Typography
                            noWrap
                            variant="body2"
                            sx={{
                                textAlign: { xs: 'left' },
                                paddingLeft: { xs: '0.3rem' },
                                color: 'text.secondary'
                            }}
                        >
                            {checkValue(item.type)}
                        </Typography>
                    </Box>
                </Grid2>

                {
                    item.type === CUSTOMER && data &&
                    <Grid2 xs={12} sm={3} md={2} lg={3}>
                        <Typography
                            variant="body2"
                            sx={{
                                textAlign: { xs: 'left', sm: 'center' },
                                paddingLeft: { xs: '0.3rem' },
                                color: 'text.secondary'
                            }}
                        >
                            Invoices: {data[0] || 0}
                        </Typography>
                    </Grid2>
                }

                {item.phoneNumber &&
                    <Grid2 xs={12} sm={3} md={2} lg={3}>
                        <Typography
                            variant="body2"
                            sx={{
                                textAlign: { xs: 'left', sm: 'center' },
                                paddingLeft: { xs: '0.3rem' },
                                color: 'text.secondary'
                            }}
                        >
                            {checkValue(item.phoneNumber)}
                        </Typography>
                    </Grid2>
                }

                {item.shiftHrs &&
                    <>
                        <Grid2 xs={12} sm={6} md={1.5}>
                            <Typography
                                variant="body2"
                                sx={{
                                    textAlign: { xs: 'left', },
                                    paddingLeft: { xs: '0.3rem' },
                                    color: 'text.secondary'
                                }}
                                className='text-truncate'
                            >
                                {checkValue(item.shiftHrs)} Hrs
                            </Typography>
                        </Grid2>

                        <Grid2 xs={12} sm={6} md={1.5}>
                            <Typography
                                variant="body2"
                                sx={{
                                    textAlign: { xs: 'left', },
                                    paddingLeft: { xs: '0.3rem' },
                                    color: 'text.secondary'
                                }}
                                className='text-truncate'
                            >
                                {ShowNumber(item.perHrRate, 2, true)}
                            </Typography>
                        </Grid2>
                    </>
                }

                <Grid2 xs={12} sm={6} md={1.5} lg={2} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <CardActionButtons menuList={[
                        <EditMenuItem onEdit={onEdit} />,
                        <DeleteMenuItem onDelete={onDelete} />
                    ]} />
                </Grid2>
            </Grid2>
        </Paper>
    );
};

export default PartyCardComponent;
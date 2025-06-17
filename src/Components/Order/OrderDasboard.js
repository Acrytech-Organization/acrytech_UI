import React from 'react'
import GenericHeader from '../GenericComponents/Header/GenericHeader'
import { useNavigate } from 'react-router-dom';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { CREATE_NEW_ORDER, INQ_ONTRACK, STATUS_OPTIONS } from '../../Helpers/ConstantProperties';
import OrderDashboardContent from './OrderDashboardContent';

const OrderDasboard = ({ searchString, setSearchString, leads }) => {
    const navigate = useNavigate()

    const newOrdNavigate = () => {
        navigate(CREATE_NEW_ORDER);
    };
    return (
        <>
            <GenericHeader
                title="Order Dashboard"
                textFieldLabel="Search by Company Name, Contact Person, Phone Number or Source of Lead"
                buttonText="New Order"
                setSearchString={setSearchString}
                searchString={searchString}
                onButtonClick={newOrdNavigate}
            />

            <Grid2 container spacing={1}>
                <Grid2 xs={12}>
                    <OrderDashboardContent
                        data={leads[INQ_ONTRACK]}
                        tagColor={STATUS_OPTIONS[INQ_ONTRACK]} />
                </Grid2>
            </Grid2>

        </>
    )
}

export default OrderDasboard
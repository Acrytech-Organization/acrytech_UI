import React, { useContext } from 'react';
import GenericHeader from '../GenericComponents/Header/GenericHeader';
import { useNavigate } from 'react-router-dom';
import DashboardContent from './DashboardContent';
import { Grid } from '@mui/material';
import { DateContext } from '../Contexts/DateContext';
import { getGroupedLeads } from '../../Helpers/helpers';

const Dashboard = ({ searchString,
    setSearchString,
    leads,
    routeDetails,
    CustomBody,
    CustomBodies = {},
    disableCard = {}
}) => {
    const { currentDate } = useContext(DateContext);
    const navigate = useNavigate();

    const newInqNavigate = () => {
        navigate(routeDetails?.navigateTo);
    };

    const statusCard = getGroupedLeads(leads,currentDate);

    return (
        <>
            <GenericHeader
                title={routeDetails?.headerTitle}
                textFieldLabel="Search by Company Name, Contact Person, Phone Number or Source of Lead"
                buttonText={routeDetails?.buttonText}
                setSearchString={setSearchString}
                searchString={searchString}
                onButtonClick={newInqNavigate}
            />

            <Grid container rowGap={2}>
                {
                    statusCard.map((element, index) => {
                        if (disableCard[element.name]) return <React.Fragment key={index}></React.Fragment>;
                        const CustomBodyForStatus = CustomBodies[element.name] || CustomBody;
                        return (
                            <Grid key={index} item xs={12}>
                                <DashboardContent
                                    data={element.data}
                                    tagColor={element.tagColor}
                                    CustomBody={CustomBodyForStatus}
                                />
                            </Grid>
                        )
                    })
                }
            </Grid>
        </>
    );
};

export default Dashboard;

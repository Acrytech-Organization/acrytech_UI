import React, { useContext } from 'react';
import { AuthContext } from '../Auth/Auth';
import { FirmContext } from '../Contexts/FirmContext';
import { LABOURS, UPDATE_ON_INQUIRY } from '../../Helpers/ConstantProperties';
import LabourCostCard from './labourCostCard';
import { serviceHelpers } from '../../Helpers/ServiceHelpers';
import Grid2 from '@mui/material/Unstable_Grid2';
import { useQuery } from '@tanstack/react-query';
import GenericSpinner from '../GenericComponents/FormComponent/GenericSpinner';
import { Paper } from '@mui/material';

const InquiryLabourCostTable = ({ inquiry }) => {
    const { uid } = useContext(AuthContext);
    const { khID } = useContext(FirmContext);

    const queryKey = [
        uid,
        khID,
        UPDATE_ON_INQUIRY,
        inquiry.id,
        LABOURS,
        "COST TABLE"
    ];

    const queryFunction = async () => {
        return await serviceHelpers.getLabourCostForToday(khID, inquiry);
    }

    const { data, isLoading } = useQuery({
        queryFn: queryFunction,
        queryKey: queryKey
    })

    if (isLoading) return <GenericSpinner />

    if (data) {
        return (
            <Paper elevation={1}>
                <Grid2 container>
                    {
                        data.map((item, index) => {
                            if (index === 0) return <React.Fragment key={index}></React.Fragment>

                            return (
                                <Grid2 xs={12} key={index} padding={1}>
                                    <LabourCostCard item={item} />
                                </Grid2>
                            )
                        })
                    }
                </Grid2>
            </Paper>
        )

    }

    return <></>

};

export default InquiryLabourCostTable;
import { useLocation } from 'react-router-dom';
import { GenericErrorComponent } from '../GenericComponents/FormComponent/GenericAlertComponent';
import { Paper, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { commonFontWeight } from '../../Helpers/ConstantProperties';
import GenerateRequirementContent from '../Requirement/GenerateRequirementContent';
import InquiryExpenseForm from './InquiryExpenseForm';
import InquiryExpensesCostTable from './InquiryExpensesCostTable';

const InquiryExpensesCost = () => {

    const location = useLocation();
    var { item } = location.state;

    if (!item) return <GenericErrorComponent error={new Error("No Inquiry")} />

    return (
        <Paper elevation={2} sx={{ padding: 2, margin: 2 }}>
            <Grid2 container direction="column" spacing={2}>
                <Grid2 xs={12}>
                    <Typography variant='h6' component="h2" sx={{ fontWeight: commonFontWeight }}>
                        {item.customerName}
                    </Typography>
                </Grid2>

                <Grid2 xs={12}>
                    <GenerateRequirementContent item={item} />
                </Grid2>

                <Grid2 xs={12}>
                    <InquiryExpenseForm inquiry={item} />
                </Grid2>

                <Grid2 xs={12}>
                    <InquiryExpensesCostTable inquiry={item} />
                </Grid2>

            </Grid2>
        </Paper>
    );
};

export default InquiryExpensesCost;
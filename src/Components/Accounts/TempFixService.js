import { useContext } from 'react';
import { FirmContext } from '../Contexts/FirmContext';
import { useMutation } from '@tanstack/react-query';
import Grid2 from '@mui/material/Unstable_Grid2';
import { GenericErrorComponent } from '../GenericComponents/FormComponent/GenericAlertComponent';
import { serviceHelpers } from '../../Helpers/ServiceHelpers';
import { TAX_INVOICE } from '../../Helpers/ConstantProperties';
import { getSaleMarkersFromCData } from '../../Helpers/MarkerHelper';

const TempFixService = () => {
    const { khID } = useContext(FirmContext);

    const queryFn = async () => {

        const invoices = await serviceHelpers.getAllVouchersOfType(khID, TAX_INVOICE);

        for (let index = 0; index < invoices.length; index++) {
            const invoice = invoices[index];

            const markers = getSaleMarkersFromCData(
                invoice.cData,
                invoice.date,
                { id: invoice.customerId, name: invoice.customerName });

            for (let mi = 0; mi < markers.length; mi++) {
                const marker = markers[mi];
                await serviceHelpers.createMarkers(khID, marker);
            }
        }

        return true;
    }

    const { mutate, error } = useMutation({
        mutationFn: queryFn,
        onSuccess: (data) => {
            console.log(data);
        },
        onError: (error) => {
            console.error(error);
        }
    })

    if (error) return <GenericErrorComponent error={error} />

    return (
        <Grid2 container>

            <Grid2 xs={12} textAlign={"center"} padding={4}>
                <button onClick={() => mutate()}>Fix</button>
            </Grid2>

        </Grid2>
    )

};

export default TempFixService;
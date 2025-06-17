import { Button, Paper, Typography } from "@mui/material";
import ProductContentCell from "../Inquiry/ProductContentCell";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { SMALL_SCREEN, useScreenSize } from "../../Helpers/helpers";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Auth/Auth";
import { FirmContext } from "../Contexts/FirmContext";
import { BALANCE, INQUIRY_STORE_ACCOUNT_ID } from "../../Helpers/ConstantProperties";
import { serviceHelpers } from "../../Helpers/ServiceHelpers";
import { GenericErrorComponent } from "../GenericComponents/FormComponent/GenericAlertComponent";
import GenericSpinner from "../GenericComponents/FormComponent/GenericSpinner";

const AssignGoodsTableComponent = ({ item, row, index, handleSubmit }) => {

    const { uid } = useContext(AuthContext);
    const { khID } = useContext(FirmContext);

    const screenSize = useScreenSize();

    const queryKey = [
        uid,
        khID,
        BALANCE + INQUIRY_STORE_ACCOUNT_ID,
        row.product?.id
    ]

    var { data, error, isLoading } = useQuery({
        queryKey: queryKey,
        queryFn: async () => await serviceHelpers.getResourceBalance(
            khID,
            {
                accountID: INQUIRY_STORE_ACCOUNT_ID,
                resourceID: row.product?.id,
                date: Date.now()
            }
        )
    });

    if (error) {
        return <GenericErrorComponent error={error} />;
    }

    if (isLoading) {
        return <GenericSpinner />;
    }


    const balanceInStore = data[0]?.units || 0
    // balance of product in store
    const inquiryBalance = data[0]?.batches[item.id] || 0
    // inquiry alloted balance
    const remaining = row.units - inquiryBalance
    // inquiry remaining balance

    const proplist = [{
        label: 'Name:',
        value: row.product?.name,
        sx: { md: 2 }
    }, {
        label: 'Req. Quantity:',
        value: row.units,
        sx: { md: 2 }
    }, {
        label: 'Released Quantity:',
        value: inquiryBalance,
        sx: { md: 2 }
    }, {
        label: 'Remaining Quantity:',
        value: remaining,
        sx: { md: 2 }
    }, {
        label: '',
        value: <Button
            disabled={balanceInStore - inquiryBalance <= 0 || inquiryBalance === Number(row.units)}
            onClick={() => handleSubmit(row, data)}
        >Assign FG
        </Button>,
        sx: { md: 4 }
    }]

    return (
        <Paper
            elevation={0}
            className="p-2 rounded-2 rounded-sm-0"
            sx={{
                border: screenSize === SMALL_SCREEN ? '1px solid rgba(0, 0, 0, 0.12)' : 'none'
            }}
        >
            <Grid2 container>
                {proplist.map((item, i) => (
                    screenSize === SMALL_SCREEN ? <Grid2 key={i}
                        xs={12}
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >

                        <Typography sx={{ mr: 1 }} textAlign={'end'}>
                            {item.label}
                        </Typography>

                        {item.value}

                    </Grid2>
                        :
                        <ProductContentCell xs={12} md={2} {...item.sx} key={i}>
                            {item.value}
                        </ProductContentCell>
                ))}
            </Grid2>
        </Paper>
    )
}

export default AssignGoodsTableComponent;
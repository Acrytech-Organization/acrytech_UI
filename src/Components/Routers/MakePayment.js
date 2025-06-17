import { useContext } from "react";
import { FirmContext } from "../Contexts/FirmContext";
import { Box } from "@mui/material";
import { GenericVerifyComponent } from "../GenericComponents/VerifyComponent/FirmVerifyComponent";
import { PaymentButton } from "../GenericComponents/Payment/PaymentButton";
import Grid2 from "@mui/material/Unstable_Grid2";
import { AuthContext } from "../Auth/Auth";
import { checkValue } from "../../Helpers/helpers";

export const MakePayment = () => {
    const { currentFirm } = useContext(FirmContext)
    const { currentUserObject } = useContext(AuthContext)

    return (
        <Grid2 className='align-content-center f-flex h-100 m-2'>
            <div className="align-self-center d-flex justify-content-around w-100">
                <div className="border border-1 border-info p-3">
                    <Box textAlign={"center"}>
                        <GenericVerifyComponent
                            title={
                                "Add 100 Inquiries Credits to Your Account"} />
                        <PaymentButton
                            ProfileImage={currentFirm.logoUrl}
                            amount={499}
                            name={checkValue(currentUserObject?.displayName)}
                            notes={"Add 100 Inquiries Credits to Your Account "}
                            prefill={{
                                "name": currentFirm.name,
                                "email": currentFirm.email,
                                "contact": currentFirm.phoneNumber
                            }}
                            description="add 100 credit"
                        />
                    </Box>
                </div>
            </div>
        </Grid2>
    )
}
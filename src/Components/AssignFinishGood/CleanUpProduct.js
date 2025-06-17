import { useContext } from "react";
import { serviceHelpers } from "../../Helpers/ServiceHelpers";
import { AuthContext } from "../Auth/Auth";
import { FirmContext } from "../Contexts/FirmContext";
import { GenericErrorComponent } from "../GenericComponents/FormComponent/GenericAlertComponent";
import GenericSpinner from "../GenericComponents/FormComponent/GenericSpinner";
import { CLEANINQUIRIES, PRODUCT_TYPE_CUSTOM, PRODUCTION_PLAN, UPDATE_ON_INQUIRY, UPDATE_ON_PARTY } from "../../Helpers/ConstantProperties";
import { useQuery } from "@tanstack/react-query";
import { CLOSED_INQUIRY_TAG, INQUIRY_REJECT_TAG } from "../../Helpers/ExtraProperties";
import { CleanUpDeleteComponent } from "./CleanUpDeleteComponent";
import Grid2 from "@mui/material/Unstable_Grid2";
import { Typography } from "@mui/material";
import { isOlderByValue } from "../../Helpers/helpers";

export const CleanUp = () => {
    const { uid } = useContext(AuthContext);
    const { khID } = useContext(FirmContext);

    const queryKey = [
        uid,
        khID,
        UPDATE_ON_INQUIRY,
        UPDATE_ON_PARTY,
        CLEANINQUIRIES
    ]

    var { data, error, isLoading } = useQuery({
        queryKey: queryKey,
        queryFn: async () => {

            let outputArray = {
                vouchers: [],
                inquiries: [],
                CustomProduct: [],
                batches: [],
                totalDeletingElements: 0
            }

            let rejectedInquiries =
                await serviceHelpers.getAllLeads(
                    khID,
                    null,
                    { tag: INQUIRY_REJECT_TAG }
                );

            let closedInquiries =
                await serviceHelpers.getAllLeads(
                    khID,
                    null,
                    { tag: CLOSED_INQUIRY_TAG }
                );

            let result = rejectedInquiries?.length > 0 ? rejectedInquiries : []

            if (closedInquiries?.length > 0) result.push(...closedInquiries)

            outputArray.inquiries = result.filter(element => isOlderByValue(element.createdAt, 6));

            outputArray.totalDeletingElements += (outputArray.inquiries.length || 0)

            for (let i = 0; i < outputArray.inquiries.length; i++) {
                let inquiry = outputArray.inquiries[i]
                let batches = await serviceHelpers.getBatches(khID, { inquiryID: inquiry.id, name: PRODUCTION_PLAN })
                if (batches?.length) {
                    outputArray.totalDeletingElements += batches?.length
                    outputArray.batches.push(...batches)
                }
            }

            outputArray.inquiries.forEach(inq => {
                inq.products.forEach(product => {
                    if (product.product.type === PRODUCT_TYPE_CUSTOM) {
                        outputArray.CustomProduct.push({ id: product.product.id })
                        outputArray.totalDeletingElements += 1
                    }
                });
            });

            // todo
            //support for delete option for voucher
            //support for deleting the transaction of the history of the status changed

            return outputArray;
        }
    });

    if (error) {
        return <GenericErrorComponent error={error} />;
    }

    if (isLoading) {
        return <GenericSpinner />;
    }

    const renderArray = [
        {
            Component: <CleanUpDeleteComponent deletingData={data} />
        }
    ]

    return <Grid2 container display={"flex"} >
        <Grid2 width={"100%"} className="d-flex justify-content-center border border-1 p-2 m-1 ">
            <Typography variant="h6" gutterBottom>
                Clean Inquiries
            </Typography>
        </Grid2>
        {
            renderArray.map(element => element.Component)
        }
    </Grid2>
}
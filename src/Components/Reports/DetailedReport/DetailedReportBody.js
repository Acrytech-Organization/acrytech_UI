import { PRODUCT_TYPE_FINISHED, PRODUCT_WISE_INQUIRY, REPORT, SOURCE_WISE_INQUIRY, UPDATE_ON_INQUIRY, UPDATE_ON_INQUIRY_SOURCE, UPDATE_ON_PRODUCT } from "../../../Helpers/ConstantProperties";
import { useContext, useState } from "react";
import AddProperty from "../../AddProperties/AddProperty";
import { INQUIRY_TAG, SchemaTypes } from "../../../Helpers/ExtraProperties";
import { useQuery } from "@tanstack/react-query";
import { serviceHelpers } from "../../../Helpers/ServiceHelpers";
import { AuthContext } from "../../Auth/Auth";
import { FirmContext } from "../../Contexts/FirmContext";
import ReportInquiryCard from "./ReportInquiryCard";
import { CircularProgress } from "@mui/material";
import { GenericErrorComponent } from "../../GenericComponents/FormComponent/GenericAlertComponent";
import Grid2 from "@mui/material/Unstable_Grid2";

function DetailedReportBody({ selectedReport }) {
    const [selected, setSelected] = useState(null);
    const { uid } = useContext(AuthContext);
    const { khID } = useContext(FirmContext);

    const queryKey = [
        uid,
        khID,
        UPDATE_ON_INQUIRY,
        UPDATE_ON_INQUIRY_SOURCE,
        UPDATE_ON_PRODUCT,
        REPORT
    ]
    let filterFunction = (data) => [];
    let DisplayComponent = null;

    var { data, isLoading, isError, error } = useQuery({
        queryKey: queryKey,
        queryFn: async () => await serviceHelpers.getAllLeads(khID, null, { tag: INQUIRY_TAG })
    })

    switch (selectedReport?.name) {
        case SOURCE_WISE_INQUIRY:
            filterFunction = (data) => data.filter(item => item.sourceOfLead === selected?.name)
            DisplayComponent = (
                <AddProperty
                    onChange={(item) => setSelected(item.value)}
                    currentValue={selected || null}
                    data={{ item: { required: false, type: SchemaTypes.INQUIRYSOURCEDROPDOWN } }}
                />
            );
            break;
        case PRODUCT_WISE_INQUIRY:
            filterFunction = (data) => data.filter(item => {
                if (item.products?.length > 0) {
                    return item.products.find(product => product.product.id === selected?.id)
                }
                return false;
            })
            DisplayComponent = (
                <AddProperty
                    onChange={(item) => setSelected(item.value)}
                    currentValue={selected || null}
                    data={{ item: { required: false, type: SchemaTypes.PRODUCTDROPDOWN, Producttype: PRODUCT_TYPE_FINISHED } }}
                />
            );
            break;
        default:
            break;
    }

    if (isLoading) <CircularProgress />

    if (isError) <GenericErrorComponent error={error} />

    data = filterFunction(data);

    return (
        <Grid2 container gap={2}>
            <Grid2 xs={12}>
                {DisplayComponent}
            </Grid2>
            <Grid2 xs={12}>
                {
                    data?.map((item, index) => <ReportInquiryCard item={item} key={index} />)
                }
            </Grid2>
        </Grid2>
    );
}

export default DetailedReportBody;

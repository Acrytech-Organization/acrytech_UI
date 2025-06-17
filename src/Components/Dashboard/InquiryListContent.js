import Grid2 from "@mui/material/Unstable_Grid2"
import { useContext } from "react";
import { RouteContext } from "./InquiryDashboard";
import InquiryCard from "./InquiryCard";

export default function InquiryListContent() {
    const { statusGroup } = useContext(RouteContext);

    if (!statusGroup.data || statusGroup.data.length === 0) return <></>

    return (
        <Grid2 container rowSpacing={{ xs: 1, sm: 0 }}>
            <Grid2 xs={12}>
                {statusGroup.data.map((item, index) => (
                    <InquiryCard key={index} inquiry={item} />
                ))}
            </Grid2>
        </Grid2>
    );
}
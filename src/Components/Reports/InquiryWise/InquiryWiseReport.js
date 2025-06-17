import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { DashBoardController } from "../../Dashboard/DashBoardController";
import GradientCard from "../../GenericComponents/Body/GradiantCard";
import { CONVERTED, OPEN, QUOTED } from "../../../Helpers/ConstantProperties";

const InquiryReport = ({ leads }) => {
    const grouped = Object.groupBy(leads, ({ status }) => status);
    leads = {
        [OPEN]: grouped[OPEN],
        [CONVERTED]: grouped[CONVERTED],
        [QUOTED]: grouped[QUOTED],
    }
        
    return (
        <Grid2 display={'flex'} direction={'column'} alignItems={'center'} justifyContent={'center'} gap={1} p={0} m={0}  height={'100%'}>
            {leads && Object.entries(leads).map(([key, value]) => (
                    <Grid2 xs={4} key={key} p={0} m={0}>
                        <GradientCard
                            key={key}
                            heading={key}
                            data={value}
                        />
                    </Grid2>
            ))}
        </Grid2>
    );
}



const InquiryWiseReport = () => {

    return <DashBoardController
        RenderedComponent={InquiryReport}
    />;
}

export default InquiryWiseReport;
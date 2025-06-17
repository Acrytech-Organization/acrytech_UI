import { Card, Typography } from "@mui/material";
import { SMALL_SCREEN, useScreenSize } from "../../../Helpers/helpers";
import Grid2 from "@mui/material/Unstable_Grid2";
import { SchemaTypes } from "../../../Helpers/ExtraProperties";
import StaticDropDown from "../../GenericComponents/DropDown/StaticDropDown";

function DetailedReportHeader({ showReport, setReport, dropDownList }) {

    const isSmallScreen = useScreenSize() === SMALL_SCREEN;

    return (
        <Card elevation={3} sx={{ backgroundColor: 'ButtonHighlight' }}>
            <Grid2 container>
                <Grid2 xs={6} sm={8}>
                    <Typography
                        p={2}
                        variant={isSmallScreen ? 'body1' : 'h6'}
                        color="black"
                    >
                        {showReport?.name || 'Detailed Report'}
                    </Typography>
                </Grid2>
                <Grid2 xs={6} sm={4}>
                    <StaticDropDown
                        currentValue={showReport || null}
                        props={{
                            onChange: (e) => setReport(e.value),
                            data: { item: { dropDownList: dropDownList, required: false, type: SchemaTypes.STATICDROPDOWN } }
                        }}
                        getOptionLabel={(option) => option.name}
                        isOptionEqualToValue={option => option.name === showReport?.name}
                    />
                </Grid2></Grid2>
        </Card>
    );
}

export default DetailedReportHeader;
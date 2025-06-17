import { Button, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { SchemaTypes } from "../../../Helpers/ExtraProperties";
import { getLocalDateString } from "../../../Helpers/helpers";
import { useNavigate } from "react-router-dom";

function LabeledText({ data, currentValue }) {
    const navigate = useNavigate();

    switch (data.item.propType) {
        case SchemaTypes.DATE:
            currentValue = getLocalDateString(currentValue)
            break;
        case SchemaTypes.URL:
            currentValue = <Button variant="text" onClick={() => navigate(data.item.route)}>{data.item.name}</Button>
            break;
        default:
            break;
    }

    return (
        <Grid2
            container
            spacing={1}
            direction={data.direction || "column"}
            {...data.attributes}
            p={1}
            width={"100%"}
        >
            <Grid2 flexGrow={1}>
                <Typography textAlign={data.headTextAlign || "left"} className="fw-semibold">
                    {data.item.displayName}
                </Typography>
            </Grid2>
            <Grid2 flexGrow={1}>
                <Typography textAlign={data.bodyTextAlign || "left"}>
                    {currentValue}
                </Typography>
            </Grid2>
        </Grid2>
    );
}

export default LabeledText;

import { useContext } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { addDaysToToday, getLocalDateString } from "../../../Helpers/helpers";
import { DateContext } from "../../Contexts/DateContext";
import { DEFAULT_TEXT_COLOR } from "../../../Helpers/ConstantProperties";

export default function ChangeDate() {
    const { currentDate, setCurrentDate } = useContext(DateContext);

    const addOneDay = () => {
        setCurrentDate(addDaysToToday(1, new Date(currentDate)));
    }

    const removeOneDay = () => {
        setCurrentDate(addDaysToToday(-1, new Date(currentDate)));
    }

    return (
        <Typography color={DEFAULT_TEXT_COLOR} sx={{ display: { md: 'block', xs: 'none' } }} variant="h6">
            <Grid container spacing={2}>
                <Grid item xs>
                    <Button
                        onClick={() => removeOneDay()}
                        variant="text"
                        className="text-dark">
                        Yesterday
                    </Button>
                </Grid>
                <Grid item xs>
                    {getLocalDateString(currentDate)}
                </Grid>
                <Grid item xs>
                    <Button
                        onClick={() => addOneDay()}
                        variant="text"
                        className="text-dark">
                        Tomorrow
                    </Button>
                </Grid>
            </Grid>

        </Typography>
    )
}
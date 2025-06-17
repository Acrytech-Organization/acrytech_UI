import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ShowNumber } from "../../../Helpers/helpers";
import { Box, Paper } from "@mui/material";

export const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const value = payload[0].value;

        return (
            <Paper elevation={1} sx={{ backgroundColor: "lightblue", borderRadius: 1 }}>
                <Box padding={1}>
                    <Box>{`${label}`}</Box>
                    <Box textAlign={"right"} paddingRight={1}>{ShowNumber(value, 2, true)}</Box>
                </Box>
            </Paper>
        );
    }

    return null;
};

const LineChartDisplay = ({ data, syncId }) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} syncId={syncId}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={CustomTooltip} />
                <Line type="monotone" dataKey="units" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default LineChartDisplay;
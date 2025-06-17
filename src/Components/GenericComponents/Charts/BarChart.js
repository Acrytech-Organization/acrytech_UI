import { BarChart, Bar, ResponsiveContainer, XAxis, Rectangle, YAxis, Tooltip } from 'recharts';
import { CustomTooltip } from './LineChart';

const BarChartDisplay = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={CustomTooltip} />
                <Bar
                    maxBarSize={50}
                    dataKey="units"
                    fill="lightgreen"
                    activeBar={<Rectangle fill="purple" stroke="pink" />} />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default BarChartDisplay;
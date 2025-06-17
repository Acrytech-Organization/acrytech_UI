import { PieChart, Pie, Tooltip, Cell, Label } from 'recharts';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Box, Card } from '@mui/material';
import { commonFontWeight, extraLargeFontSize, largeFontSize, regularFontSize } from '../../../Helpers/ConstantProperties';
import PieChartList from './PieChartList';

function PieChartComponent({
  data,
  colors,
  width = 200,
  height = 200,
  showTotal,
  totalLabel,
  innerRadius = '80%',
  outerRadius = '100%',
  Component = PieChartList,
  tiltle
}) {

  const totalValue = data.reduce((acc, item) => acc + item.value, 0);

  return (
    <Box>
      <Stack direction="column" spacing={2}>
        <Typography fontWeight={commonFontWeight}>
          {tiltle}
        </Typography>
        {data.length === 0 ?
          <Card elevation={3} sx={{ p: 1 }}>
            <Box width={'100%'} height={height}>
              <Typography variant="body1" textAlign={'center'} fontSize={regularFontSize} fontWeight={commonFontWeight} color="text.primary">
                {`${totalValue} ${totalLabel}`}
              </Typography>
            </Box>
          </Card>
          :
          <Card elevation={3} sx={{ p: 1 }}>
            <Stack direction="row" spacing={2} alignItems="flex-start" justifyContent="center">
              <PieChart width={width} height={height}>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="label"
                  innerRadius={innerRadius}
                  outerRadius={outerRadius}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                  {showTotal && (
                    <Label
                      position="center"
                      content={({ viewBox }) => {
                        const { cx, cy } = viewBox;
                        return (
                          <text
                            x={cx}
                            y={cy}
                            textAnchor="middle"
                            dominantBaseline="central"
                          >
                            <tspan x={cx} dy="-0.5em" style={{ fontSize: extraLargeFontSize, fontWeight: commonFontWeight }}>
                              {totalValue}
                            </tspan>
                            <tspan x={cx} dy="1.3em" style={{ fontSize: largeFontSize }}>
                              {totalLabel}
                            </tspan>
                          </text>
                        );
                      }}
                    />
                  )}
                </Pie>
                <Tooltip />
              </PieChart>
              {
                <Component data={data} width={width} height={height} colors={colors} />
              }
            </Stack>
          </Card>}
      </Stack>
    </Box>
  );
}

export default PieChartComponent;

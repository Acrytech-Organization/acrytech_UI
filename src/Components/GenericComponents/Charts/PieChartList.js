import { Box, Stack, Typography } from "@mui/material";

function PieChartList({ data, width, height, colors }) {
  return (
    <Stack alignItems="flex-start" justifyContent="center" width={width} height={height} flexGrow={1}>
      {data.map((entry, index) => (
        <Stack direction="row" spacing={1} alignItems="center" key={`legend-${index}`}>
          <Box
            sx={{
              width: 12,
              height: 12,
              backgroundColor: colors[index % colors.length],
              borderRadius: '50%',
            }}
          />
          <Typography variant="body2">{entry.label}</Typography>
        </Stack>
      ))}
    </Stack>
  )
}

export default PieChartList;
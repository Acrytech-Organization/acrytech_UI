import { Box, Grid, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function GstDropDownTable({ data, groupFieldName = "gstList", clearField }) {
    const gstList = data[groupFieldName] || [];

    if (gstList.length === 0) return null;

    return (
        <Grid display={'flex'} container direction="column" spacing={2} mt={2}>
            <Grid
                container
                alignItems="center"
                className="bg-primary-subtle rounded"
                sx={{ textAlign: "center", padding: '8px 0' }}
            >
                <Grid item xs={5}>
                    <Typography variant="subtitle1" align="center">
                        Sr. No
                    </Typography>
                </Grid>
                <Grid item xs={5}>
                    <Typography variant="subtitle1" align="center">
                        GST Number
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="subtitle1" align="center">
                        Action
                    </Typography>
                </Grid>
            </Grid>

            {gstList.map((item, index) => (
                <Grid container alignItems="center" key={index} sx={{ padding: '8px 0', textAlign: 'center' }}>
                    <Grid item xs={5}>
                        <Typography variant="body1" align="center">
                            {index + 1}
                        </Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography variant="body1" align="center">
                            {item.gstin}
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Box display="flex" justifyContent="center">
                            <IconButton onClick={() => clearField(groupFieldName, index)}>
                                <DeleteIcon color="error" />
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>
            ))}
        </Grid>
    );
}

export default GstDropDownTable;

import React from 'react';
import { Typography, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { commonFontSize, commonFontWeight } from '../../Helpers/ConstantProperties';

const ProductContentCell = ({
    xs, md, isEditing, value, onChange, type = "text", children, label, color
}) => (
    <Grid2
        xs={xs}
        md={md}
        container
        spacing={0}
        sx={{ justifyContent: { xs: "flex-start", sm: "center" }, alignItems: 'center' }}
    >
        {isEditing ? (
            <Grid2>
                <TextField
                    size="small"
                    value={value}
                    type={type}
                    onChange={onChange}
                    fullWidth
                />
            </Grid2>
        ) : (
            <>
                {label && (
                    <Grid2>
                        <Typography fontSize={commonFontSize} fontWeight={commonFontWeight}>
                            {label}
                        </Typography>
                    </Grid2>
                )}
                <Grid2>
                    <Typography
                        component="div"
                        fontSize={commonFontSize}
                        className="text-break"
                        color={color}
                        p={0.5}
                    >
                        {children}
                    </Typography>
                </Grid2>
            </>
        )}
    </Grid2>
);

export default ProductContentCell;

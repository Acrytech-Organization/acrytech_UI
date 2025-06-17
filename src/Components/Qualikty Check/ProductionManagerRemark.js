import { Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { TextInput } from "../GenericComponents/Inputs/TextInput";
import { useState } from "react";

const TextValue = ({ head, subHead, direction = { xs: 'column', sm: 'row' }, ...props }) => {
    return (
        <Grid2 display="flex" flexDirection={direction} gap={1} {...props}>
            <Typography variant="body1" sx={{ marginRight: 1 }}>
                {head}:
            </Typography>
            <Typography variant="body1">
                {subHead}
            </Typography>
        </Grid2>
    );
}

const ProductionManagerRemark = ({ product, ActionButton }) => {
    const [note, setNote] = useState();

    return (
        <Grid2 container spacing={2}>
            <Grid2 container spacing={2} xs={12} display={'flex'} justifyContent={'space-between'}>
                <TextValue xs={12} sm={4} head={'Product Code'} subHead={product.product.productItemcode} />
                <TextValue xs={12} sm={4} head={'Product Name'} subHead={product.product.name} />
                <TextValue xs={12} sm={4} head={'Quantity'} subHead={product.units} />
            </Grid2>

            <Grid2 xs={12}>
                <TextValue direction="column" head={'Description'} subHead={product.description} />
            </Grid2>

            <Grid2 xs={12}>
                <TextInput
                    props={{
                        data: {
                            item: {
                                name: 'remark',
                                displayName: 'Remark',
                                helperText: 'Enter Remark',
                            },
                        },
                        onChange: (item) => setNote(item.value)
                    }}
                    controlProps={{ required: true }}
                />
            </Grid2>

            <Grid2 xs={12}>
                <ActionButton text={'ok'} variant="contained" mark={note} qualityCheck={note} />
            </Grid2>
        </Grid2>
    );
}

export default ProductionManagerRemark;

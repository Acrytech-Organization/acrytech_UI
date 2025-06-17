import { Checkbox } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

export const CheckBoxAction = ({ product, item }) => {
    let checked = product.units - product.balance === 0 ? true : false

    const Onchange = (e) => {
        product.checked = e.target.checked
    }

    return (
        <Grid2 className=" justify-content-center d-flex m-1 p-0">
            <Checkbox onChange={Onchange} size="small" defaultChecked={checked} disabled={checked} />
        </Grid2>
    )
}
import { INPUT_TYPE_NUM, SchemaTypes } from "../../Helpers/ExtraProperties"
import { TextField } from "@mui/material";

export default function ProductionPlanText({ ProductBalance, onPlannChange, maxPossible }) {
    const error = ProductBalance.planned > maxPossible
        ? "Value is more than possible"
        : "";

    const handleChange = (event) => {
        // This is FG quantity .. we need to reduce the RM quantity from the balanceDetails
        // Here update the RM planned quantity as well.
        const value = parseFloat(event.target.value || 0);

        ProductBalance.planned = value;
        ProductBalance.rmlist?.forEach((raw) => raw.planned = raw.fgRate * value)

        onPlannChange();
    }

    return (
        <TextField
            className="bg-light"
            size="small"
            fullWidth
            inputProps={{
                inputMode: INPUT_TYPE_NUM,
                maxLength: 1000,
                type: SchemaTypes.Number,
                className: "form-control",
                id: "floatingInputUnits",
            }}
            onChange={handleChange}
            helperText={error}
            //!! to convert undefined to valid boolean
            error={error !== ''}
        />
    )
}
import { parseXlsxFile } from "./GenericFileReader";
import { Button, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { GenericBulkCreation } from "./GenericBulkCreation";

export const GenericFileRead = ({
    ignoreColumn,
    startHeaderIndex,
    changeTo,
    propertyListObject,
    onSuccess,
    message,
    title
}) => {
    const [file, setFile] = useState()
    const [ok, setok] = useState(false)
    const [result, setResult] = useState(undefined)

    const handleSubmit = async (e) => {
        const form = e.currentTarget;
        e.preventDefault();

        if (form.checkValidity() === true || file) {
            let res = await parseXlsxFile(file, ignoreColumn, startHeaderIndex, changeTo);
            setResult(res[0].Data)
            setok(true)
        } else {
            form.classList.add("was-validated");
        }
    };

    if (ok) {
        return (
            <GenericBulkCreation
                BulkArray={result}
                Total={result.length}
                onSuccess={onSuccess}
                message={message}
                title={title}
            />
        )
    }

    return (
        <form className="d-flex flex-column m-2 gap-2" noValidate onSubmit={handleSubmit}>
            <Typography className=' text-center fs-5 p-2 px-5 fw-bolder'>
                {title}
            </Typography>
            <TextField
                fullWidth
                inputProps={{
                    type: propertyListObject.item.type,
                    className: "form-control " + propertyListObject.inputFieldClass,
                    id: "floatingInput" + propertyListObject.item.name,
                }}
                onChange={(e) => setFile(e.target.files[0])}
            />
            <div className="d-flex justify-content-center">
                <Button className="" variant="contained" type="submit">Submit</Button>
            </div>
        </form>
    )
}
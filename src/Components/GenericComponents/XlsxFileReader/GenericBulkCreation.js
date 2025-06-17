import { useContext, useState } from "react"
import { getValueInPercentOfTotal } from "../../../Helpers/helpers"
import { Button } from "@mui/material"
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { FirmContext } from "../../Contexts/FirmContext";

export function CircularProgressWithLabel(props) {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <Box
                sx={{
                    top: 40,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <div className="d-flex flex-column">
                    <CircularProgress variant="determinate" {...props} />
                    <Typography variant="caption" className="m-2" component="div" color="text.secondary">
                        {`${Math.round(props.value)}%`}
                    </Typography>
                </div>
            </Box>
        </Box>
    );
}

export const GenericBulkCreation = ({
    Total,
    BulkArray,
    onSuccess,
    message,
    title
}) => {
    const [created, setCreated] = useState(0);
    const [exists, setExists] = useState(0)
    const [verify, setVerified] = useState(false)
    const [error, setError] = useState(0)
    const { currentFirm } = useContext(FirmContext);

    const onApprove = async () => {
        setVerified(true);

        for (let index = 0; index < BulkArray.length; index++) {
            const element = BulkArray[index];

            try {
                const ret = await onSuccess(currentFirm.khID, element);

                if (ret.id) setCreated(prev => prev + 1);
                if (ret === "") setExists(prev => prev + 1);
            }
            catch (err) {
                console.log(err);
                setError(prev => prev + 1)
            }
        }
    }

    if (verify) {
        return (
            <div className="d-flex flex-column p-2 gap-2">
                <ul className="list-group">
                    <div className="list-group-item">
                        {created}/{Total}{" Created"} !!
                    </div>

                    <div className="list-group-item">
                        {exists}/{Total}{" Already Exists"} !!
                    </div>

                    <div className="list-group-item">
                        {error}/{Total}{" Errors"} !!
                    </div>


                    <CircularProgressWithLabel
                        value={getValueInPercentOfTotal((created + exists + error), Total)} />
                </ul>
            </div>
        )
    }

    return (
        <div className="container m-2">
            <Button className="w-100 d-flex justify-content-center" variant="contained" type="button" onClick={onApprove}>Start Uploading</Button>
        </div>
    )
}
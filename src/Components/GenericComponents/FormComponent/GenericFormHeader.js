import React from "react";
import { Button, Typography } from "@mui/material";
import { TITLE_COLOR } from "../../../Helpers/ConstantProperties";
import Grid2 from "@mui/material/Unstable_Grid2";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";

function GenericFormHeader({ title, enableBack }) {
    const navigate = useNavigate()

    if (!title) return <></>

    return (
        <Grid2 className="col-12 d-flex p-2">
            {
                enableBack && <Button variant="text" onClick={() => navigate(-1)} className="d-flex gap-3 ps-0">
                    <ArrowBackIcon />
                </Button>
            }
            <Typography className='fs-5 p-2 fw-bolder' color={TITLE_COLOR}>
                {title}
            </Typography>
        </Grid2>
    )
}

export default GenericFormHeader;

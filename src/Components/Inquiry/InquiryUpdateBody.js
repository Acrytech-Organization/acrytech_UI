import Grid2 from "@mui/material/Unstable_Grid2/Grid2"
import { GenericAlert } from "../GenericComponents/Alerts/GenericAlert"
import { Box } from "@mui/material"
import { DashboardDefaultComments } from "../Dashboard/DashboardDefaultComments"
import FormButtons from "../GenericComponents/FormComponent/FormButtons"

export const InquiryUpdateBody = ({
    reqStatus = undefined,
    defaultDashBoardParameter,
    handleClose,
    handleSubmit
}) => {

    return (
        <Box className="d-flex flex-column" width={"100%"} component="form" onSubmit={handleSubmit} noValidate>
            <DashboardDefaultComments
                {...defaultDashBoardParameter}
            />
            {!reqStatus
                ? <div className='d-flex justify-content-center align-items-center w-100 gap-2'>
                    <FormButtons onSaveClick={()=>{}} handleCancel={handleClose}/>
                </div>
                : <Grid2 className="d-flex justify-content-center flex-grow-1">
                    <GenericAlert errMessage={reqStatus.message} severity={reqStatus.severity} />
                </Grid2>}
        </Box>
    )
}
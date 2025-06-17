import { DialogContent, DialogContentText, DialogTitle } from "@mui/material"

export const GenericVerifyComponent = ({ title = "Are You Sure ?", Body = "After Submission The Process Can't Be Reverted" }) => {
    return (
        <DialogContent>
            <DialogTitle id="responsive-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText className="text-danger" id="alert-dialog-description">
                    {Body}
                </DialogContentText>
            </DialogContent>
        </DialogContent>
    )
}
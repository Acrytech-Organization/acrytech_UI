import { DialogContent, DialogContentText, DialogTitle } from "@mui/material"

export const VerifySubmitComponent = () => {
    return (
        <DialogContent>
            <DialogTitle id="responsive-dialog-title">
                {"Are You Sure ?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText className="text-danger" id="alert-dialog-description">
                    After Submission The Process Can't Be Reverted
                </DialogContentText>
            </DialogContent>
        </DialogContent>
    )
}
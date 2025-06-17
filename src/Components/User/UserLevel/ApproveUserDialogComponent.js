import { DialogContent } from "@mui/material"

export const ApproveUserSuccessComponent = ({ data }) => {
    return (
        <DialogContent> User Approved Successfuly ! </DialogContent>
    )
}

export const ApproveUserErrorComponent = ({ error }) => {
    const errorMessage = error;
    return (
        <DialogContent>
            <div>
                <div>Failed To Approve User ! </div>
                <div>
                    {errorMessage}
                </div>
            </div>
        </DialogContent>
    )
}
import { DialogContent } from "@mui/material"

export const UserLevelSuccessComponent = ({ data }) => {
    return (
        <DialogContent> Level Updated Successfuly ! </DialogContent>
    )
}

export const UserLevelErrorComponent = ({ error }) => {
    const errorMessage = error;
    return (
        <DialogContent>
            <div>
                <div>Failed To Update UserLevel ! </div>
                <div>
                    {errorMessage}
                </div>
            </div>
        </DialogContent>
    )
}
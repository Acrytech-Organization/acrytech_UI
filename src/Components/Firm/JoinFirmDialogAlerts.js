import { DialogContent } from "@mui/material"

export const JoinFirmSuccessComponent = ({ data }) => {
    return (
        <DialogContent> join Request Send Successfully </DialogContent>
    )
}

export const JoinFirmErrorComponent = ({ data }) => {
    return (
        <DialogContent> Failed To Join </DialogContent>
    )
}
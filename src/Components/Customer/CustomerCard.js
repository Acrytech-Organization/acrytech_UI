import Grid2 from "@mui/material/Unstable_Grid2"
import DashboardCardCommonPart from "../Dashboard/DashboardCardCommonPart"
import { CustomerAction } from "./CustomerAction"
import { Button, Paper } from "@mui/material"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { FIFTEEN_DAYS, UPDATE_ON_CUSTOMER } from "../../Helpers/ConstantProperties"
import { serviceHelpers } from "../../Helpers/ServiceHelpers"
import { useContext, useState } from "react"
import { FirmContext } from "../Contexts/FirmContext"
import { addDaysToToday, DecodeServerError, getCommentForCustomer } from "../../Helpers/helpers"
import { DateContext } from "../Contexts/DateContext"
import GenericDialog from "../GenericComponents/Dialog/GenericDialog"
import InquiryContent from "../Inquiry/InquiryContent"
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useSnackbar } from "../Contexts/SnackbarProvider"


export const CustomerCard = ({ item, handleDialogOpen, tagColor }) => {
    const { currentFirm } = useContext(FirmContext)
    const { currentDate } = useContext(DateContext)
    const [open, setOpen] = useState(false);
    const { showSnackbar } = useSnackbar();

    const queryFunction = async () => {
        return await serviceHelpers.updateCustomer(
            currentFirm.khID,
            { followUpDate: addDaysToToday(FIFTEEN_DAYS, currentDate) },
            item.id,
            getCommentForCustomer(item.id, FIFTEEN_DAYS)
            , currentDate
        );
    }

    const successMessage = (data) => `Customer Attended the Call and follow Up is Updated for ${FIFTEEN_DAYS} days with id ${data.id}`

    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: queryFunction,

        onSuccess: async (data) => {
            await queryClient.invalidateQueries({
                predicate: (query) => query.queryKey.includes(UPDATE_ON_CUSTOMER),
            })
            showSnackbar(successMessage(data), 'success')
        },
        onError: (error) => {
            const message = DecodeServerError(error);
            showSnackbar(message, 'error');
        },
    });

    return (
        <Grid2 xs={12}>
            <Paper
                className='m-1 w-100'
                sx={{
                    padding: '8px',
                    minWidth: 0,
                    borderLeft: `15px solid ${tagColor}`,
                }}
            >
                <Grid2 container alignItems="center" spacing={1}>
                    <DashboardCardCommonPart item={item} />
                    <Grid2 lg={3}></Grid2>
                    <Grid2 lg={3} sx={{ display: 'flex', gap: 1 }}>
                        <Button
                            variant="outlined"
                            disabled={isPending}
                            sx={{ whiteSpace: 'nowrap' }}
                            onClick={() => setOpen(true)}>
                            <ChatBubbleOutlineIcon />
                        </Button>
                        <Button
                            variant="outlined"
                            disabled={isPending}
                            sx={{ whiteSpace: 'nowrap' }}
                            onClick={() => mutate()}>
                            Call Attempted
                        </Button>
                        <GenericDialog
                            content={<InquiryContent customQueryKey={UPDATE_ON_CUSTOMER} item={item} />}
                            open={open}
                            setOpen={setOpen}
                            title={"Follow Up for Customer "}
                        />
                    </Grid2>
                    <Grid2 sx={{ display: 'flex', justifyContent: 'end' }}>
                        <CustomerAction item={item} handleDialogOpen={handleDialogOpen} />
                    </Grid2>
                </Grid2>
            </Paper>
        </Grid2>
    )
}
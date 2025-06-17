import Grid2 from "@mui/material/Unstable_Grid2/Grid2"
import UsersDropdown from "./UsersDropdown"
import { useContext } from "react"
import { FirmContext } from "../Contexts/FirmContext"
import { DateContext } from "../Contexts/DateContext"
import { serviceHelpers } from "../../Helpers/ServiceHelpers"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { UNASSIGNED_INQUIRY, UPDATE_ON_INQUIRY } from "../../Helpers/ConstantProperties"
import { DecodeServerError } from "../../Helpers/helpers"
import GenericProductList from "../GenericComponents/Body/GenericProductList"
import { useSnackbar } from "../Contexts/SnackbarProvider"
import InquirySource from "../Dashboard/InquirySource"

export const UserCardContent = ({ item }) => {
    const { currentFirm } = useContext(FirmContext);
    const { currentDate } = useContext(DateContext);
    const { showSnackbar } = useSnackbar();

    const queryFunction = async (option) => {
        const name = option.displayName;
        const update = {
            assignee: { id: option.id, displayName: name }
        };

        const comment = `Assigned to ${name}`;

        const data = await serviceHelpers.updateLeadStatus(
            currentFirm.khID, update, item.id, comment, currentDate);
        return { id: data.id, comment };
    }

    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: queryFunction,

        onSuccess: (data) => {
            queryClient.invalidateQueries({
                predicate: (query) => query.queryKey.includes(UPDATE_ON_INQUIRY),
            });
            showSnackbar(`${data.comment}`, 'success');
        },

        onError: (error) => {
            const message = DecodeServerError(error);
            showSnackbar(message, 'error');
        },
    });


    const getSelected = (option) => {
        mutate(option);
    };


    return (
        <>
            <Grid2 xs={5} md={3}>
                <InquirySource inquiry={item} />
            </Grid2>

            <Grid2 xs={7} md={3}>
                <GenericProductList products={item.products || []} />
            </Grid2>
            <Grid2 xs={12} md={3} className='m-0 p-0'>
                <UsersDropdown getSelected={getSelected} currentValue={item.assignee || UNASSIGNED_INQUIRY} />
            </Grid2>
        </>
    )
}
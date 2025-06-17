import { useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Alert, Button, CircularProgress } from "@mui/material";
import { AuthContext } from "../Auth/Auth";
import { FirmContext } from "../Contexts/FirmContext";
import { getToken } from "../../Helpers/ServerMethods";

export default function VerifyKnownResource({ resource, endPoint }) {
    const { uid } = useContext(AuthContext);
    const { khID } = useContext(FirmContext);

    const queryClient = useQueryClient();

    const queryKey = "CHECK_K_RESOURCE" + resource.id;

    const queryFunction = async () =>
        await endPoint.getOne(await getToken(), khID, resource.id);

    const createFn = async () =>
        await endPoint.create(await getToken(), khID, resource)

    const { data, error, isLoading, isSuccess } = useQuery({
        queryKey: [queryKey, uid],
        queryFn: queryFunction
    })

    const mutateResult = useMutation(
        {
            mutationFn: () => createFn(),

            onSuccess: () => {
                queryClient.invalidateQueries({
                    predicate: (query) => query.queryKey.includes(queryKey),
                })
            }
        }
    );

    if (isLoading || mutateResult.isLoading) return <CircularProgress />

    const opError = error || mutateResult.error || (isSuccess && data.id === undefined)

    if (opError) return (
        <div className="d-flex">
            <Alert className="flex-grow-1" severity="error">Resource Not Present: {resource.name}</Alert>
            <Button onClick={() => mutateResult.mutate()}>Create</Button>
        </div>
    )

    if (data && data.id) {
        return (
            <Alert security="success">Resource Present</Alert>
        )
    }

    return <></>
}
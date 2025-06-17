import React, { useContext } from 'react'
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../Auth/Auth';
import { FirmContext } from '../../Contexts/FirmContext';
import { CircularProgress } from '@mui/material';
import { GenericAlert } from '../Alerts/GenericAlert';
import { serviceHelpers } from '../../../Helpers/ServiceHelpers';
import { JPEG_CONTENT_TYPE, PNG_CONTENT_TYPE } from '../../../Helpers/ExtraProperties';
import { DecodeServerError } from '../../../Helpers/helpers';


export default function ShowStorageFiles({ item, options }) {
    const { uid } = useContext(AuthContext);
    const { khID } = useContext(FirmContext);
    const SessionId = `${item.id + options.tag}`;

    const GetFirmData = async () => {
        return await serviceHelpers.getFile(SessionId, khID, options)
    }

    const { data, isLoading, error } = useQuery(
        {
            queryKey: [
                uid,
                khID,
                options.tag,
                item.id
            ]
            , queryFn: GetFirmData,
            staleTime: 2 * 60 * 1000
        }
    );//staleTime is 2min because the image Url is valid for 2minutes

    if (error) {
        let errMessage = DecodeServerError(error)
        return <GenericAlert error={errMessage} />
    }

    if (isLoading) {
        return <CircularProgress />
    }

    if (data.ContentType === JPEG_CONTENT_TYPE ||
        data.ContentType === PNG_CONTENT_TYPE) {
        return (
            <div className={"p-2"}>
                <img className="img-thumbnail" alt='' src={data.url} />
            </div>
        )
    }

    return (
        <>
            Document Not Found
        </>
    )
}

import { useContext } from 'react';
import { UPDATE_ON_INQUIRY_SOURCE, INQUIRY_SOURCE, CREATEINQUIRYSOURCE } from '../../Helpers/ConstantProperties';
import { serviceHelpers } from '../../Helpers/ServiceHelpers';
import DataView from '../GenericComponents/DataView/DataView';
import { AuthContext } from '../Auth/Auth';
import { FirmContext } from '../Contexts/FirmContext';
import InquirySourceCard from './InquirySourceCard';

function InquirySources() {
    const { currentUserObject } = useContext(AuthContext);
    const { currentFirm } = useContext(FirmContext);
    const queryKey = [
        currentUserObject.uid,
        currentFirm.khID,
        UPDATE_ON_INQUIRY_SOURCE,
        INQUIRY_SOURCE,
    ];

    const queryFunction = async (pageParam) => {
        return await serviceHelpers.getInquirySources(currentFirm.khID, null, null, pageParam);
    }

    const getSearchableValue = (current) => {
        return (
            current.name
        )
    }

    return (
        <DataView
            buttonDetails={{ text: "New Inquiry Sources", navigateTo: CREATEINQUIRYSOURCE }}
            routeDetails={{ heading: "Inquiry Sources", subText: "Sources" }}
            limitSupported={true}
            getSearchableValue={getSearchableValue}
            queryKeyParameter={queryKey}
            queryFunctionParameter={queryFunction}
            ShowElement={{ Component: InquirySourceCard }}
            searchingPlaceholder={" Search By Name "}
        />
    );
}

export default InquirySources;

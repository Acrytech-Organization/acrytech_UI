import React, { useState } from 'react';
import dayjs from 'dayjs';
import InquiryUpdate from '../Inquiry/InquiryUpdate';
import { baseComments } from '../../Helpers/ExtraProperties';

const FollowUpDialogContent = ({ item, onClose, DialogHeader, dropDownList = baseComments }) => {
    const [selectedDate, setSelectedDate] = useState(dayjs().add(2, 'day'));

    const queryFunction = () => {
        return {
            followUpDate: selectedDate,
        }
    }

    const successMessage = (data) => `Successfully Updated the Follow-up with id ${data.id}`

    const OptionalLabel = (option) => `${option.id} . ${option.message}`

    const formName = " Follow Up"

    return (
        <InquiryUpdate
            OptionalLabel={OptionalLabel}
            successMessage={successMessage}
            item={item}
            formName={formName}
            mutationFunction={queryFunction}
            dropDownList={dropDownList}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            handleClose={onClose}
            DashBoardInquiryHeader={DialogHeader}
        />
    )
}

export default FollowUpDialogContent;
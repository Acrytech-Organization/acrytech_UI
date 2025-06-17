import React from 'react';
import { useNavigate } from 'react-router-dom';
import Grid2 from '@mui/material/Unstable_Grid2';
import QuotationButton from './QuotationButton';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import PrintButton from '../../Print/PrintButton';
import SaveButton from '../../GenericComponents/Save/SaveButton';
import { openGmail } from '../../../Helpers/helpers';
import { DISPLAY_CHALLAN } from '../../../Helpers/ConstantProperties';
import SavePdfAsImage from '../../GenericComponents/Save/SavePdfAsImage';

const QuotationActionButtons = ({
    id,
    date,
    item,
    componentRef,
    updatedProducts,
    rawMaterials,
    source,
    currentFirm,
    type,
    firmTitle,
    clientTitle,
    documentTitle,
    dateTitle,
    idTitle,
    navigateTo
}) => {
    const navigate = useNavigate();

    const handleSendMail = () => {
        const email = item?.contactEmail;
        openGmail(email, "Hello from AcryTech", "This is a test email sent from AcryTech")
    };

    const handleCancel = () => {
        navigateTo ? navigate(navigateTo) : navigate(-1)
    };

    const QuotationPdf = <PrintButton
        id={id}
        date={date}
        item={item}
        updatedProducts={updatedProducts}
        rawMaterials={rawMaterials}
        source={source}
        currentFirm={currentFirm}
        fileName={`${item.customerName}_${documentTitle}.pdf`}
        firmTitle={firmTitle}
        clientTitle={clientTitle}
        documentTitle={documentTitle}
        dateTitle={dateTitle}
        idTitle={idTitle}
    />

    const ChallanPdf = <SavePdfAsImage
        componentRef={componentRef}
        buttenText='Download'
        fileName={`${item.customerName}_Challan.pdf`}
    />

    return (
        <Grid2 container justifyContent="center" spacing={1} className="no-print">
            <Grid2 xs="auto">
                <QuotationButton
                    color="warning"
                    text="Send Mail"
                    onClick={handleSendMail}
                    icon={<SendRoundedIcon fontSize="small" />}
                    aria-label="Send email"
                />
            </Grid2>
            <Grid2 xs="auto">
                {
                    type === DISPLAY_CHALLAN ? ChallanPdf : QuotationPdf
                }
            </Grid2>
            <Grid2 xs="auto">
                <SaveButton
                    componentRef={componentRef}
                    fileName={`${item.customerName}_${documentTitle}.pdf`}
                    orientation="portrait"
                    format={[297, 210]}
                />
            </Grid2>
            <Grid2 xs="auto">
                <QuotationButton
                    color="error"
                    text="Cancel"
                    onClick={handleCancel}
                    icon={<CancelRoundedIcon fontSize="small" />}
                    aria-label="Cancel action"
                />
            </Grid2>
        </Grid2>
    );
};

export default QuotationActionButtons;
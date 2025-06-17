import { GenericVerifyComponent } from '../GenericComponents/VerifyComponent/FirmVerifyComponent';
import GenericForm from '../GenericComponents/FormComponent/GenericForm';
import { DISPLAY_CHALLAN, HOME, INQUIRY_STORE_ACCOUNT_ID, INWORD_CHALLAN, UPDATE_ON_VOUCHER } from '../../Helpers/ConstantProperties';
import { GenericErrorComponent, GenericSuccessComponent } from '../GenericComponents/FormComponent/GenericAlertComponent';
import { useLocation, useNavigate } from 'react-router-dom';
import { serviceHelpers } from '../../Helpers/ServiceHelpers';
import { getChallanPropList, getPropsWithProductList } from '../../Helpers/ExtraProperties';
import { canEditSaleRate, getProductHeadingWithoutAction, InquiryPostDispatch } from '../../Helpers/helpers';
import InquiryProductDetails from '../Inquiry/InquiryProductDetails';
import { useContext } from 'react';
import { FirmContext } from '../Contexts/FirmContext';
import InquiryProductHeading from '../Inquiry/InquiryProductHeading';
import { GenericEditForm } from '../GenericComponents/FormComponent/GenericEditForm';
import { useSnackbar } from '../Contexts/SnackbarProvider';
import { getRateDetails } from '../Quotation/RateCalculator';
import { DocumentFormatContext } from '../Contexts/DocumentFormatContext';

const CreateChallan = ({ type }) => {
    const { currentFirm } = useContext(FirmContext);
    const { selectedFormat } = useContext(DocumentFormatContext);
    const { showSnackbar } = useSnackbar();
    const location = useLocation();

    const data = location.state ? { ...location.state, partyDropDown: location.state.customerName } : {};
    var proplist = getChallanPropList(location.state);

    if (!location.state) {
        proplist = getPropsWithProductList(proplist, canEditSaleRate(currentFirm))
    }

    const queryFunction = async (state, khID) => {

        const refId = await serviceHelpers.getSeriesNumber(
            khID,
            { prefix: currentFirm.prefixes.challan });

        const challanProps = {
            vehicalNo: state.vehicalNo,
            driverName: state.driverName,
            customerName: state.partyName,
            projectName: state.projectName,
            poNumber: state.poNumber,
            contactPhone: state.partyPhone,
            contactEmail: state.partyEmail,
            city: state.city,
            inquiryId: location.state?.id
        }

        const challanDeatails = type === INWORD_CHALLAN ? {
            fromAccount: state.partyID || state.customerId,
            toAccount: INQUIRY_STORE_ACCOUNT_ID
        } : {
            fromAccount: INQUIRY_STORE_ACCOUNT_ID,
            toAccount: state.partyID || state.customerId
        }

        const cData = getRateDetails({
            inquiry: state,
            currentFirm: currentFirm,
            docFormat: selectedFormat
        });

        challanProps.cData = cData;

        await serviceHelpers.createChallan(khID, refId.id,
            type, state.products,
            challanDeatails.fromAccount,
            challanDeatails.toAccount,
            state.date,
            challanProps
        );
        state.refranceId = refId.id;
        state.type = type;
        showSnackbar(<GenericSuccessComponent data={{ id: state.customerId }} message={"Challan Created successfully "} />, 'success');
        return { ...state, ...challanProps }
    }

    const navigate = useNavigate();

    const handleReditect = () => {
        navigate(HOME)
    }

    const FormProperties = {
        ErrorComponent: ({ error }) => <GenericErrorComponent error={error} />,
        navigateOnSuccess: DISPLAY_CHALLAN,
        addButtonText: "Generate Challan",
        navigateTo: HOME,
        queryKeyValue: UPDATE_ON_VOUCHER,
        enableVerify: true,
        formTitle: 'Generate Challan',
        propertyList: proplist,
        VerifyAlertComponent: GenericVerifyComponent,
        queryFunction: queryFunction,
        buttonClasses: "",
        currentData: { ...data, date: new Date().valueOf() },
        handleCancel: handleReditect,
        afterDispatch: InquiryPostDispatch,
        GroupDetailsComponent: (props) => <InquiryProductDetails {...props} allowActions={!location.state} HeadingComponent={
            (props) => <InquiryProductHeading {...props} heading={location.state && getProductHeadingWithoutAction(canEditSaleRate(currentFirm))} />}
        />,
        enableClear: location.state ? false : true,
    };

    const FormComponent = location.state ? GenericEditForm : GenericForm;

    return (
        <FormComponent
            {...FormProperties}
        />
    )
}
export default CreateChallan

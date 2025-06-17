import { serviceHelpers } from '../../Helpers/ServiceHelpers';
import { GenericVerifyComponent } from '../GenericComponents/VerifyComponent/FirmVerifyComponent';
import { createFirm, editFirm, firmDefaultValues, SchemaTypes } from '../../Helpers/ExtraProperties';
import GenericForm from '../GenericComponents/FormComponent/GenericForm';
import { HOME, TITLE_COLOR, UPDATE_ON_KHATAVANI } from '../../Helpers/ConstantProperties';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { FirmContext } from '../Contexts/FirmContext';
import GstDropDownTable from './GstDropDownTable';
import Grid2 from '@mui/material/Unstable_Grid2';
import Firm from '../../Assests/Firm.png';
import { Typography } from '@mui/material';
import { GenericEditForm } from '../GenericComponents/FormComponent/GenericEditForm';
import { GenericErrorComponent, GenericSuccessComponent } from '../GenericComponents/FormComponent/GenericAlertComponent';

const CreateFirmForm = ({ showDefault = false, currentFirm, updateState = (state) => state }) => {
    const { resetFirmList } = useContext(FirmContext);

    const createQueryFunction = async (state, khID, file) => {
        const result = await serviceHelpers.createFirm(state, file)
        resetFirmList()
        return result;
    }

    const editQueryFunction = async (state, khID) => {
        const updatedState = updateState(state);
        const result = await serviceHelpers.editFirm(updatedState, khID);
        resetFirmList()
        return result;
    }

    const firmProps = {
        formTitle: "Create New Firm",
        propertyList: createFirm,
        buttonText: "Submit",
        queryFunction: createQueryFunction
    }

    if (currentFirm && !showDefault) {
        firmProps.formTitle = "Add Default values to Firm.";
        firmProps.propertyList = firmDefaultValues;
        firmProps.buttonText = "Add to Firm";
        firmProps.queryFunction = editQueryFunction;
        firmProps.GroupDetailsComponent = GstDropDownTable;
    }

    if (currentFirm && showDefault) {
        firmProps.formTitle = "Edit Firm.";
        firmProps.propertyList = editFirm;
        firmProps.buttonText = "Edit Firm";
        firmProps.queryFunction = editQueryFunction;
    }

    const getcurrentFirmValues = (currentFirm) => {
        if (currentFirm.bankId) {
            currentFirm.bankAccount = {
                name: currentFirm.bankName,
                bankaccount: currentFirm.accountNo,
                ifsc: currentFirm.ifscCode,
                bankbranch: currentFirm.branch,
                id: currentFirm.bankId,
            }
            if (currentFirm.upiID) currentFirm.bankAccount.upiID = currentFirm.upiID
        }
        if (currentFirm.gstDropdownList) {
            currentFirm.gstList = [];
            currentFirm.gstDropdownList.forEach(item => currentFirm.gstList.push({ gstin: item }));
        }

        delete currentFirm.gstDropdownList;
        return currentFirm;
    };

    const handleDispatch = (currentState, incoming, type) => {
        switch (type) {
            case SchemaTypes.KN_PAN:
            case SchemaTypes.KN_GSTIN:
                currentState[incoming.name] = incoming.value?.toUpperCase();
                break;
            case SchemaTypes.BANKDROPDOWN:
                if (incoming.value) {
                    currentState.bankName = incoming.value.name
                    currentState.accountNo = incoming.value.bankaccount
                    currentState.ifscCode = incoming.value.ifsc
                    currentState.branch = incoming.value.bankbranch
                    currentState.bankId = incoming.value.id
                    if (incoming.value.upiID) currentState.upiID = incoming.value.upiID
                    delete currentState.bankAccount;
                } else {
                    delete currentState.bankName;
                    delete currentState.accountNo;
                    delete currentState.ifscCode;
                    delete currentState.branch;
                    delete currentState.bankId;
                    delete currentState.bankAccount;
                }
                break;
            default:
                break;
        }
        return currentState;
    }

    const navigate = useNavigate();
    const successMessage = `Firm is Created With FirmId`

    const FormProperties = {
        ErrorComponent: ({ error }) => <GenericErrorComponent error={error} />,
        SuccessComponent: ({ data }) => <GenericSuccessComponent data={data} message={successMessage} />,
        addButtonText: firmProps.buttonText,
        navigateTo: HOME,
        queryKeyValue: UPDATE_ON_KHATAVANI,
        enableVerify: true,
        VerifyAlertComponent: GenericVerifyComponent,
        formTitle: firmProps.formTitle,
        propertyList: firmProps.propertyList,
        currentData: currentFirm ? getcurrentFirmValues(currentFirm) : {},
        queryFunction: firmProps.queryFunction,
        buttonClasses: '',
        enableClear: currentFirm ? false : true,
        handleCancel: () => navigate(HOME),
        afterDispatch: handleDispatch,
        GroupDetailsComponent: firmProps.GroupDetailsComponent
    };

    const FormComponent = currentFirm ? GenericEditForm : GenericForm;

    return (
        <Grid2 container sx={{ height: '100%' }} direction="row">
            <Grid2
                md={6}
                sx={{
                    backgroundColor: 'white',
                    display: { xs: 'none', md: 'flex' },
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <div>
                    <Typography
                        variant="h4"
                        component="div"
                        className='fs-2 p-2 fw-bolder'
                        textAlign="center"
                        color={TITLE_COLOR}
                    >
                        Create New Firm
                    </Typography>
                    <img
                        src={Firm}
                        alt="firmImage"
                        style={{ width: "100%", height: "auto" }}
                    />
                </div>
            </Grid2>

            <Grid2
                md={6}
                sx={{
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <FormComponent {...FormProperties} />
            </Grid2>
        </Grid2>

    )
}
export default CreateFirmForm

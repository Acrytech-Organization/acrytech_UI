import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import DialogHeader from "./DialogHeader";
import { useId, useReducer, useRef } from "react";
import { deepCopyObject } from "../../../Helpers/helpers";
import AddProperty from "../../AddProperties/AddProperty";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { GenericErrorComponent, GenericSuccessComponent } from "../FormComponent/GenericAlertComponent";
import { GenericVerifyComponent } from "../VerifyComponent/FirmVerifyComponent";
import { HandleFormButton } from "../FormComponent/HandleFormButton";
import { SchemaTypes } from "../../../Helpers/ExtraProperties";
import { ADD_PROPS, AUTO_FILL, REMOVE_PROPS } from "../../../Helpers/ConstantProperties";

const initState = {};

const reducer = (state, action) => {
    var currentState = deepCopyObject(state);

    switch (action.type) {
        case ADD_PROPS:
            currentState[action.payload.name] = action.payload.value;
            break;
        case AUTO_FILL:
            currentState = { ...action.payload.value }
            break;
        case REMOVE_PROPS:
            currentState = initState
            break;
        default:
    }

    return currentState;
};

function DataviewDialogForm({ dialog, setDialog, dialogTitle, formPropertyList, queryFunction, queryKeyValue, navigateOnSuccess, successMessage }) {
    const [state, dispatch] = useReducer(reducer, initState);
    const formRef = useRef();
    const id = useId()

    const handleClear = () => {
        formRef.current.reset();
        dispatch({ type: REMOVE_PROPS });
    }

    const OnChange = (e, element) => {
        if (element.type === SchemaTypes.CUSTOMERDROPDOWN) {
            if (e) {
                dispatch({ type: AUTO_FILL, payload: { value: e.value } })
            }
        } else {
            dispatch({ type: ADD_PROPS, payload: e });
        }
    }

    const handleCancel = () => {
        setDialog(false);
    };

    const GetCurrentValue = (data) => {
        return state[data.item.name] || ''
    }

    const handleSubmit = async (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        if (form.checkValidity() === true) {

        } else {
            form.classList.add("was-validated");
        }
    };

    const FormProperties = {
        ErrorComponent: ({ error }) => <GenericErrorComponent error={error} />,
        SuccessComponent: ({ data }) => <GenericSuccessComponent data={data} message={successMessage} />,
        addButtonText: "Add",
        navigateTo: navigateOnSuccess,
        queryKeyValue: queryKeyValue,
        enableVerify: true,
        VerifyAlertContentComponent: GenericVerifyComponent,
        querryFunction: (khID) => queryFunction(khID, state),
        buttonClasses: "",
        id: id
    };

    return (
        <Dialog
            open={dialog}
        >
            <DialogTitle className="m-0 p-0">
                <DialogHeader title={dialogTitle} handleCancel={handleCancel} />
            </DialogTitle>
            <DialogContent>
                <form id={id} onSubmit={handleSubmit} noValidate className="needs-validation"
                    ref={formRef} >
                    <Grid2 container>
                        {
                            formPropertyList.map((element, index) => {
                                return (
                                    <AddProperty
                                        key={index}
                                        currentValue={GetCurrentValue(element.data)}
                                        data={element.data}
                                        onChange={(e) => {
                                            OnChange(e, element.data.item)
                                        }}

                                    />
                                )
                            })
                        }
                    </Grid2>

                    <DialogActions>
                        <div className="d-flex justify-content-center gap-3 w-100">
                            <HandleFormButton
                                {...FormProperties}
                            />
                            <Button variant="contained" color="error" onClick={handleClear} className="capitalized">Clear</Button>
                        </div>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default DataviewDialogForm;
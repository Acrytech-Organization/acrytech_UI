import { useId, useReducer, useState } from 'react';
import { USER_MUST_BE_ABSENT, USER_MUST_BE_PRESENT, checkValidity, deepCopyObject, getEmailfromPhone } from "../../Helpers/helpers";
import { auth } from '../../firebaseHelper/firebaseConfigForServer';
import {
    fetchSignInMethodsForEmail
} from 'firebase/auth';
import ErrorFromFirebase from '../../Helpers/FirebaseErrorMessages';
import ConfirmPhoneWithOTP from './ConfirmPhoneWithOtp';
import AddProperty from '../AddProperties/AddProperty';
import { CircularProgress, Box } from '@mui/material';

export const ADD_PROPS_TYPE = "Add_Property";

function reducer(currentState, action) {
    var state = deepCopyObject(currentState);

    switch (action.type) {
        case ADD_PROPS_TYPE:
            state[action.payload.name] = action.payload.value;
            break;
        default:
            break;
    }
    return state;
}

export default function SignupWithphone({
    onAuthSuccess,
    propertyList,
    buttonText,
    onPhoneCredential,
    userStatus = USER_MUST_BE_ABSENT }) {
    const [verifyPhone, setVerifyPhone] = useState(false);
    const [state, dispatch] = useReducer(reducer, {});
    const [error, setError] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const formId = useId()

    const loginWithPhone = async () => {
        try {
            const emailID = getEmailfromPhone(state.phoneNumber);

            const fetchEmailMethod = await
                fetchSignInMethodsForEmail(auth, emailID);

            if (fetchEmailMethod.length >= 1 && userStatus === USER_MUST_BE_ABSENT) {
                setError({ code: "auth/email-already-in-use" });
                return;
            }

            if (fetchEmailMethod.length === 0 && userStatus === USER_MUST_BE_PRESENT) {
                setError({ code: "auth/user-not-found" });
                return
            }

            setVerifyPhone(true);
        } catch (e) {
            setError(e);
        }
    }

    const onCredential = async (credential) => {
        try {
            await onPhoneCredential(credential, state);
            await onAuthSuccess();
        } catch (e) {
            setError(e);
        }
    };

    const handleSubmit = () => {
        const form = document.getElementById(formId);
        let isValid = checkValidity(form, 'input:not(#groupId input), textarea:not(#groupId textarea), select:not(#groupId select)')
        if (isValid) {
            setIsLoading(true);
            loginWithPhone();
        }
    }

    if (error) {
        return <ErrorFromFirebase error={error} />
    }

    if (verifyPhone) {
        return (
            <ConfirmPhoneWithOTP
                phoneNo={state.phoneNumber}
                onError={setError}
                onSuccess={onCredential} />
        );
    }

    if (isLoading) {
        return (
            <Box className="d-flex justify-content-center align-items-center vh-100 vw-100 position-fixed top-0 start-0 bg-white bg-opacity-75">
                <CircularProgress size={40} />
            </Box>
        )
    }

    return (
        <>
            <form
                className="needs-validation"
                id={formId}
            >
                {
                    propertyList.map((data, index) => {
                        return (
                            <AddProperty
                                currentValue={state[data.item.name]}
                                key={index}
                                data={data}
                                onChange={(e) => {
                                    dispatch({ type: ADD_PROPS_TYPE, payload: e });
                                }}
                            />
                        )
                    })
                }

                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
                    <button onClick={handleSubmit}
                        className="btn btn-primary col-10 my-2">
                        {buttonText}
                    </button>
                </div>
            </form>
        </>
    )
}

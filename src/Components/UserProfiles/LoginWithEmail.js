import { useId, useReducer, useState } from "react";
import { auth } from "../../firebaseHelper/firebaseConfigForServer";
import { signInWithEmailAndPassword } from "firebase/auth";
import { emailAndPassword } from "../../Helpers/ExtraProperties";
import { checkValidity, deepCopyObject, getEmailfromPhone } from "../../Helpers/helpers";
import ErrorFromFirebase from "../../Helpers/FirebaseErrorMessages";
import AddProperty from "../AddProperties/AddProperty";
import { CircularProgress, Box } from "@mui/material";
import { ADD_PROPERTY } from "../../Helpers/ConstantProperties";

const reducer = (state, action) => {
    const currentState = deepCopyObject(state);
    switch (action.type) {
        case ADD_PROPERTY:
            currentState[action.payload.name] = action.payload.value;
            break;
        default:
    }
    return currentState;
}

function LoginWithEmail({ onAuthSuccess }) {
    const [state, dispatch] = useReducer(reducer, {});
    const [error, setError] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const formId = useId()

    const loginWithEmailID = async () => {
        try {
            const emailID = getEmailfromPhone(state.phoneNumber);
            await signInWithEmailAndPassword(auth, emailID, state.password);
            onAuthSuccess();
        }
        catch (e) {
            setError(e);
        }
    }

    const handleloginWithEmail = () => {
        const form = document.getElementById(formId);
        let isValid = checkValidity(form, 'input:not(#groupId input), textarea:not(#groupId textarea), select:not(#groupId select)')
        if (isValid) {
            setIsLoading(true);
            loginWithEmailID();
        }
    }

    if (error) {
        return <ErrorFromFirebase error={error} />
    }

    if (isLoading) {
        return (
            <Box className="d-flex justify-content-center align-items-center vh-100 vw-100 position-fixed top-0 start-0 bg-white bg-opacity-75">
                <CircularProgress size={40} />
            </Box>
        )
    }

    return (
        <div className="vstack">
            <form
                id={formId}
                className="needs-validation"
            >
                {
                    emailAndPassword.map((data, index) => {
                        return <AddProperty
                            currentValue={state[data.item.name]}
                            key={index}
                            data={data}
                            onChange={(e) => {
                                dispatch({ type: ADD_PROPERTY, payload: e });
                            }}
                        />
                    })
                }
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
                    <button
                        onClick={handleloginWithEmail}
                        type="submit"
                        className="btn btn-primary col-10 my-2"
                        alt="..." >
                        Log In
                    </button>
                </div>
            </form>
        </div>
    );
}

export default LoginWithEmail;
import { useState } from "react";
import ErrorFromFirebase from "../../Helpers/FirebaseErrorMessages";
import LoginWithGoogle from "./LoginWithGoogle";
import LoginWithPhone from "./LoginWithPhone";

function LoginPageBody({ onAuthSuccess }) {
    const [error, setError] = useState(undefined);

    if (error) return <ErrorFromFirebase error={error} />
    return (
        <>
            <LoginWithPhone onAuthSuccess={onAuthSuccess} />
            <LoginWithGoogle onAuthSuccess={onAuthSuccess} setError={setError} />
        </>
    )
}

export default LoginPageBody;
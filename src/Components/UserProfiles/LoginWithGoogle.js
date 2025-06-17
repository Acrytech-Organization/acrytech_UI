import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebaseHelper/firebaseConfigForServer";
import { useState } from "react";
import { CircularProgress } from "@mui/material";

const provider = new GoogleAuthProvider();

function LoginWithGoogle({ onAuthSuccess, setError }) {
    const [isLoading, setIsLoading] = useState(false);

    const loginWithGoogle = async () => {
        try {
            setIsLoading(true);
            await signInWithPopup(auth, provider);
            await onAuthSuccess();
        }
        catch (e) {
            setError(e);
        }
    }

    if (isLoading) {
        return <div className="d-flex justify-content-center">
            <CircularProgress />
        </div>
    }

    return (
        <div className="max-Width-250 mx-auto">
            <img
                onClick={loginWithGoogle}
                src={"./googleSignIn.png"}
                className="card-img-top"
                alt="..." />
        </div>
    );
}

export default LoginWithGoogle;
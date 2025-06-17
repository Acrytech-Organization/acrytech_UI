import React, { useState } from 'react';
import { auth } from '../../firebaseHelper/firebaseConfigForServer';
import { emailAndPassword } from '../../Helpers/ExtraProperties';
import SignupWithphone from './SignupWithPhone';
import { USER_MUST_BE_PRESENT } from '../../Helpers/helpers';
import { signInWithCredential, updatePassword } from 'firebase/auth';

export default function ForgotPasswordPage({ onAuthSuccess }) {
    const [success, setSuccess] = useState(false);

    const onCredential = async (credential, state) => {
        await signInWithCredential(auth, credential);
        await updatePassword(auth.currentUser, state.password);

        // We want the user to be login with new password.
        // We are already signed in with OTP
        // so calling sign-out again.
        await auth.signOut();
    };

    if (success) {
        return (
            <div className="vstack align-items-center">
                <div className="alert alert-success text-center" role="alert" >
                    Password changed succesfully. Please login with new password.
                </div>
            </div>
        );
    }

    return (
        <SignupWithphone
            onPhoneCredential={onCredential}
            onAuthSuccess={() => setSuccess(true)}
            propertyList={emailAndPassword}
            buttonText={"Verify and Reset"}
            userStatus={USER_MUST_BE_PRESENT} />
    )
}

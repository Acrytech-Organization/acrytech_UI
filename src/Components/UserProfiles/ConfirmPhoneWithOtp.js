import { useEffect } from "react";
import OtpPage from "./OtpPage";
import { useState } from "react";
import { PhoneAuthProvider, RecaptchaVerifier } from "firebase/auth";
import { auth } from "../../firebaseHelper/firebaseConfigForServer";
import { getFormattedPhone } from "../../Helpers/helpers";
import GenericSpinner from "../GenericComponents/FormComponent/GenericSpinner";

const provider = new PhoneAuthProvider(auth);

export default function ConfirmPhoneWithOTP({ phoneNo, onSuccess, onError }) {
    const [vid, setverificationId] = useState(undefined);
    const [otpcode, setOTP] = useState(undefined);
    const [isVerifying, setisVerifying] = useState(false);

    useEffect(() => {
        const sendOtp = async () => {
            try {
                const recaptchaVerifier = new RecaptchaVerifier(
                    auth,
                    'recaptcha-container',
                    { size: 'invisible' }
                );

                const Id = await provider.verifyPhoneNumber(
                    getFormattedPhone(phoneNo),
                    recaptchaVerifier);

                setverificationId(Id);
            } catch (e) {
                onError(e);
            }
        }

        sendOtp();
    }, [onError, phoneNo])

    const onOTPSubmit = async () => {
        setisVerifying(true);
        try {
            await onSuccess(PhoneAuthProvider.credential(vid, otpcode));
        } catch (e) {
            onError(e);
        } finally {
            setisVerifying(false);
        }
    }

    if (!vid) {
        return (
            <>
                <div id='recaptcha-container'></div>
                <GenericSpinner/>
            </>
        );
    }

    return <OtpPage code={otpcode} setCode={setOTP} submitCode={onOTPSubmit} isVerifying={isVerifying} />
}
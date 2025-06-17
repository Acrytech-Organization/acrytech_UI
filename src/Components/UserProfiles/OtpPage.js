import React from 'react'
import OTPInput from 'react-otp-input'
import { CircularProgress } from '@mui/material'
export default function OtpPage({ code, setCode, submitCode, isVerifying }) {

    return (
        <div className="vstack gap-3 justify-content-center align-items-center">
            <h1 className="text-center">
                OTP Verification
            </h1>
            <OTPInput
                value={code}
                onChange={setCode}
                shouldAutoFocus={true}
                numInputs={6}
                renderSeparator={<span>&ensp;</span>}
                inputStyle={"form-control w-100"}
                renderInput={(props) => <input {...props} />}
            />
            {
                isVerifying ? (<CircularProgress size={40} />) :
                    <button
                        disabled={code?.length !== 6}
                        className="btn btn-primary"
                        onClick={() => submitCode()}>
                        Verify
                    </button>
            }

        </div>
    )
}

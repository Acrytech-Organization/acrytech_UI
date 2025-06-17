import { useState } from "react";
import LoginWithEmail from "./LoginWithEmail";
import ForgotPasswordPage from "./ForgotPasswordPage";
import { userRegister } from "../../Helpers/ExtraProperties";
import { auth } from "../../firebaseHelper/firebaseConfigForServer";
import {
    EmailAuthProvider,
    linkWithCredential,
    signInWithCredential,
    updateProfile
} from "firebase/auth";
import { getEmailfromPhone } from "../../Helpers/helpers";
import SignupWithPhone from "./SignupWithPhone";
import { PRIMARY_COLOR, commonFontWeight } from "../../Helpers/ConstantProperties";
import { Box } from "@mui/material";
import { LOGO_ALT, LOGO_SRC } from "../../webConstants";

function FooterLink({ text, onClick }) {
    const pointerStyle = { cursor: 'pointer' };
    return (
        <div
            onClick={onClick}
            style={pointerStyle}
            className="text-primary text-center text-nowrap col-6">
            {text}
        </div>
    );
}

export default function LoginWithPhone({ onAuthSuccess }) {
    const onCredential = async (credentials, state) => {
        const emailID = getEmailfromPhone(state.phoneNumber);
        const emailCredential = EmailAuthProvider.credential(emailID, state.password);

        await signInWithCredential(auth, credentials);
        await linkWithCredential(auth.currentUser, emailCredential);
        await updateProfile(auth.currentUser, { displayName: state.Full_Name });
    };

    const [userComponent, setUserComponent] = useState('loginComponent');

    const componentList = {
        loginComponent: {
            title: "Login into your account",
            component: <LoginWithEmail onAuthSuccess={onAuthSuccess} />,
            footerLinks: [
                { text: "Forgot Password?", action: 'forgotPasswordComponent' },
                { text: "Sign Up", action: 'signInComponent' }
            ]
        },
        forgotPasswordComponent: {
            title: "Forgot Password",
            component: <ForgotPasswordPage onAuthSuccess={onAuthSuccess} />,
            footerLinks: [
                { text: "Log In", action: 'loginComponent' },
                { text: "Sign Up", action: 'signInComponent' }
            ]
        },
        signInComponent: {
            title: "Create Account",
            component: (
                <SignupWithPhone
                    onPhoneCredential={onCredential}
                    onAuthSuccess={onAuthSuccess}
                    propertyList={userRegister}
                    buttonText={"Verify and Create"}
                />
            ),
            footerLinks: [
                { text: "Forgot Password?", action: 'forgotPasswordComponent' },
                { text: "Log In", action: 'loginComponent' }
            ]
        },
    };

    const handleFooterLinkClick = (action) => {
        setUserComponent(action);
    };

    const renderFooterLinks = (footerLinks) => {
        return footerLinks.map((link) => (
            <FooterLink
                key={link.text}
                text={link.text}
                onClick={() => handleFooterLinkClick(link.action)}
            />
        ));
    };

    const currentUserComponent = componentList[userComponent];

    return (
        <div className="card-body">
            <Box
                className="card-header text-center mb-2"
                color={PRIMARY_COLOR}
                fontSize={"1.3rem"}
                fontWeight={commonFontWeight}>

                <Box className="mb-3 pt-1">
                    <img className={"w-75"} alt={LOGO_ALT} src={LOGO_SRC} />
                </Box>

                {currentUserComponent.title}
            </Box>
            <div>{currentUserComponent.component}</div>
            {currentUserComponent.footerLinks.length > 0 && (
                <div className="card-footer">
                    <div className="row">
                        {renderFooterLinks(currentUserComponent.footerLinks)}
                    </div>
                </div>
            )}
            <div className="text-center m-2">OR</div>
        </div>
    );
}
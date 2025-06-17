import React, { createContext, useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogActions, Button, DialogContentText } from "@mui/material";
import { serviceHelpers } from "../../Helpers/ServiceHelpers";
import GenericSpinner from "../GenericComponents/FormComponent/GenericSpinner";
import { PRIMARY_COLOR, SESSION_STORAGE_FIRM_LIST, SESSION_STORAGE_KEY_FIRM, gradientColors } from "../../Helpers/ConstantProperties";

export const FirmContext = createContext({});

export function FirmContextProvider({ children }) {
    const [currentFirm, changeCurrentFirm] = React.useState({ name: "", khID: "" });
    const [firms, setFirms] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [refresh, setrefresh] = useState(0)

    const khID = currentFirm?.khID;

    const setCurrentFirm = (selectedFirm) => {
        sessionStorage.setItem(
            SESSION_STORAGE_KEY_FIRM,
            JSON.stringify(selectedFirm));
        changeCurrentFirm(selectedFirm);
    }

    const resetFirmList = () => {
        sessionStorage.clear()
        setrefresh(update => update + 1);
        //update => update + 1 that is for refreshing the component as we add the new Firms
    }

    React.useEffect(() => {
        const getUserFirms = async () => {
            try {
                var firmList = sessionStorage.getItem(SESSION_STORAGE_FIRM_LIST);

                firmList = firmList
                    ? JSON.parse(firmList)
                    : await serviceHelpers.getFirm();
                firmList = firmList.map((firm, index) => ({
                    ...firm,
                    color: {
                        appBarColor: gradientColors[index % gradientColors.length],
                    },
                    colorIndex: index
                }));

                if (firmList.length !== 0) {
                    var selectedFirm = sessionStorage.getItem(SESSION_STORAGE_KEY_FIRM);

                    if (selectedFirm) changeCurrentFirm(JSON.parse(selectedFirm));

                    if (!selectedFirm && firmList.length === 1) {
                        setCurrentFirm(firmList[0]);
                    }
                }

                sessionStorage.setItem(
                    SESSION_STORAGE_FIRM_LIST,
                    JSON.stringify(firmList));

                setFirms(firmList);
                setLoading(false);
            }
            catch (e) {
                setError(e);
                setLoading(false);
            }
        }
        getUserFirms();

    }, [refresh]);

    if (loading) {
        return <GenericSpinner />
    }

    const handleClose = () => {
        setError(null);
    };

    return (
        <>
            <Dialog
                open={error !== null}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Error"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {error?.message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} sx={{ color: PRIMARY_COLOR }}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
            <FirmContext.Provider value={{ currentFirm, setCurrentFirm, firms, khID, resetFirmList }}>
                {children}
            </FirmContext.Provider>
        </>
    );
}

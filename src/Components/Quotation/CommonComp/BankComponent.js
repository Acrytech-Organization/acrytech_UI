import { Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import { checkValue, createUPILink, getBankDetails } from '../../../Helpers/helpers';
import QRCode from "qrcode";
import { smallHeight } from "../../../Helpers/ConstantProperties";
import { useEffect, useState } from "react";

const styles = StyleSheet.create({
    cardContainer: {
        borderWidth: 1,
        borderColor: "#cccccc",
        borderRadius: 4,
        width: "100%",
        height: smallHeight
    },
    headingText: {
        fontSize: 8,
        fontWeight: 'bold',
        backgroundColor: "#cfe2ff",
        padding: 5,
        textAlign: 'center',
    },
    contentBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: "90%",
    },
    qrCodeContainer: {
        width: "30%",
        alignItems: "center",
    },
    bankDetails: {
        width: "70%",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
    },
    row: {
        flexDirection: "row",
    },
    textLabel: {
        width: "40%",
        textAlign: "left",
        padding: 2,
    },
    textValue: {
        width: "60%",
        textAlign: "left",
        padding: 2,
    },
});

export default function BankComponent({ context, currentFirm }) {
    const [qrCodeDataUri, setQrCodeDataUri] = useState(null);
    const cData = context.cData;

    const upiDetails = {
        upiID: currentFirm.upiID,
        note: "Payment from " + cData.customerName,
    };

    if (cData.roundedTotal > 0) {
        upiDetails.amount = cData.roundedTotal;
    }

    const bankDetails = getBankDetails(currentFirm);
    const formatedUpiLink = createUPILink(upiDetails);

    useEffect(() => {
        QRCode.toDataURL(formatedUpiLink)
            .then((dataUri) => setQrCodeDataUri(dataUri))
            .catch((err) => console.error("Error generating QR code", err));
    }, [formatedUpiLink]);

    return (
        <View style={styles.cardContainer}>
            <Text style={styles.headingText}>Bank Details</Text>
            <View style={styles.contentBox}>

                {/* QR Code Section */}
                <View style={styles.qrCodeContainer}>
                    {qrCodeDataUri && (
                        <Image src={qrCodeDataUri} style={{ width: "100%" }} />
                    )}
                </View>

                {/* Bank Details Section */}
                <View style={styles.bankDetails}>
                    {bankDetails.map((detail, index) => (
                        <View key={index} style={styles.row}>
                            <Text style={styles.textLabel}>{detail.label}:</Text>
                            <Text style={styles.textValue}>{checkValue(detail.text)}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );
}
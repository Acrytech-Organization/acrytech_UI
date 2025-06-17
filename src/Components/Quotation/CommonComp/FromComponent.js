import { Text, StyleSheet, View } from "@react-pdf/renderer";
import { PRIMARY_COLOR, smallHeight } from "../../../Helpers/ConstantProperties";
import { checkValue } from "../../../Helpers/helpers";

const styles = StyleSheet.create({
    text: {
        fontSize: 8,
        color: "#212121",
        textAlign: "left",
    },
    fromHeading: {
        fontSize: 10,
        fontWeight: "extrabold",
        color: PRIMARY_COLOR,
        textAlign: "left",
    },
    label: {
        fontSize: 8,
        color: "#212121",
        textAlign: "left",
        fontWeight: "extrabold",
    },
    row: {
        flexDirection: "row",
        paddingVertical: "0.5mm"
    },
    borderBox: {
        borderWidth: 1,
        borderColor: "#cccccc",
        padding: 4,
        borderRadius: 3,
        width: "100%",
        minHeight: smallHeight,
    }
});

export default function FromComponent({ currentFirm }) {
    return (
        <View style={styles.borderBox}>
            <Text style={styles.text}>From</Text>

            <Text style={styles.fromHeading}>{currentFirm.name}</Text>

            <View style={styles.row}>
                <Text style={[styles.text]}>
                    {currentFirm.address}, {currentFirm.city}, {currentFirm.pincode}
                </Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>GST Number: </Text>
                <Text style={styles.text}>{checkValue(currentFirm.gstin)}</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>PAN Number: </Text>
                <Text style={styles.text}>
                    {checkValue(currentFirm.panNumber || currentFirm.khID)}
                </Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Phone Number: </Text>
                <Text style={styles.text}>{checkValue(currentFirm.phoneNumber)}</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Email ID: </Text>
                <Text style={styles.text}>{checkValue(currentFirm.email)}</Text>
            </View>
        </View>
    );
}
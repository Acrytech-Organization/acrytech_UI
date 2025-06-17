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
        padding: 5,
        borderRadius: 3,
        width: "100%",
        height: smallHeight,
    }
});

export default function ToComponent({ context }) {
    const item = context.cData;

    return (
        <View style={styles.borderBox}>
            <Text style={styles.text}>To</Text>

            <Text style={styles.fromHeading}>{item.customerName}</Text>

            <View style={styles.row}>
                <Text style={styles.label}>City: </Text>
                <Text style={styles.text}>{checkValue(item.city)}</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>GST Number: </Text>
                <Text style={styles.text}>{checkValue(item.gstin)}</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>PAN Number: </Text>
                <Text style={styles.text}>{checkValue(item.panNumber)}</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Phone Number: </Text>
                <Text style={styles.text}>{checkValue(item.contactPhone)}</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Email ID: </Text>
                <Text style={styles.text}>{checkValue(item.contactEmail)}</Text>
            </View>
        </View>
    );
}
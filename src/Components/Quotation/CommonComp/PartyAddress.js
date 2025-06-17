import { Text, StyleSheet, View } from "@react-pdf/renderer";
import { addressHeight, NOT_AVAILABLE, PRIMARY_COLOR } from "../../../Helpers/ConstantProperties";

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
        minHeight: addressHeight,
    }
});

export default function PartyAddress({ page, title, address }) {

    if (page > 0) return <></>; // Only show on the first page

    return (
        <View style={styles.borderBox}>

            <Text style={styles.fromHeading}>{title}</Text>

            <View style={styles.row}>
                <Text style={[styles.text]}>
                    {address || NOT_AVAILABLE}
                </Text>
            </View>

        </View>
    );
}
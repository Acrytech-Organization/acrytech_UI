import { Text, StyleSheet, View } from "@react-pdf/renderer";
import { PRIMARY_COLOR, smallHeight } from "../../../Helpers/ConstantProperties";

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
        marginBottom: 5,
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

export default function DetailsComponent({ context, page }) {
    const detailsToShow = context.detailsToShow;
    const totalPages = context.cData.totalPages;

    return (
        <View style={styles.borderBox}>

            <Text style={styles.fromHeading}>Details</Text>

            {
                Object.entries(detailsToShow).map(([Key, Value]) => (

                    <View style={styles.row}>

                        <Text style={[styles.label, { flexBasis: "30%" }]}>
                            {Key}:
                        </Text>

                        <Text style={[styles.text, { flexBasis: "70%" }]}>
                            {Value}
                        </Text>
                    </View>
                ))
            }

            <View style={styles.row}>

                <Text style={[styles.label, { flexBasis: "30%" }]}>
                    Page:
                </Text>

                <Text style={[styles.text, { flexBasis: "70%" }]}>
                    {(page + 1) + " of " + totalPages}
                </Text>
            </View>

        </View>
    );

}
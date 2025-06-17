import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { getTermsAndConditions } from '../../../Helpers/helpers';
import { smallHeight } from "../../../Helpers/ConstantProperties";

const styles = StyleSheet.create({
    cardContainer: {
        borderWidth: 1,
        borderColor: "#cccccc",
        borderRadius: 3,
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
    contentContainer: {
        padding: 10,
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
    },
    row: {
        flexDirection: "row",
    },
    labelText: {
        fontSize: 8,
        fontWeight: 'bold',
        width: "50%",
        paddingVertical: 2,
        textAlign: 'left',
    },
    text: {
        fontSize: 8,
        width: "50%",
        paddingVertical: 2,
        textAlign: 'left',
    },
});

export default function TermsComponent({ context }) {
    const item = context.cData;
    const termsAndConditions = getTermsAndConditions(item);

    return (
        <View style={styles.cardContainer}>
            <Text style={styles.headingText}>Terms & Conditions</Text>
            <View style={styles.contentContainer}>
                {termsAndConditions.map(({ label, text }, index) => (
                    <View key={index} style={styles.row}>
                        {label && (
                            <Text style={styles.labelText}>
                                {label}:
                            </Text>
                        )}
                        <Text style={styles.text}>{text}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
}
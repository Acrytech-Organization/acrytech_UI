import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { smallHeight } from '../../../Helpers/ConstantProperties';

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
        flexDirection: "column",
        justifyContent: "flex-end",
        height: "85%",
    },
});

export default function SignatureComp({ currentFirm }) {
    return (
        <View style={styles.cardContainer}>
            <Text style={styles.headingText}>Signature</Text>
            <View style={styles.contentContainer}>
                <View style={styles.container}>
                    <Text>
                        {currentFirm.name}
                    </Text>
                </View>
            </View>
        </View>
    )
}
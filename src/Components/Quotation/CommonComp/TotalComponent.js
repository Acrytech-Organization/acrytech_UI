import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { ShowNumber } from '../../../Helpers/helpers';
import { PRIMARY_COLOR } from '../../../Helpers/ConstantProperties';

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        marginBottom: 5,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontFamily: "Roboto",
    },
    text: {
        fontSize: 9,
    },
    Colortext: {
        fontSize: 10,
        color: PRIMARY_COLOR
    },
});

export default function TotalComponent({ context }) {
    const cData = context.cData;

    return (
        <View>
            <View style={styles.row}>
                <Text style={styles.text}>Total Taxable:</Text>
                <Text style={styles.text}>{ShowNumber(cData.totalTaxableAmount, 2, true)}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.text}>Total Tax:</Text>
                <Text style={styles.text}>{ShowNumber(cData.totalTax, 2, true)}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.text}>Round-Off:</Text>
                <Text style={styles.text}>{ShowNumber(cData.roundOff, 2, true)}</Text>
            </View>
            <View style={styles.row}>
                <Text style={[styles.text, styles.Colortext]}>Grand Total:</Text>
                <Text style={[styles.text, styles.Colortext]}>
                    {ShowNumber(cData.roundedTotal, 2, true)}
                </Text>
            </View>
        </View>
    );
}
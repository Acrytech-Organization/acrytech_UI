import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { numberToWords } from '../../../Helpers/helpers';
import { PRIMARY_COLOR } from '../../../Helpers/ConstantProperties';

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    text: {
        fontSize: 8,
        marginHorizontal: 5,
    },
    Colortext: {
        fontSize: 8,
        marginHorizontal: 0,
        color: PRIMARY_COLOR
    },
});

export default function TotalInWords({ context }) {
    const cData = context.cData;
    return (
        <View style={styles.row}>
            <Text style={styles.text}>Amount in Words:</Text>
            <Text style={styles.Colortext}>{numberToWords(cData.roundedTotal)}</Text>
        </View>
    )
}
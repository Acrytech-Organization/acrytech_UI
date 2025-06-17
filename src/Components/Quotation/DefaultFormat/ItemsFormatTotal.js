import { Text, View } from "@react-pdf/renderer";
import { ShowNumber } from "../../../Helpers/helpers";

const ItemsFormatTotal = ({ styles, cData, isLast }) => {
    if (!isLast) {
        return (
            <View style={[styles.tableRow, styles.totalRow]}>
                <Text style={
                    {
                        textAlign: "right",
                        paddingRight: "2mm",
                        fontSize: 8,
                        flexBasis: "100%"
                    }}>
                    Continue on next page ...
                </Text>
            </View>
        )
    }

    return (
        <View style={[styles.tableRow, styles.totalRow]}>
            <View style={styles.totalNameCell}>
                <Text>Total</Text>
            </View>
            <View style={styles.totalUnitsCell}>
                <Text>{ShowNumber(cData.totalQuantity, 2)}</Text>
            </View>
            <View style={styles.totalTaxableAmountCell}>
                <Text>{ShowNumber(cData.totalTaxableAmount, 2, true)}</Text>
            </View>
        </View>
    )
};

export default ItemsFormatTotal;
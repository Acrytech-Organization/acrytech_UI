import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { ShowNumber } from "../../../Helpers/helpers";

const styles = StyleSheet.create({
    table: {
        display: "flex",
        flexDirection: "column",
        borderWidth: 1,
        borderColor: "#e0e0e0",
        borderRadius: 3,
        width: "100%",
    },
    tableHeader: {
        flexDirection: "row",
        backgroundColor: "#cfe2ff",
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: "#e0e0e0",
    },
    tableRow: {
        flexDirection: "row",
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: "#e0e0e0",
        fontSize: 8
    },
    tableCell: {
        flex: 1,
        textAlign: "center",
        fontSize: 8,
    },
    boldText: {
        fontWeight: "bold",
    },
});

export default function TaxTable({ context }) {
    const cData = context.cData;
    const TaxData = cData.taxTypeWiseList || [];

    return (
        <View style={styles.table}>

            <View style={styles.tableHeader}>
                <Text style={[styles.tableCell, styles.boldText]}>Type</Text>
                <Text style={[styles.tableCell, styles.boldText]}>Taxable</Text>
                <Text style={[styles.tableCell, styles.boldText]}>Amount</Text>
            </View>

            {TaxData.map((tax, index) => (
                <View key={index} style={styles.tableRow}>
                    <Text style={styles.tableCell}>{tax.type || "-"}</Text>
                    <Text style={styles.tableCell}>{ShowNumber(tax.taxable, 2, false)}</Text>
                    <Text style={styles.tableCell}>{ShowNumber(tax.tax, 2, false)}</Text>
                </View>
            ))}
        </View>
    );
}
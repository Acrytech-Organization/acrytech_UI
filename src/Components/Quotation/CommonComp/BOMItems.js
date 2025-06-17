import { BOMTableValues } from "../../../Helpers/helpers";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { ShowNumber } from "../../../Helpers/helpers";

const styles = StyleSheet.create({
    table: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#e0e0e0",
        borderRadius: 4,
        fontFamily: 'Roboto',
    },
    tableRow: {
        display: "flex",
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#e0e0e0",
        borderBottomStyle: "solid",
        textAlign: "center",
        fontSize: 8,
        paddingVertical: "1mm",
    },

    tableHeader: {
        display: "flex",
        flexDirection: "row",
        fontSize: 8,
        backgroundColor: "#cfe2ff",
        fontWeight: "bold",
        textAlign: "center",
        paddingVertical: "1mm"
    },

    rightBorder: {
        borderRightWidth: 1,
        borderRightColor: "#e0e0e0",
        borderRightStyle: "solid",
    },

    amountCell: {
        textAlign: "right",
        paddingRight: "1mm",
    },

    totalRow: {
        display: "flex",
        flexDirection: "row",
        fontSize: 8,
        fontWeight: "bold",
        backgroundColor: "#f8f9fa",
        paddingVertical: "1mm",
        textAlign: "center",
    },

    totalNameCell: {
        textAlign: "center",
        flexBasis: 6 / 12 * 100 + "%"
    },

    totalUnitsCell: {
        textAlign: "center",
        flexBasis: 2 / 12 * 100 + "%"
    },

    totalTaxableAmountCell: {
        textAlign: "right",
        paddingRight: "1mm",
        flexBasis: 4 / 12 * 100 + "%"
    }
});

export default function BOMItems({ context }) {
    const cData = context.cData;

    return (
        <View style={styles.table}>
            {/* Table Header */}
            <View style={styles.tableHeader}>
                {
                    BOMTableValues.map((header) => (
                        <View
                            key={header.key}
                            style={[
                                { flexBasis: header.sizes.basis / 12 * 100 + "%" },
                            ]}
                        >
                            <Text>{header.content}</Text>
                        </View>
                    ))
                }
            </View>

            {/* Table Rows */}
            {
                cData?.items.map((product, index) => (
                    <View key={index} style={styles.tableRow}>
                        <View style={[
                            styles.rightBorder,
                            { flexBasis: BOMTableValues[0].sizes.basis / 12 * 100 + "%" }
                        ]}>
                            <Text>{product.fgCode}</Text>
                        </View>

                        <View style={[
                            styles.rightBorder,
                            { flexBasis: BOMTableValues[1].sizes.basis / 12 * 100 + "%" }
                        ]}>
                            <Text>{product.name}</Text>
                        </View>

                        <View style={[
                            styles.rightBorder,
                            { flexBasis: BOMTableValues[2].sizes.basis / 12 * 100 + "%" }
                        ]}>
                            <Text>{ShowNumber(product.units, 2)}</Text>
                        </View>

                        <View style={[
                            styles.amountCell,
                            styles.rightBorder,
                            { flexBasis: BOMTableValues[3].sizes.basis / 12 * 100 + "%" }
                        ]}>
                            <Text>{ShowNumber(product.saleRate, 2, true)}</Text>
                        </View>

                        <View style={[
                            styles.amountCell,
                            { flexBasis: BOMTableValues[4].sizes.basis / 12 * 100 + "%" }
                        ]}>
                            <Text>{ShowNumber(product.taxableAmount, 2, true)}</Text>
                        </View>
                    </View>
                ))
            }

            <View style={{ flex: 1 }}></View>

            {/* Total Rows */}
            <View style={styles.totalRow}>
                <View style={[
                    styles.rightBorder,
                    { flexBasis: 5.5 / 12 * 100 + "%" }
                ]}>
                    <Text>Total</Text>
                </View>

                <View style={[
                    styles.rightBorder,
                    { flexBasis: 1.5 / 12 * 100 + "%" }
                ]}>
                    <Text>{ShowNumber(cData.totalQuantity, 2)}</Text>
                </View>

                <View style={[
                    styles.rightBorder,
                    { flexBasis: 2 / 12 * 100 + "%" }
                ]}>
                </View>

                <View style={[
                    styles.amountCell,
                    { flexBasis: 3 / 12 * 100 + "%" }
                ]}>
                    <Text>{ShowNumber(cData.totalTaxableAmount, 2, true)}</Text>
                </View>
            </View>
        </View>
    )
}
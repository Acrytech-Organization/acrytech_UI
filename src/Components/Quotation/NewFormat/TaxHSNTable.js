import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { CGST_HSN_TAX_HEADER, IGST_HSN_TAX_HEADER, ShowNumber } from "../../../Helpers/helpers";

const styles = StyleSheet.create({
    table: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#e0e0e0",
        borderRadius: 4,
        fontFamily: "Roboto",
    },
    tableRow: {
        display: "flex",
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#e0e0e0",
        borderBottomStyle: "solid",
    },

    tableHeader: {
        backgroundColor: "#cfe2ff",
        fontWeight: "bold",
        textAlign: "center",
        paddingVertical: "1mm",
        fontSize: 7,
    },

    tableCell: {
        fontSize: 7,
        textAlign: "center",
    },

    taxRow: {
        paddingVertical: "0.5mm",
    },

    amountCell: {
        textAlign: "right",
        paddingRight: "1mm",
    },

    rightBorder: {
        borderRightWidth: 1,
        borderRightColor: "#e0e0e0",
        borderRightStyle: "solid",
    },

    totalRow: {
        fontSize: 8,
        fontWeight: "bold",
        backgroundColor: "#f8f9fa",
        paddingVertical: "1mm"
    },
});

export default function TaxHSNTable({ context }) {
    const cData = context.cData;
    const headerList = cData.igstApp ? IGST_HSN_TAX_HEADER : CGST_HSN_TAX_HEADER;
    const hsnWiseList = cData.hsnWiseList;

    return (
        <View style={styles.table}>

            {/* Table Header */}
            <View style={styles.tableRow}>
                {
                    headerList.map((header) => (
                        <View
                            key={header.key}
                            style={[
                                styles.tableCell,
                                styles.tableHeader,
                                { flexBasis: header.columnSize / 12 * 100 + "%" },
                            ]}
                        >
                            <Text>{header.content}</Text>
                        </View>
                    ))
                }
            </View>

            {/* Table Body */}
            {
                Object.keys(hsnWiseList).map((key, index) => {
                    const { taxable, hsncode, GSTRate, quantity, tax } = hsnWiseList[key];
                    let count = 0;

                    return (
                        <View key={key} style={[styles.tableRow, styles.taxRow]}>

                            <View style={[
                                styles.tableCell,
                                styles.rightBorder,
                                { flexBasis: headerList[count++].columnSize / 12 * 100 + "%" }
                            ]}>
                                <Text>{hsncode}</Text>
                            </View>

                            <View style={[
                                styles.tableCell,
                                styles.rightBorder,
                                { flexBasis: headerList[count++].columnSize / 12 * 100 + "%" }
                            ]}>
                                <Text>{GSTRate}%</Text>
                            </View>

                            <View style={[
                                styles.tableCell,
                                styles.rightBorder,
                                { flexBasis: headerList[count++].columnSize / 12 * 100 + "%" }
                            ]}>
                                <Text>{ShowNumber(quantity, 2)}</Text>
                            </View>

                            <View style={[
                                styles.tableCell,
                                styles.amountCell,
                                styles.rightBorder,
                                { flexBasis: headerList[count++].columnSize / 12 * 100 + "%" }
                            ]}>
                                <Text>{ShowNumber(taxable, 2, true)}</Text>
                            </View>

                            {
                                !cData.igstApp &&
                                <View style={[
                                    styles.tableCell,
                                    styles.amountCell,
                                    styles.rightBorder,
                                    { flexBasis: headerList[count++].columnSize / 12 * 100 + "%" }
                                ]}>
                                    <Text>{ShowNumber(tax / 2, 2, true)}</Text>
                                </View>
                            }

                            {!cData.igstApp &&
                                <View style={[
                                    styles.tableCell,
                                    styles.amountCell,
                                    styles.rightBorder,
                                    { flexBasis: headerList[count++].columnSize / 12 * 100 + "%" }
                                ]}>
                                    <Text>{ShowNumber(tax / 2, 2, true)}</Text>
                                </View>
                            }

                            {cData.igstApp &&
                                <View style={[
                                    styles.tableCell,
                                    styles.amountCell,
                                    styles.rightBorder,
                                    { flexBasis: headerList[count++].columnSize / 12 * 100 + "%" }
                                ]}>
                                    <Text>{ShowNumber(tax, 2, true)}</Text>
                                </View>
                            }

                            <View style={[
                                styles.tableCell,
                                styles.amountCell,
                                { flexBasis: headerList[count++].columnSize / 12 * 100 + "%" }
                            ]}>
                                <Text>{ShowNumber(tax, 2, true)}</Text>
                            </View>

                        </View>
                    );
                })
            }

            {/* Total Row */}
            {
                <View style={[styles.tableRow, styles.totalRow]}>

                    <View style={[
                        styles.tableCell,
                        styles.rightBorder,
                        { flexBasis: 3 / 12 * 100 + "%" }
                    ]}>
                        <Text>Total</Text>
                    </View>

                    <View style={[
                        styles.tableCell,
                        styles.rightBorder,
                        { flexBasis: 1 / 12 * 100 + "%" }
                    ]}>
                        <Text>{cData.totalQuantity}</Text>
                    </View>

                    <View style={[
                        styles.tableCell,
                        styles.amountCell,
                        styles.rightBorder,
                        { flexBasis: 2.5 / 12 * 100 + "%" }
                    ]}>
                        <Text>{ShowNumber(cData.totalTaxableAmount, 2, true)}</Text>
                    </View>

                    {
                        !cData.igstApp &&
                        <View style={[
                            styles.tableCell,
                            styles.amountCell,
                            styles.rightBorder,
                            { flexBasis: 1.5 / 12 * 100 + "%" }
                        ]}>
                            <Text>{ShowNumber(cData.totalTax / 2, 2, true)}</Text>
                        </View>
                    }

                    {!cData.igstApp &&
                        <View style={[
                            styles.tableCell,
                            styles.amountCell,
                            styles.rightBorder,
                            { flexBasis: 1.5 / 12 * 100 + "%" }
                        ]}>
                            <Text>{ShowNumber(cData.totalTax / 2, 2, true)}</Text>
                        </View>
                    }

                    {cData.igstApp &&
                        <View style={[
                            styles.tableCell,
                            styles.amountCell,
                            styles.rightBorder,
                            { flexBasis: 3 / 12 * 100 + "%" }
                        ]}>
                            <Text>{ShowNumber(cData.totalTax, 2, true)}</Text>
                        </View>
                    }

                    <View style={[
                        styles.tableCell,
                        styles.amountCell,
                        { flexBasis: 2.5 / 12 * 100 + "%" }
                    ]}>
                        <Text>{ShowNumber(cData.totalTax, 2, true)}</Text>
                    </View>

                </View>
            }
        </View>
    );
}
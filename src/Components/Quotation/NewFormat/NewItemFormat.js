import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { PRIMARY_COLOR } from "../../../Helpers/ConstantProperties";
import { getPageCalculation, NewquotationTableValues, ShowNumber } from "../../../Helpers/helpers";
import ItemsFormatTotal from "../DefaultFormat/ItemsFormatTotal";
import NoItemItemTable from "../CommonComp/NoItemItemTable";

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
        alignItems: "center",
    },
    tableHeader: {
        fontSize: 8,
        backgroundColor: "#cfe2ff",
        fontWeight: "bold",
        textAlign: "center",
        paddingVertical: "1mm"
    },
    itemNameCell: {
        textAlign: "center",
        fontSize: 8,
        borderRight: 1,
        borderRightColor: "lightgray",
        paddingVertical: "1mm",
        flexBasis: NewquotationTableValues[0].sizes.basis / 12 * 100 + "%"
    },
    hnsCell: {
        textAlign: "center",
        fontSize: 8,
        borderRight: 1,
        borderRightColor: "lightgray",
        paddingVertical: "1mm",
        flexBasis: NewquotationTableValues[1].sizes.basis / 12 * 100 + "%"
    },
    unitsCell: {
        textAlign: "center",
        fontSize: 8,
        borderRight: 1,
        borderRightColor: "lightgray",
        paddingVertical: "1mm",
        flexBasis: NewquotationTableValues[2].sizes.basis / 12 * 100 + "%"
    },
    subText: {
        fontSize: 7,
        color: PRIMARY_COLOR,
        marginTop: 2,
    },

    rateCell: {
        textAlign: "right",
        paddingRight: "1mm",
        fontSize: 8,
        borderRight: 1,
        borderRightColor: "lightgray",
        paddingVertical: "1mm",
        flexBasis: NewquotationTableValues[3].sizes.basis / 12 * 100 + "%"
    },

    amountCell: {
        textAlign: "right",
        paddingRight: "1mm",
        fontSize: 8,
        paddingVertical: "1mm",
        flexBasis: NewquotationTableValues[4].sizes.basis / 12 * 100 + "%"
    },

    totalRow: {
        fontSize: 8,
        fontWeight: "bold",
        backgroundColor: "#f8f9fa",
        paddingVertical: "1mm"
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

export default function NewItemFormat({ context, page }) {
    const cData = context.cData;

    const { itemsToShow, isLast } = getPageCalculation(context.selectedFormat, cData.items, page);
    if (itemsToShow.length === 0) return <NoItemItemTable styles={styles} />;

    const products = itemsToShow;

    const ItemNameCell = ({ product }) => (
        <View style={styles.itemNameCell}>
            <Text>{product.name}</Text>
            <Text style={styles.subText}>{product.productdescription}</Text>
        </View>
    );

    const HsnCodeCell = ({ product }) => (
        <View style={styles.hnsCell}>
            <Text>{product.productHSNcode}</Text>
            <Text style={styles.subText}>GST: {product.GSTRate}%</Text>
        </View>
    );

    const UnitsCell = ({ product }) => (
        <View style={styles.unitsCell}>
            <Text>{ShowNumber(product.units, 2)}</Text>
            <Text style={styles.subText}>{product.unit}</Text>
        </View>
    );

    const RateCell = ({ product }) => (
        <View style={styles.rateCell}>
            <Text>{ShowNumber(product.saleRate, 2, true)}</Text>
            <Text style={styles.subText}>
                Inclusive: {ShowNumber(product.inclusiveRate, 2, true)}
            </Text>
        </View>
    );

    const AmountCell = ({ product }) => {
        return (
            <View style={styles.amountCell}>
                <Text>{ShowNumber(product.taxableAmount, 2, true)}</Text>
                <Text style={styles.subText}>
                    {product.gstValueString}
                </Text>
            </View>
        );
    };

    return (
        <View style={styles.table}>

            {/* Table Header */}
            <View style={styles.tableRow}>
                {
                    NewquotationTableValues.map((header) => (
                        <View
                            key={header.key}
                            style={[
                                styles.tableHeader,
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
                products.map((product, index) => (
                    <View key={index} style={styles.tableRow}>
                        <ItemNameCell product={product} />
                        <HsnCodeCell product={product} />
                        <UnitsCell product={product} />
                        <RateCell product={product} />
                        <AmountCell product={product} />
                    </View>
                ))
            }

            <View style={[styles.tableRow, { flex: 1 }]}>
            </View>

            {/* Total Row */}
            <ItemsFormatTotal styles={styles} cData={cData} isLast={isLast} />

        </View>
    );
}
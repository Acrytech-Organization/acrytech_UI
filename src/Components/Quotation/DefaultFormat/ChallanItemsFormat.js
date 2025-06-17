import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { challanFormatTableValues, getPageCalculation } from "../../../Helpers/helpers";
import { PRIMARY_COLOR } from "../../../Helpers/ConstantProperties";
import NoItemItemTable from "../CommonComp/NoItemItemTable";
import ChallanTotalRow from "./ChallanTotalRow";

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
        padding: 5,
        fontWeight: "bold",
        textAlign: "center",
    },
    tableCell: {
        paddingVertical: "2mm",
        fontSize: 8,
        textAlign: "center",
    },
    hsnCell: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    itemNameCell: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    subText: {
        fontSize: 7,
        color: PRIMARY_COLOR,
        marginTop: 1,
    },
});

const HSNCodeCell = ({ product }) => (
    <View style={styles.hsnCell}>
        <Text>{product.productHSNcode}</Text>
    </View>
);

const ItemNameCell = ({ product }) => (
    <View style={styles.itemNameCell}>
        <Text>{product.name}</Text>
        {product.productdescription && <Text style={styles.subText}>{product.productdescription}</Text>}
    </View>
);

const TableCell = ({ column, product, index }) => {
    if (column.key === "productHSNcode") return <HSNCodeCell product={product} />;
    if (column.key === "name") return <ItemNameCell product={product} />;
    if (column.key === "serialNo") return <Text>{index}</Text>;

    return column.format ? <Text>{column.format(product[column.key])}</Text> : <Text>{product[column.key]}</Text>;
};

export default function ChallanItemsFormat({ context, page }) {
    const { cData } = context;

    const { itemsToShow, isLast } = getPageCalculation(context.selectedFormat, cData.items, page);

    if (itemsToShow.length === 0) return <NoItemItemTable styles={styles} />;

    const products = itemsToShow;
    const propList = challanFormatTableValues;

    return (
        <View style={styles.table}>

            <View style={styles.tableRow}>
                {propList.map((header) => (
                    <Text key={header.key}
                        style={
                            [styles.tableCell,
                            styles.tableHeader,
                            { flexBasis: `${(header.sizes?.basis || 12) / 12 * 100}%` },
                            ]}>

                        {header.content}

                    </Text>
                ))}
            </View>

            {products.map((product, index) => (
                <View key={index} style={styles.tableRow}>

                    {propList.map((column) => (
                        <View
                            key={column.key}
                            style={
                                [
                                    styles.tableCell,
                                    { flexBasis: `${(column.sizes?.basis || 12) / 12 * 100}%` },
                                    { ...column.style }
                                ]} >

                            <TableCell column={column} product={product} index={index + 1} />
                        </View>
                    ))}

                </View>
            ))}

            <View style={{ flex: 1 }}>
            </View>

            <ChallanTotalRow context={context} isLast={isLast} />
        </View>
    );
}
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { defaultFormatTableValues, getPageCalculation } from "../../../Helpers/helpers";
import { PRIMARY_COLOR } from "../../../Helpers/ConstantProperties";
import FormatTwoTotalsRow from "./FormatTwoTotalsRow";
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
        {product.GSTRate && <Text style={styles.subText}>GST: {product.GSTRate}</Text>}
    </View>
);

const ItemNameCell = ({ product }) => (
    <View style={styles.itemNameCell}>
        <Text>{product.name}</Text>
        {product.productdescription && <Text style={styles.subText}>{product.productdescription}</Text>}
    </View>
);

const QtyCell = ({ product }) => (
    <View style={styles.itemNameCell}>
        <Text>{product.units}</Text>
        <Text style={styles.subText}>{product.unit}</Text>
    </View>
);

const SrNO = ({ index }) => (
    <View style={styles.itemNameCell}>
        <Text>{index}</Text>
    </View>
);

const TableCell = ({ column, product, index }) => {
    if (column.key === "productHSNcode") return <HSNCodeCell product={product} />;
    if (column.key === "name") return <ItemNameCell product={product} />;
    if (column.key === "units") return <QtyCell product={product} />;
    if (column.key === "srno") return <SrNO index={index} />;

    return column.format ? <Text>{column.format(product[column.key])}</Text> : <Text>{product[column.key]}</Text>;
};

export default function ItemsFormat({ context, page }) {
    const { cData } = context;
    const itemsPerPage = context?.selectedFormat?.pageSize ?? 0;

    const { itemsToShow, isLast } = getPageCalculation(context.selectedFormat, cData.items, page);

    if (itemsToShow.length === 0) return <NoItemItemTable styles={styles} />;

    const products = itemsToShow;
    const propList = defaultFormatTableValues;

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

                            <TableCell
                                column={column}
                                product={product}
                                index={((page) * itemsPerPage) + index + 1}
                            />
                        </View>
                    ))}

                </View>
            ))}

            <View style={{ flex: 1 }}>
            </View>

            <FormatTwoTotalsRow context={context} isLast={isLast} />
        </View>
    );
}
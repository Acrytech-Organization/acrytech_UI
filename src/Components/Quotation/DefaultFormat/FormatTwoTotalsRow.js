import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { ShowNumber } from "../../../Helpers/helpers";
import { PRIMARY_COLOR } from "../../../Helpers/ConstantProperties";

const styles = StyleSheet.create({
  totalsRow: {
    flexDirection: "row",
    backgroundColor: "#f8f9fa",
    paddingVertical: "2mm",
    width: "100%",
  },
  totalsCell: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 8,
    flexBasis: ((2 / 12) * 100) + "%"
  },
  totalsQty: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 8,
    flexBasis: ((1 / 12) * 100) + "%"
  },
  totalsAmt: {
    textAlign: "right",
    paddingRight: "1mm",
    fontSize: 8,
    flexBasis: ((1 / 12) * 100) + "%"
  },
  totalsTotal: {
    textAlign: "right",
    paddingRight: "1mm",
    fontWeight: "bold",
    fontSize: 8,
    flexBasis: ((1.5 / 12) * 100) + "%"
  },
  totalsLabel: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 8,
    color: PRIMARY_COLOR,
    flexBasis: ((6.5 / 12) * 100) + "%",
  },
});

const FormatTwoTotalsRow = ({ context, isLast }) => {
  const cData = context.cData;

  if (!isLast) {
    return (
      <View style={styles.totalsRow}>
        <Text style={{ textAlign: "right", paddingRight: "2mm", fontSize: 8, flexBasis: "100%" }}>
          Continue on next page ...
        </Text>
      </View>
    )
  }

  return (
    <View style={styles.totalsRow}>
      <Text style={styles.totalsLabel}>Total</Text>
      <Text style={styles.totalsQty}>{ShowNumber(cData.totalQuantity, false)}</Text>
      <Text style={styles.totalsCell}>{""}</Text>
      <Text style={styles.totalsAmt}>{ShowNumber(cData.totalTaxableAmount, 2, false)}</Text>
      <Text style={styles.totalsTotal}>{ShowNumber(cData.totalAmountAfterTax, 2, false)}</Text>
    </View>
  );
};

export default FormatTwoTotalsRow;

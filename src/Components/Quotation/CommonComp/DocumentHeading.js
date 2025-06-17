import { StyleSheet, Text } from "@react-pdf/renderer";
import { PRIMARY_COLOR } from "../../../Helpers/ConstantProperties";

export default function DocumentHeading({ context }) {
    const styles = StyleSheet.create({

        Headingtext: {
            fontSize: "5mm",
            color: PRIMARY_COLOR,
            textAlign: "right",
        },
    });

    return <Text style={styles.Headingtext}>{context.documentTitle}</Text>
}
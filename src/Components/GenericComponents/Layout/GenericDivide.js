import { Text, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    border: {
        borderTop: "1px solid #ccc",
        margin: 0,
        padding: 0
    }
});

export default function GenericDivider() {
    return (
        <Text style={styles.border}></Text>
    )
}
import { Text, View } from '@react-pdf/renderer';
import React from 'react';

const NoItemItemTable = ({ styles }) => {
    return (
        <View style={styles.table}>
            <View style={[styles.tableRow, { flex: 1 }]} >
                <Text style={{
                    fontSize: 20,
                    justifyContent: "center",
                    textAlign: "center",
                    flex: 1,
                    letterSpacing: 2,
                    color: "lightgray"
                }}>
                    No Items to show on this page...
                </Text>
            </View>
        </View>
    );
};

export default NoItemItemTable;
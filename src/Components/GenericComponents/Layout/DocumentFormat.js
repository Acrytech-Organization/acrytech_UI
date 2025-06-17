import { createContext, useContext } from "react";
import { DOC_BOM, DOC_OUT_CHALLAN, DOC_PO, DOC_QUOTE } from "../../../Helpers/ConstantProperties";
import { DocumentFormatContext } from "../../Contexts/DocumentFormatContext";
import { PDFViewer, Document, Page, View, Text, Font, BlobProvider } from "@react-pdf/renderer";
import { FirmContext } from "../../Contexts/FirmContext";
import { MenuItem } from "@mui/material";

export const DocumentContext = createContext({ context: null });
export const PageContext = createContext({});

function createArray(count) {
    return Array.from({ length: count }, (v, k) => k);
}

Font.register({ family: 'Roboto', src: "./Roboto-Regular.ttf" });

export default function DocumentFormat({ context }) {
    const { selectedFormat } = useContext(DocumentFormatContext);
    const { currentFirm } = useContext(FirmContext);

    const getComponent = selectedFormat.getComponent;

    let layout = selectedFormat.invoiceLayout
    if (context.document === DOC_QUOTE) layout = selectedFormat.quoteLayout;
    if (context.document === DOC_BOM) layout = selectedFormat.bomLayout;
    if (context.document === DOC_PO) layout = selectedFormat.poLayout;
    if (context.document === DOC_OUT_CHALLAN) layout = selectedFormat.outChallanLayout;

    context.selectedFormat = selectedFormat;

    const pages = createArray(context.cData?.totalPages);

    const topRows = layout.filter((row) =>
        ["Logo", "Heading", "Divider", "From", "To", "Details", "Billing", "Shipping"].some((label) =>
            row.some((item) => item.label === label)
        )
    );

    const bottomRows = layout.filter((row) =>
        ["Tax", "Total", "Words", "Bank", "Terms", "Receiver", "Sign"].some((label) =>
            row.some((item) => item.label === label)
        )
    );

    const middleRows = layout.filter((row) =>
        ["Items", "BOMItems", "ChallanItems"].some((label) =>
            row.some((item) => item.label === label)
        )
    );

    const Doc = () => (
        <Document
            style={{ fontFamily: 'Roboto' }}
            title={`${context.detailsToShow.ID || "Document"}`}>

            {pages.map((page) => {
                const isLast = pages.length - 1 === page;

                return (
                    <PageContext.Provider key={page} value={{ page: page }}>

                        <Page size={"A4"} style={{ padding: "7mm" }}>

                            {
                                topRows.map((row, rowIndex) => (
                                    <RenderRow
                                        page={page}
                                        key={`top-row-${rowIndex}`}
                                        row={row}
                                        getComponent={getComponent}
                                        currentFirm={currentFirm}
                                        context={context}
                                    />
                                ))
                            }

                            <View
                                style={{
                                    flex: 1,
                                }}
                            >
                                {
                                    middleRows.map((row, rowIndex) => (
                                        <RenderRow
                                            page={page}
                                            key={`middle-row-${rowIndex}`}
                                            row={row}
                                            getComponent={getComponent}
                                            currentFirm={currentFirm}
                                            context={context}
                                        />
                                    ))
                                }
                            </View>

                            {
                                isLast &&
                                bottomRows.map((row, rowIndex) => (
                                    <RenderRow
                                        page={page}
                                        key={`bottom-row-${rowIndex}`}
                                        row={row}
                                        getComponent={getComponent}
                                        currentFirm={currentFirm}
                                        context={context}
                                    />
                                ))
                            }

                        </Page>
                    </PageContext.Provider>
                );
            })}
        </Document>
    )

    const onClick = async (blob) => {
        if ('showSaveFilePicker' in window) {
            try {
                // Show the Save File Picker
                const handle = await window.showSaveFilePicker({
                    suggestedName: context.fileName,
                    types: [
                        {
                            description: "PDF Files",
                            accept: {
                                "application/pdf": [".pdf"],
                            },
                        },
                    ],
                });

                // Create a writable stream to write to the selected file
                const writable = await handle.createWritable();

                // Write the Blob content to the file
                await writable.write(blob);

                // Close the writable stream
                await writable.close();
            } catch (error) {
                console.error("An error occurred:", error);
            }
        } else {
            console.log('File System Access API is not supported in this browser.');
        }
    }

    if (context.save) {
        return (
            <DocumentContext.Provider value={{ context: context }}>

                <BlobProvider document={<Doc />}>

                    {(
                        { loading, blob }) => (
                        <MenuItem disabled={loading || !('showSaveFilePicker' in window)} onClick={() => onClick(blob)}>
                            {context.menuName || "Save"}
                        </MenuItem>
                    )}

                </BlobProvider>

            </DocumentContext.Provider>
        );
    }

    return (
        <DocumentContext.Provider value={{ context: context }}>
            <PDFViewer style={{ width: "100%", height: "99%" }}>
                <Doc />
            </PDFViewer>
        </DocumentContext.Provider>
    );
}

function RenderRow({ row, getComponent, currentFirm, context, page }) {
    return (
        <View
            style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
            }}
        >
            {row.map((item, itemIndex) => {

                const component = getComponent({
                    label: item.label,
                    currentFirm,
                    context,
                    page
                });

                return (
                    <View
                        key={`item-${itemIndex}`}
                        style={{
                            flexBasis: `${(item.layout?.xs || 12) / 12 * 100}%`,
                            ...item.style,
                        }}
                    >
                        {
                            component
                                ? (component)
                                : (
                                    <Text
                                        style={{
                                            borderWidth: 1,
                                            borderColor: "#e2e2e2",
                                            textAlign: "center",
                                            width: "100%",
                                        }}
                                    >
                                        {item.label}
                                    </Text>
                                )
                        }

                    </View>
                );
            })}
        </View>
    );
}


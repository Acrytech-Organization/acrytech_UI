import dayjs from 'dayjs';
import React, { useContext, useState } from 'react';
import GenericFormHeader from '../GenericComponents/FormComponent/GenericFormHeader';
import Grid2 from '@mui/material/Unstable_Grid2';
import AddProperty from '../AddProperties/AddProperty';
import { SchemaTypes } from '../../Helpers/ExtraProperties';
import { Button } from '@mui/material';
import { serviceHelpers } from '../../Helpers/ServiceHelpers';
import { FirmContext } from '../Contexts/FirmContext';
import * as xlsx from "xlsx";
import { getLocalDateString } from '../../Helpers/helpers';

const GetExcelReport = () => {
    const startOfTheLastMonth = dayjs().subtract(1, 'month').startOf('month').startOf("day");
    const endOfTheLastMonth = dayjs().subtract(1, 'month').endOf('month').endOf("day");

    const { khID } = useContext(FirmContext);

    const [startDate, setStartDate] = useState(startOfTheLastMonth);
    const [endDate, setEndDate] = useState(endOfTheLastMonth);

    const getRport = async () => {
        const results = await serviceHelpers.getInvoicesInDateRange(khID, startDate, endDate);

        const workbook = xlsx.utils.book_new();

        const data = [
            [
                "Customer Name",
                "GSTIN",
                "Invoice ID",
                "Invoice Date",
                "Taxable Amount",
                "CGST Amount",
                "SGST Amount",
                "IGST Amount",
                "Total Tax Amount",
                "Total Amount",
            ],
        ];

        results.forEach((invoice) => {
            data.push([
                invoice.cData.customerName,
                invoice.cData.gstin,
                invoice.refranceId || invoice.id,
                getLocalDateString(invoice.date),
                invoice.cData.totalTaxableAmount,
                invoice.cData.igstApp ? 0 : (invoice.cData.totalTax / 2),
                invoice.cData.igstApp ? 0 : (invoice.cData.totalTax / 2),
                invoice.cData.igstApp ? invoice.cData.totalTax : 0,
                invoice.cData.totalTax,
                invoice.cData.roundedTotal
            ]);
        })

        const worksheet = xlsx.utils.aoa_to_sheet(data);

        // Append the worksheet to the workbook
        xlsx.utils.book_append_sheet(workbook, worksheet, "Sheet1");

        // Write the workbook to a file
        xlsx.writeFile(workbook, "invoices.xlsx");
    }

    const canGate = startDate <= endDate;

    return (
        <>
            <GenericFormHeader title={"Invoice Reoprt"} enableBack={true} />
            <Grid2 container spacing={2}>
                <Grid2 xs={12} md={4}>
                    <AddProperty
                        data={{
                            item: {
                                displayName: 'Start Date',
                                name: 'documentDate',
                                required: true,
                                type: SchemaTypes.DATEPICKER,
                                helperText: 'Please Select the Date',
                            },
                            extraProps: {
                                disableFuture: true
                            }
                        }}
                        deleteField={(element) => { setStartDate(dayjs(startOfTheLastMonth)) }}
                        currentValue={startDate}
                        onChange={(e) => setStartDate(e.value)}
                    />
                </Grid2>
                <Grid2 xs={12} md={4}>
                    <AddProperty
                        data={{
                            item: {
                                displayName: 'End Date',
                                name: 'documentDate',
                                required: true,
                                type: SchemaTypes.DATEPICKER,
                                helperText: 'Please Select the Date',
                            },
                            extraProps: {
                                disableFuture: true
                            }
                        }}
                        deleteField={(element) => { setEndDate(dayjs(endOfTheLastMonth)) }}
                        currentValue={endDate}
                        onChange={(e) => setEndDate(e.value)}
                    />
                </Grid2>
                <Grid2 xs={12} md={4} textAlign={"center"} alignContent={"center"}>
                    <Button
                        onClick={getRport}
                        disabled={!canGate}
                        variant="contained"
                        color="success">
                        {"Get Report"}
                    </Button>
                </Grid2>
            </Grid2>
        </>
    );
};

export default GetExcelReport;
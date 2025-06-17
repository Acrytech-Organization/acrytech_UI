import React, { useContext } from 'react';
import { Button, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { GENERATEBOM, NOT_AVAILABLE, PRIMARY_COLOR } from '../../Helpers/ConstantProperties';
import { FirmContext } from '../Contexts/FirmContext';
import { createUPILink, numberToWords, ShowNumber } from '../../Helpers/helpers';
import { getRateDetails } from '../Quotation/RateCalculator';
import { DocumentContext } from '../GenericComponents/Layout/DocumentFormat';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const PrintButton = () => {

  const { currentFirm } = useContext(FirmContext);
  const { context } = useContext(DocumentContext);
  const source = context.inquiry.source;

  const cData = getRateDetails(
    {
      inquiry: context.inquiry,
      currentFirm: currentFirm,
      isBOM: source === GENERATEBOM
    })

  const handlePrint = () => {
    const documentDefinition = {
      pageSize: 'A4',
      pageOrientation: 'portrait',
      content: [
        {
          columns: [
            {
              width: '*',
              text: context.documentTitle,
              style: 'header',
              color: PRIMARY_COLOR,
              alignment: "center",
            },
            {
              width: 'auto',
              text: `ID: ${context.detailsToShow.ID}\n\nDate: ${context.detailsToShow.Date}`,
              alignment: 'right',
              margin: [0, 5, 0, 5],
              bold: true,
            },
          ],
          margin: [0, 0, 0, 0],
        },
        {
          canvas: [
            {
              type: 'line',
              x1: 0,
              y1: 0,
              x2: 515,
              y2: 0,
              lineWidth: 1,
              lineColor: 'black',
            },
          ],
          margin: [0, 0, 0, 10],
        },
        {
          columns: [
            {
              width: '50%',
              text: "From",
              style: 'boldText',
            },
            {
              width: '50%',
              text: "To",
              style: 'boldText',
              margin: [50, 0, 50, 0],
            },
          ],
        },
        {
          columns: [
            {
              width: '50%',
              text: currentFirm?.name,
              color: PRIMARY_COLOR,
              margin: [0, 5, 0, 5],
            },
            {
              width: '50%',
              text: context.inquiry.customerName,
              color: PRIMARY_COLOR,
              margin: [50, 5, 50, 5],
            },
          ],
        },
        {
          columns: [
            {
              width: '50%',
              text: [
                { text: 'Address: ', bold: true },
                { text: `${currentFirm?.address},\n ${currentFirm?.city}, ${currentFirm?.pincode}`, bold: false },
              ],
              style: 'wrapText',
            },
            {
              width: '50%',
              text: `City: ${context.inquiry.city}`,
              bold: true,
              margin: [50, 0, 50, 0],
            },
          ],
        },
        {
          columns: [
            {
              width: '50%',
              text: `GST Number: ${currentFirm?.gstin || NOT_AVAILABLE}`,
              alignment: 'left',
              margin: [0, 5, 0, 5],
              bold: true,
            },
            {
              width: '50%',
              text: `GST Number: ${context?.inquiry?.gstin || NOT_AVAILABLE}`,
              alignment: 'left',
              margin: [50, 5, 50, 5],
              bold: true,
            },
          ],
        },
        {
          columns: [
            {
              width: '50%',
              text: `PAN Number: ${currentFirm?.khID || NOT_AVAILABLE}`,
              alignment: 'left',
              margin: [0, 5, 0, 5],
              bold: true,
            },
            {
              width: '50%',
              text: `PAN Number: ${context.inquiry.panNumber || NOT_AVAILABLE}`,
              alignment: 'left',
              margin: [50, 5, 50, 5],
              bold: true,
            },
          ],
        },
        {
          columns: [
            {
              width: '50%',
              text: `Phone Number: ${currentFirm?.phoneNumber}`,
              alignment: 'left',
              margin: [0, 5, 0, 5],
              bold: true,
            },
            {
              width: '50%',
              text: `Phone Number: ${context.inquiry.contactPhone}`,
              alignment: 'left',
              margin: [50, 5, 50, 5],
              bold: true,
            },
          ],
        },
        {
          columns: [
            {
              width: '50%',
              text: `Email: ${currentFirm?.email}`,
              alignment: 'left',
              margin: [0, 5, 0, 5],
              bold: true,
            },
            {
              width: '50%',
              text: `Email: ${context.inquiry.contactEmail}`,
              alignment: 'left',
              margin: [50, 5, 50, 5],
              bold: true,
            },
          ],
        },
        {
          table: {
            headerRows: 1,
            widths: ['20%', '20%', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', '*'],
            body: [
              [
                { text: 'Item Code', style: 'tableHeader' },
                { text: 'Item Name', style: 'tableHeader' },
                { text: 'HSN', style: 'tableHeader' },
                { text: 'Units', style: 'tableHeader' },
                { text: 'Unit', style: 'tableHeader' },
                { text: 'Price/Unit', style: 'tableHeader' },
                { text: 'Taxable', style: 'tableHeader' },
                { text: 'GST Rate', style: 'tableHeader' },
                { text: 'Total', style: 'tableHeader' },
              ],
              ...(cData.items || []).map(product => {

                return [
                  { text: product.productItemcode || 'N/A', alignment: 'center' },
                  {
                    text: [
                      { text: `${product.name || 'N/A'}\n` },
                      { text: `(${product.productdescription || 'N/A'})`, color: PRIMARY_COLOR }
                    ],
                    alignment: 'center'
                  },
                  { text: product.productHSNcode || 'N/A', alignment: 'center' },
                  { text: product.units || 'N/A', alignment: 'center' },
                  { text: product.unit || 'N/A', alignment: 'center' },
                  { text: `${ShowNumber(product.saleRate, 2, true)}`, alignment: 'center' },
                  { text: `${ShowNumber(product.taxableAmount, 2, true)}`, alignment: 'center' },
                  { text: `${product.GSTRate}%`, alignment: 'center' },
                  { text: `${ShowNumber(product.totalAmount, 2, true)}`, alignment: 'center' },
                ];
              }),
            ],
          },
          layout: {
            hLineWidth: () => 0.2,
            vLineWidth: () => 0.2,
            hLineColor: () => '#cccccc',
            vLineColor: () => '#cccccc',
            paddingLeft: () => 5,
            paddingRight: () => 5,
            paddingTop: () => 5,
            paddingBottom: () => 5,
          },
          margin: [0, 20],
        },
        {
          columns: [
            {
              width: '60%',
              table: {
                headerRows: 1,
                widths: ['*', '*', '*'],
                body: [
                  [
                    { text: 'Tax Type', style: 'tableHeader' },
                    { text: 'Taxable Amount', style: 'tableHeader' },
                    { text: 'Tax Amount', style: 'tableHeader' },
                  ],

                  ...cData.taxTypeWiseList.map(tax => {
                    return [
                      { text: tax.type, alignment: 'center' },
                      { text: `${ShowNumber(tax.taxable, 2, true)}`, alignment: 'center' },
                      { text: `${ShowNumber(tax.tax, 2, true)}`, alignment: 'center' }
                    ]
                  })
                ],
              },
              layout: {
                hLineWidth: () => 0.2,
                vLineWidth: () => 0.2,
                hLineColor: () => '#cccccc',
                vLineColor: () => '#cccccc',
                paddingLeft: () => 5,
                paddingRight: () => 5,
                paddingTop: () => 5,
                paddingBottom: () => 5,
              },
            },
            {
              width: '40%',
              stack: [
                {
                  text: `Taxable Amount: ${ShowNumber(cData.totalTaxableAmount, 2, true)}`,
                  alignment: 'right',
                  margin: [0, 5, 0, 5]
                },
                {
                  text: `Tax Amount: ${ShowNumber(cData.totalTax, 2, true)}`,
                  alignment: 'right',
                  margin: [0, 5, 0, 5]
                },
                {
                  text: `Round-Off: ${ShowNumber(cData.roundOff, 2, true)}`,
                  alignment: 'right',
                  margin: [0, 5, 0, 5]
                },
                {
                  text: `Total Amount: ${ShowNumber(cData.roundedTotal, 2, true)}`,
                  alignment: 'right',
                  bold: true,
                  color: PRIMARY_COLOR,
                  margin: [0, 5, 0, 5]
                },
              ],
            },
          ],
        },
        {
          columns: [
            {
              text: 'Total Amount in Words:',
              alignment: 'left',
              margin: [0, 10, 0, 10],
              bold: true,
              width: 'auto'
            },
            {
              text: `${numberToWords(cData.roundedTotal)}`,
              alignment: 'left',
              margin: [5, 10, 0, 10],
              color: PRIMARY_COLOR
            },
          ]
        },
        {
          table: {
            widths: ['*', '*', '*'],
            body: [
              [
                {
                  text: 'Bank Details',
                  style: 'tableHeader',
                  fillColor: '#cfe2ff',
                  alignment: 'center'
                },
                {
                  text: 'Terms and Conditions',
                  style: 'tableHeader',
                  fillColor: '#cfe2ff',
                  alignment: 'center'
                },
                {
                  text: 'Signature',
                  style: 'tableHeader',
                  fillColor: '#cfe2ff',
                  alignment: 'center'
                },
              ],
              [
                {
                  stack: [
                    {
                      columns: [
                        ...(currentFirm.upiID ? [{ qr: createUPILink(currentFirm.upiID).toString(), fit: 70, width: 'auto' }] : []),
                        {
                          width: "75%",
                          stack: [
                            { text: `Bank Name: ${currentFirm.bankName}`, bold: true, width: "*", margin: [5, 0, 5, 0] },
                            { text: `Account Number: ${currentFirm.accountNo}`, bold: true, width: "*", margin: [5, 0, 5, 0] },
                            { text: `IFSC Code: ${currentFirm.ifscCode}`, bold: true, width: "*", margin: [5, 0, 5, 0] }
                          ],
                        },
                      ],
                      columnGap: 1
                    }
                  ],
                },
                {
                  stack: [
                    { text: `Payment: ${context.inquiry.paymentTerms}`, bold: true, margin: [0, 0, 0, 5] },
                    { text: `Transport: ${context.inquiry.transportTerms}`, bold: true, margin: [0, 5, 0, 5] },
                    context.inquiry.otherTnC !== undefined ?
                      { text: `Others: ${context.inquiry.otherTnC}`, bold: true, margin: [0, 5, 0, 5] } : null
                  ],
                },
                {
                  stack: [
                    { text: `From: ${currentFirm.name}`, bold: true, margin: [0, 0, 0, 20] },
                    { text: 'Authorized Signatory', margin: [0, 20, 0, 0], bold: true },
                  ],
                  alignment: 'center',
                },
              ]
            ]
          },
          layout: {
            hLineWidth: () => 0.2,
            vLineWidth: () => 0.2,
            hLineColor: () => '#cccccc',
            vLineColor: () => '#cccccc',
            paddingLeft: () => 5,
            paddingRight: () => 5,
            paddingTop: () => 5,
            paddingBottom: () => 5,
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          marginBottom: 20,
        },
        boldText: {
          fontSize: 8,
          bold: true,
        },
        normalText: {
          fontSize: 8,
        },
        tableHeader: {
          bold: true,
          fillColor: "#cfe2ff",
          color: 'black',
          fontSize: 8,
          alignment: 'center',
          margin: [0, 2],
        },
        wrapText: {
          alignment: 'left',
          margin: [0, 0, 0, 5],
          fontSize: 8,
        },
      },
      defaultStyle: {
        fontSize: 8,
        margin: [0, 5],
      },
    };

    pdfMake.createPdf(documentDefinition).download(`${context.inquiry.customerName}_${context.documentTitle}`);
  };

  return (
    <Grid2>
      <Button
        variant="contained"
        color="success"
        startIcon={<SaveRoundedIcon fontSize='small' />}
        onClick={handlePrint}
        sx={{
          whiteSpace: 'nowrap',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography fontSize='small' variant='subtitle2'>Save</Typography>
      </Button>
    </Grid2>
  );
};

export default PrintButton;
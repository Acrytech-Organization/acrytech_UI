import React, { useContext } from 'react';
import { Button, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import html2canvas from 'html2canvas';
import LocalPrintshopRoundedIcon from '@mui/icons-material/LocalPrintshopRounded';
import { DocumentContext } from '../Layout/DocumentFormat';

const PrintButton = () => {

    const { context } = useContext(DocumentContext);
    const componentRef = context.componentRef;

  const toggleElementsVisibility = (selectors, display) => {
    document.querySelectorAll(selectors).forEach(el => {
      el.style.display = display;
    });
  };

  const handlePrint = async () => {
    try {
      toggleElementsVisibility('.no-print', 'none');

      const canvas = await html2canvas(componentRef.current, { useCORS: true, scale: 2 });
      const imgData = canvas.toDataURL('image/png');

      const iframe = document.createElement('iframe');
      iframe.style.position = 'fixed';
      iframe.style.right = '0';
      iframe.style.bottom = '0';
      iframe.style.width = '0';
      iframe.style.height = '0';
      iframe.style.border = 'none';
      document.body.appendChild(iframe);

      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
      iframeDoc.open();
      iframeDoc.write(`
        <html>
          <head><title>Print</title></head>
          <body>
            <img src="${imgData}" style="width:100%;" />
          </body>
        </html>
      `);
      iframeDoc.close();

      iframe.onload = () => {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();

        iframe.contentWindow.onafterprint = () => {
          document.body.removeChild(iframe);
        };
      };

      toggleElementsVisibility('.no-print', '');
    } catch (error) {
      console.error('Error generating content for printing:', error);
    }
  };

  return (
    <Grid2>
      <Button
        variant="contained"
        color="info"
        startIcon={<LocalPrintshopRoundedIcon fontSize="small" />}
        onClick={handlePrint}
        sx={{ whiteSpace: 'nowrap', display: 'flex', alignItems: 'center' }}
      >
        <Typography fontSize="small" variant="subtitle2">
          Print
        </Typography>
      </Button>
    </Grid2>
  );
};

export default PrintButton;

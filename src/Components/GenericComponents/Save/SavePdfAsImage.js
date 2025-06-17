import React from 'react';
import { Button } from '@mui/material';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import DownloadIcon from '@mui/icons-material/Download';

const SavePdfAsImage = ({ componentRef, fileName, buttonText = 'Save as PDF' }) => {
  const toggleElementsVisibility = (selectors, display) => {
    document.querySelectorAll(selectors).forEach(el => {
      el.style.display = display;
    });
  };

  const handleSaveAsPDF = async () => {
    try {
      toggleElementsVisibility('.no-print', 'none');
      const canvas = await html2canvas(componentRef.current, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgHeight = (canvas.height * 210) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, 210, imgHeight);

      pdf.save(`${fileName}.pdf`);
      toggleElementsVisibility('.no-print', '');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <Button
      variant="contained"
      color="info"
      startIcon={<DownloadIcon fontSize="small" />}
      onClick={handleSaveAsPDF}
    >
      {buttonText}
    </Button>
  );
};

export default SavePdfAsImage;

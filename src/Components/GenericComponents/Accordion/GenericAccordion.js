import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const GenericAccordion = ({ name, AccordionComponent }) => {
    return (
        <>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    {name}
                </AccordionSummary>
                <AccordionDetails >
                    {
                        AccordionComponent
                    }
                </AccordionDetails>
            </Accordion>
        </>
    )
}
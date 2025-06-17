import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { CATEGORIES, checkValue, getLocalDateString } from "../../Helpers/helpers";
import { GenericAccordion } from "../GenericComponents/Accordion/GenericAccordion";
import { InquiryGridItem } from "./InquiryGridItem";
import { Box, Typography } from "@mui/material";
import { commonFontSize, commonFontWeight, regularFontSize } from "../../Helpers/ConstantProperties";
import { InquiryRejectionObj } from "../../Helpers/ExtraProperties";
import LaunchIcon from '@mui/icons-material/Launch';

export const InquiryDetailBody = ({ item }) => {
    const statusCategory = CATEGORIES[item.status] ? CATEGORIES[item.status]?.name : InquiryRejectionObj.name;

    let description = (item.description && item.description !== "") ? true : false;

    return (
        <Grid2 className="px-2">

            <Grid2 container paddingY={1} width={'100%'}>

                <InquiryGridItem
                    sm={4}
                    xs={12}
                    title={'Contact Person'}
                    value={checkValue(item.contactPerson)} />

                <InquiryGridItem
                    sm={4}
                    xs={12}
                    title={'Contact No'}
                    value={item.contactPhone} />

                <InquiryGridItem
                    sm={4}
                    xs={12}
                    title={'City'}
                    value={checkValue(item.city)} />

            </Grid2>

            <Grid2 container paddingY={1} width={'100%'}>

                <InquiryGridItem
                    sm={4}
                    xs={12}
                    title={'Last Update'}
                    value={getLocalDateString(item.lastUpdated)} />

                <InquiryGridItem
                    sm={4}
                    xs={12}
                    title={'Next Follow Up'}
                    value={getLocalDateString(item.followUpDate)} />

                <InquiryGridItem
                    sm={4}
                    xs={12}
                    title={'Design Link'}
                    value={
                        item.designUrl ?
                            <Grid2 className="">
                                <a href={item.designUrl} target="blank">
                                    <LaunchIcon />
                                </a>
                            </Grid2>
                            : "Not Available"
                    } />

            </Grid2>

            <Grid2 container paddingY={1} width={'100%'}>
                <InquiryGridItem
                    sm={4}
                    xs={12}
                    title={'Stage'}
                    value={checkValue(statusCategory)} />

                <InquiryGridItem
                    sm={4}
                    xs={12}
                    title={'PO Number'}
                    value={checkValue(item.poNumber)} />

                <InquiryGridItem
                    sm={4}
                    xs={12}
                    title={'PO Date'}
                    value={getLocalDateString(item.poDate)} />

            </Grid2>

            <Grid2 className={"d-block d-sm-none"}>
                <GenericAccordion
                    name={
                        <Typography fontWeight={commonFontWeight} fontSize={regularFontSize}>Contact Details</Typography>
                    }
                    AccordionComponent={
                        <Grid2 container className="d-flex justify-content-between" >
                            <InquiryGridItem xs={6} title={'Contact No'} value={item.contactPhone} />
                            <InquiryGridItem xs={6} title={'E-mail ID'} value={item.contactEmail} />
                        </Grid2>
                    }
                />
            </Grid2>
            <Grid2>
                {description && (
                    <Grid2 className={"d-block d-sm-none"}>
                        <GenericAccordion
                            name={
                                <Typography fontWeight={commonFontWeight} fontSize={regularFontSize}>Description</Typography>}
                            AccordionComponent={
                                <Box >
                                    <Typography sx={{ fontSize: commonFontSize }} fontWeight={commonFontWeight} className="text-break" >
                                        {item.description}
                                    </Typography>
                                </Box>

                            }
                        />
                    </Grid2>
                )}
            </Grid2>

            <Grid2>
                {description && (
                    <Grid2 className={"d-none d-sm-block"}>
                        <Typography fontSize={regularFontSize} fontWeight={commonFontWeight} className='mb-1'>
                            Description
                        </Typography>
                        <Typography
                            sx={{ fontSize: commonFontSize }}
                            fontWeight={commonFontWeight - 200}
                            className="text-break display-linebreak pb-2">
                            {item.description}
                        </Typography>
                    </Grid2>
                )}

            </Grid2>

        </Grid2>
    )
}
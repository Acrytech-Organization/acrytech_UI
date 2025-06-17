import { Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2"
import { BLUE_BUTTON, commonFontSize, commonFontWeight, largeFontSize, regularFontSize } from "../../Helpers/ConstantProperties"
import { GenericAccordion } from "../GenericComponents/Accordion/GenericAccordion";
import { RequirementCard } from "./RequirementCard";
import { GridField } from "./StockDashboardCard";
import { RequirementDialogHeaderInfo } from "./RequirementDialogHeaderInfo";
import { GenericActionControl } from "../GenericComponents/Buttons/GenericActionControl";
import { checkValue } from "../../Helpers/helpers";
import { serviceHelpers } from "../../Helpers/ServiceHelpers";

export const ProductDialog = (
    {
        data,
        heading,
        productType,
        getProductArray,
        getValue,
        AccordionName,
        buttonText,
        inValidateQueryKey,
        navigateOnCancel,
        onCancel,
        successMessage,
        productBalanceObject,
        disabled,
        showDialogHeader = false,
        ActionComponent,
        reqPropName,
        RenderedComponent = RequirementCard
    }
) => {
    const queryFunction = async (khID, data) => {
        var result = await serviceHelpers.ReleaseMaterial(
            khID,
            data,
            reqPropName);
        return result;
    }

    return (
        <Grid2 container className="justify-content-around">
            {
                showDialogHeader && <RequirementDialogHeaderInfo
                    item={data}
                />}
            {/* Dialog Header */}
            <Grid2 lg={12} className="mt-2 bg-primary-subtle" sx={{ width: "100%", paddingX: '2', display: { xs: 'none', md: 'flex' }, gap: '2' }}>
                <Grid2 sx={{ padding: commonFontSize }} className="flex-grow-1 " lg={2}>
                    <Typography fontSize={commonFontSize} fontWeight={commonFontWeight} sx={{ borderRight: commonFontSize, textAlign: 'center', borderColor: 'white' }}>Product Name</Typography>
                </Grid2>
                {
                    heading.map((element, index) => {
                        return (
                            <Grid2 key={index} sx={{ padding: commonFontSize }} className="flex-grow-1" lg={element.lg}>
                                <Typography fontSize={commonFontSize} fontWeight={commonFontWeight} sx={{ borderRight: commonFontSize, textAlign: 'center', borderColor: 'white' }}>{element.label}</Typography>
                            </Grid2>
                        )
                    })
                }
            </Grid2>
            {/* heading */}
            <Grid2 lg={12} sx={{ display: { xs: 'none', md: 'block' } }} >
                {
                    data?.products?.map((element, index) => {
                        return <RenderedComponent key={index} heading={heading}
                            getProductArray={getProductArray}
                            getValue={getValue}
                            productType={productType}
                            item={element}
                            productBalanceObject={productBalanceObject}
                            ActionComponent={ActionComponent}
                            data={data}
                        />
                    })
                }
            </Grid2>
            {/* body at large screen */}
            <Grid2 className="mt-2" sx={{ display: { xs: 'block', md: 'none' }, width: '100%' }}>
                {
                    data?.products?.map((element, index) => {
                        return (
                            <Grid2 key={index} sx={{ display: { xs: 'flex' }, flexDirection: 'column' }} className="border border-1 p-1 p-sm-0 mb-2">
                                <Grid2 sx={{ padding: commonFontSize }} className="p-1 flex-grow-1 d-flex">
                                    <Typography sx={{ borderRight: commonFontSize, textAlign: 'center', fontSize: largeFontSize, color: BLUE_BUTTON }} >{element.product.name}</Typography>
                                </Grid2>
                                <Grid2 className="pb-1">
                                    <GridField
                                        label={"Product Code"}
                                        value={checkValue(element?.product?.productItemcode)}
                                    />
                                </Grid2>
                                <GenericAccordion
                                    name={
                                        <Typography fontWeight={commonFontWeight} fontSize={regularFontSize}>{AccordionName}</Typography>
                                    }
                                    AccordionComponent={
                                        <RenderedComponent ActionComponent={ActionComponent} productBalanceObject={productBalanceObject} heading={heading} getProductArray={getProductArray} getValue={getValue} productType={productType} item={element} data={data} />
                                    }
                                />
                            </Grid2>
                        )
                    })}
            </Grid2>
            {/* body at the small screen */}
            <Grid2 className="mt-2" >
                <GenericActionControl
                    buttonText={buttonText}
                    inValidateQueryKey={inValidateQueryKey}
                    navigateOnCancel={navigateOnCancel}
                    onCancel={onCancel}
                    queryFunction={async (khID) => {
                        let res = await queryFunction(khID, data)
                        onCancel()
                        return res;
                    }}
                    successMessage={successMessage}
                    disabled={disabled}
                />
            </Grid2>
            {/* that is Release or Cancel button */}
        </Grid2>
    )
}
import React, { useContext, useState } from "react";
import { CircularProgress, Typography } from '@mui/material';
import GenericProductList from "../GenericComponents/Body/GenericProductList";
import { BALANCE, commonFontSize, INQUIRY_STORE_ACCOUNT_ID, PRODUCT_TYPE_RAW, UPDATE_ON_INQUIRY, UPDATE_ON_PRODUCT } from "../../Helpers/ConstantProperties";
import { checkValue, SMALL_SCREEN, useScreenSize } from "../../Helpers/helpers";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import GenericDialog from "../GenericComponents/Dialog/GenericDialog";
import { ProductDialog } from "./ProductDialog";
import { RequirementReleaseComponent } from "./RequirementReleaseComponent";
import { useQuery } from "@tanstack/react-query";
import { serviceHelpers } from "../../Helpers/ServiceHelpers";
import { FirmContext } from "../Contexts/FirmContext";
import { AuthContext } from "../Auth/Auth";
import { GenericErrorComponent } from "../GenericComponents/FormComponent/GenericAlertComponent";
import { PRODUCT_TAG } from "../../Helpers/ExtraProperties";

export const GridField = ({ label, value, RenderMediumScreenComponent }) => {
    return (<>
        <Grid2 sx={{ display: { xs: 'none', md: "flex" } }}>
            {RenderMediumScreenComponent}
        </Grid2>
        <Grid2 xs={12} sm={4} sx={{ display: { xs: 'flex', md: "none" }, padding: { xs: '0px' }, justifyContent: "space-between" }}>
            <Typography fontSize={commonFontSize} component="div" textAlign={{ sm: 'center', xs: 'left' }}>
                {label}
            </Typography>
            <Typography fontSize={commonFontSize} component="div">
                {value}
            </Typography>
        </Grid2>
    </>)
}

const StockDashboardCard = (
    {
        item,
        ReleaseButtontext,
        headings,
        successMessage,
        AccordionName,
        buttonText,
        getProductArray,
        getValue,
        inValidateQueryKey,
        navigateOnCancel,
        productType,
        ProductDialogTableTitle,
        holdproperty,
        CheckforRelease,
        reqPropName,
        nextStatus,
        note,
        RenderedComponent,
    }) => {
    const InitialState = { Component: <></>, show: false, header: "" }
    const [Dialog, OpenDialog] = useState(InitialState)
    const { uid } = useContext(AuthContext);
    const { khID } = useContext(FirmContext);

    const products = item.products ? item.products : []

    const screenSize = useScreenSize()

    if (productType === PRODUCT_TYPE_RAW) item.checked = false;

    const { data: productBalanceObject, isLoading, error } = useQuery({
        queryFn: async () => {
            return await serviceHelpers.getBalancePerInquiryAndStore(khID, {
                accountID: item.id,
                date: Date.now(),
                tag: PRODUCT_TAG,
            })
        },
        queryKey: [
            uid,
            khID,
            UPDATE_ON_INQUIRY,
            UPDATE_ON_PRODUCT,
            BALANCE,
            PRODUCT_TAG,
            INQUIRY_STORE_ACCOUNT_ID,
            item.id
        ]
    })

    if (isLoading) {
        return <CircularProgress />
    }

    if (error) {
        return <GenericErrorComponent error={error} />
    }

    var ButtonText = ReleaseButtontext

    var disableforEmptyProduct = !(products?.length > 0)
    var disable = false

    const checkReleaseObject = CheckforRelease(item, productBalanceObject.storeBalancePerProduct, productType);
    // checkforZero emptyStore
    // true true   =  true disable =>insufficient
    // false false =  true => all done
    // false true =  true =>all done
    // true false  =  false
    // Determine if the button should be disabled based on checkReleaseObject
    if (checkReleaseObject.checkforZero && checkReleaseObject.checkForEmptyStore) {
        ButtonText = "Insufficient Balance";
        disable = true;
    } else if (!checkReleaseObject.checkforZero) {
        ButtonText = "Done";
        disable = true;
    }

    // Adjust ButtonText and disable based on item[holdproperty]
    if (item[holdproperty]) {
        // If the item is held
        ButtonText = ReleaseButtontext + " Hold";
        disable = true;
    } else {
        if (!disable) {
            ButtonText = ReleaseButtontext;
        }
    }


    const handleComponent = (showDialog, Component, header) => {
        OpenDialog({ Component: Component, show: showDialog, header: header })
    }

    const DialogComponent = <ProductDialog
        data={item}
        heading={headings}
        onCancel={() => OpenDialog(prev => ({ ...prev, show: false }))}
        successMessage={successMessage}
        AccordionName={AccordionName}
        buttonText={buttonText}
        getProductArray={getProductArray}
        reqPropName={reqPropName}
        note={note}
        nextStatus={nextStatus}
        getValue={getValue}
        inValidateQueryKey={inValidateQueryKey}
        navigateOnCancel={navigateOnCancel}
        productType={productType}
        productBalanceObject={productBalanceObject.balancePerInquiry}
        disabled={disable || disableforEmptyProduct}
        RenderedComponent={RenderedComponent}
    />

    const productionData = [
        {
            key: 'OrderNo',
            gridSizes: { xs: 12, sm: 6, md: 1 },
            render: (data) => <GridField
                label={"Order Number"}
                value={data.orderNo || '12345'}
                RenderMediumScreenComponent={
                    <Typography sx={{ textAlign: { xs: 'start', md: 'center' }, fontWeight: '1rem' }} fontSize={commonFontSize}>
                        {data.orderNo || '12345'}
                    </Typography>
                }
            />
        },
        {
            key: 'poNo',
            gridSizes: { xs: 12, sm: 6, md: 1 },
            render: (data) => <GridField
                label={"PO Number"}
                value={data.orderNo || '12345'}
                RenderMediumScreenComponent={
                    <Typography sx={{ textAlign: { xs: 'start', md: 'center' } }} fontSize={commonFontSize}>
                        {data.poNo || 'PO-12345'}
                    </Typography>
                }
            />
        },
        {
            key: 'products',
            gridSizes: { xs: 12, sm: 6, md: 1.5 },
            render: () =>
                <GridField
                    label={"Products"}
                    value={products.length > 0 ? `${checkValue(products[0]?.product.name)}${products.length > 1 ? `, +${products.length - 1}` : ""}`: "N/A"}
                    RenderMediumScreenComponent={
                        <GenericProductList products={item.products || []} />
                    }
                />
        },
        {
            key: 'Release',
            gridSizes: { xs: 6, sm: 6, md: 2.5 },
            render: () =>
                <GridField
                    label={<RequirementReleaseComponent
                        OpenDialog={(value) => handleComponent(value, DialogComponent, ProductDialogTableTitle)}
                        Dialog={Dialog.show}
                        ReleaseButtontext={ButtonText}
                        productBalanceObject={productBalanceObject.balancePerInquiry}
                        disable={disable || disableforEmptyProduct}
                    />}
                    value={<></>}
                    RenderMediumScreenComponent={<RequirementReleaseComponent
                        ReleaseButtontext={ButtonText}
                        OpenDialog={(value) => handleComponent(value, DialogComponent, ProductDialogTableTitle)}
                        Dialog={Dialog.show}
                        productBalanceObject={productBalanceObject.balancePerInquiry}
                        disable={disable || disableforEmptyProduct}
                    />}
                />
        },
    ];

    if (screenSize === SMALL_SCREEN) {
        const element = productionData.splice(2, 1)[0];
        productionData.unshift(element);
    }

    return (
        <>
            {productionData.map((column, index) => {
                const { gridSizes, render } = column;
                return (
                    <Grid2
                        alignContent={"center"}
                        key={index}
                        xs={gridSizes.xs}
                        sm={gridSizes.sm}
                        md={gridSizes.md}
                        sx={column.sx || {}}
                    >
                        {render(item)}
                    </Grid2>
                );
            })}
            <GenericDialog
                content={Dialog.Component}
                open={Dialog.show}
                setOpen={(value) => OpenDialog(InitialState)}
                title={Dialog.header}
            />
        </>
    );
};

export default StockDashboardCard;

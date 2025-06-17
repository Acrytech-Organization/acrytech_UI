import React, { useState } from 'react';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { IconButton, Paper, Typography } from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { getProductionValue, getRequirementArray, productionTableDetails } from '../../../Helpers/helpers';
import GenericProductList from "../../GenericComponents/Body/GenericProductList"
import GenericDialog from '../../GenericComponents/Dialog/GenericDialog';
import { commonFontSize, PRODUCT_TYPE_PROCESS, ProductionTable, UPDATE_ON_INQUIRY, NEW_PRODUCTION } from '../../../Helpers/ConstantProperties';
import { ProductDialog } from '../../Stock/ProductDialog';
import RequirementCheckbox from '../../Stock/RequirementCheckbox';
import { useNavigate } from 'react-router-dom';

const ProductionProductsTableContent = ({ item, products = [], processes }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate()

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  const handleCancle = () => {
    navigate(NEW_PRODUCTION);
  };

  const queryFunction = async(khID,data)=>{
    navigate(NEW_PRODUCTION);
  }

  const productFields = (product) => [
    product.product.productItemcode,
    product.product.name,
    product.units,
    product.productdescription,
    <GenericProductList products={processes} />,
    product.designPath || 'Design Path',
    product.status || 'N/A',
  ];

  return (
    <>
      <Grid2 container spacing={0}>
        {products.map((product, index) => {
          const fields = productFields(product);
          return (
            <Grid2 xs={12} key={index}>
              <Paper
                elevation={0}
                className="px-auto my-0 py-2 rounded-0 mx-2"
                sx={{
                  border: { xs: 'none', sm: 'none', md: '1px solid lightgray', lg: '1px solid lightgray' },
                  borderColor: 'divider',
                }}
              >
                <Grid2 container spacing={0} alignItems="center">
                  {productionTableDetails.map((field, idx) => (
                    <Grid2 xs={12} sm={4} md={field.md} key={idx}>
                      <Typography textAlign={field.textAlign} fontSize={commonFontSize}>
                        {fields[idx]}
                      </Typography>
                    </Grid2>
                  ))}

                  <Grid2 xs={12} md={1}>
                    <IconButton
                      color="success"
                      size="small"
                      onClick={() => handleEditClick(product)}
                    >
                      <EditRoundedIcon />
                    </IconButton>
                  </Grid2>
                </Grid2>
              </Paper>
            </Grid2>
          );
        })}
      </Grid2>

      {selectedProduct && (
        <GenericDialog
          open={openDialog}
          setOpen={setOpenDialog}
          title={`Edit Product: ${selectedProduct.product.name}`}
          content={<ProductDialog
            data = {item}
            heading = {ProductionTable}
            productType = {PRODUCT_TYPE_PROCESS}
            getProductArray = {getRequirementArray}
            getValue= {getProductionValue}
            AccordionName = {"Process"}
            buttonText = "process"
            inValidateQueryKey = {UPDATE_ON_INQUIRY}
            navigateOnCancel = {handleCancle}
            onCancel = {handleCancle}
            queryFunction={queryFunction}
            successMessage = {"Process successfully added to Production"}
            productBalanceObject = {{}}
            disabled = {false}
            showDialogHeader ={false}
            ActionComponent = {RequirementCheckbox}
          />}
        />
      )}
    </>
  );
};

export default ProductionProductsTableContent;

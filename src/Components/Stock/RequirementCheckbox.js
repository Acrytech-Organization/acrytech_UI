import React from 'react';
import { Checkbox } from '@mui/material';

const RequirementCheckbox = (current, item,
  getProductArray,
  productType,
  getValue,
  heading,
  productBalanceObject,) => {
  let checked = false

  let checkedProps = {
    size: 'small',
    defaultChecked: checked ,
    current: {current},
    item: item,
    getProductArray: getProductArray,
    productType: productType,
    getValue: getValue,
    heading: heading,
    productBalanceObject: productBalanceObject,
  }
 
  return (
    <Checkbox
      {...checkedProps}
    />
  );
};

export default RequirementCheckbox;

import React from 'react'
import ResponsiveProductContent from './ResponsiveProductContent'
import { quotationRmTableValues } from '../../../Helpers/helpers'

const ResponsiveRmProductContent = ({productData}) => {
  return (
    <ResponsiveProductContent productData={productData} tableValues={quotationRmTableValues}/>
  )
}

export default ResponsiveRmProductContent
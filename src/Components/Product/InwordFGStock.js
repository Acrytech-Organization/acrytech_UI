import React from 'react';
import InwordStock from './InwordStock';
import { InwordFGPropList, PRODUCTSGROUP } from '../../Helpers/ExtraProperties';

const InwordFGStock = () => {
    return (
        <InwordStock propName={PRODUCTSGROUP} propList={InwordFGPropList} />
    )
};

export default InwordFGStock;
import React from 'react';
import GenericTableHeading from '../GenericComponents/DataTable/GenericTableHeading';

const ProductionHeading = ({ heading }) => {
    return (
        <GenericTableHeading processData={heading} />
    );
};

export default ProductionHeading;

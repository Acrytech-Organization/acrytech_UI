import React from 'react';
import Party from './Party';
import { CREATELABOUR, UPDATE_ON_LABOUR } from '../../Helpers/ConstantProperties';
import { serviceHelpers } from '../../Helpers/ServiceHelpers';

const Labours = () => {
    return <Party
        qKey={UPDATE_ON_LABOUR}
        queryFn={serviceHelpers.getLabours}
        heading={'Labours'}
        btnText={"New Labour"}
        navigateTo={CREATELABOUR}
    />
};

export default Labours;
import React from 'react';
import { OUTWORD_CHALLAN } from '../../Helpers/ConstantProperties';
import OutChallanFormat from './OutChallanFormat';

const SaveChallan = ({ item }) => {
    if (item.type !== OUTWORD_CHALLAN) return <></>;

    return <OutChallanFormat item={item} showSave={true} />;
};

export default SaveChallan;
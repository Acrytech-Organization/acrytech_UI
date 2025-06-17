import React, {} from 'react';
import ResponsiveInquiryProductContent from '../../Inquiry/ResponsiveInquiryProductContent';
import { RequirementActionForm } from '../RequirementActionForm';

const RequirementResponsiveProductContent = ({
    startEditing,
    cancelEditing,
    clearField,
    allowActions,
    groupFieldName,
    row,
    index,
    editIndex,
    handleFieldChange,
    addButtonExtraProps,
    headingList,
    editSalerate,
    item,
    products
}) => {

    const RequirementActionComponent = <RequirementActionForm
        item={row}
        data={item}
        products={products}
    />
    return (
        <ResponsiveInquiryProductContent
            row={row}
            index={index}
            editIndex={editIndex}
            handleFieldChange={handleFieldChange}
            startEditing={startEditing}
            cancelEditing={cancelEditing}
            clearField={clearField}
            allowActions={allowActions}
            addButtonExtraProps={addButtonExtraProps}
            headingList={headingList}
            groupFieldName={groupFieldName}
            CustomActionComponent={RequirementActionComponent}
            editSalerate={editSalerate} />
    );
};

export default RequirementResponsiveProductContent;

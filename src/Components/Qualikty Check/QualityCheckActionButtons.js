import { Box } from "@mui/material";
import { FAIL, PASS, PRODUCT_TYPE_CUSTOM } from "../../Helpers/ConstantProperties";
import { useState } from "react";
import GenericDialog from "../GenericComponents/Dialog/GenericDialog";
import ProductionManagerRemark from "./ProductionManagerRemark";
import { QualityCheckActions } from "./QualityCheckActions";
import QualityCheckboxGroup from "./QualityCheckboxGroup";
import { getCheckboxOptions } from "../../Helpers/helpers";

export const QualityActionButtons = ({ item, index, inquiry }) => {
    const [dialogOpen, setDialogOpen] = useState(false);

    // toDo use custom product contant when custom product added to master
    const hasProductType = item.products[index].product?.type === PRODUCT_TYPE_CUSTOM;

    const checkboxOptions = hasProductType ? getCheckboxOptions() : [];
    const initialSelectedValues = checkboxOptions.reduce((acc, option) => {
        acc[option.value] = item.products[index].checkboxValues?.[option.value] === true;
        return acc;
    }, {});
    const [selectedValues, setSelectedValues] = useState(initialSelectedValues);

    const allChecked = checkboxOptions.every(
        (option) => selectedValues[option.value] === true
    );

    const handleCheckboxChange = (newSelectedValues) => {
        setSelectedValues(newSelectedValues);
    };

    const saveCheckboxValuesToProduct = (item) => {
        if (hasProductType) {
            item.products[index].checkboxValues = { ...selectedValues };
        }
        return item
    };

    const passDisabled = hasProductType ? !allChecked : false;

    return (
        <Box display="flex" alignItems="center" justifyContent={"center"} flexDirection={"column"}>
            {hasProductType && (
                <Box sx={{ my: 2 }}>
                    <QualityCheckboxGroup
                        options={checkboxOptions}
                        selectedValues={selectedValues}
                        onChange={handleCheckboxChange}
                    />
                </Box>
            )}
            <QualityCheckActions
                item={item}
                text={PASS}
                qualityCheck={PASS}
                index={index}
                onCancel={() => setDialogOpen(true)}
                cancelText={FAIL}
                passDisabled={passDisabled}
                saveCheckboxValues={saveCheckboxValuesToProduct}
                inquiry={inquiry}
            />
            <GenericDialog
                title={"Production Manager Remark"}
                open={dialogOpen}
                setOpen={setDialogOpen}
                content={
                    <ProductionManagerRemark
                        product={item.products[index]}
                        ActionButton={(props) => (
                            <QualityCheckActions
                                item={item}
                                index={index}
                                {...props}
                                onCancel={() => setDialogOpen(false)}
                                cancelText="Close"
                                handleOnSuccess={() => setDialogOpen(false)}
                                saveCheckboxValues={saveCheckboxValuesToProduct}
                                inquiry={inquiry}
                            />
                        )}
                    />
                }
            />
        </Box>
    );
};

import { useLocation } from "react-router-dom";
import ProductDropDown from "./ProductDropDown";

const RMDropDown = ({ props }) => {
    const location = useLocation();
    const locationProps = location.state?.extraProp;

    const inquiry = locationProps?.inquiry;

    return <ProductDropDown
        props={props}
        currentValue={props.currentValue}
        attributes={props.data.attributes}
        additionalItems={inquiry?.sfg?.map((item) => item.product)}
        getSelected={(selectedItem) => {
            props.onChange({
                name: props.data.item.name,
                value: selectedItem,
            })
        }
        }
    />
};

export default RMDropDown;
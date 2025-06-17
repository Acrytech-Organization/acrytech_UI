import InquiryProductDetails from "../Inquiry/InquiryProductDetails";
import ResponsiveRmAndProcessContent from "./ResponsiveRmAndProcessContent";

function ProductTable(props) {

    return <InquiryProductDetails
            {...props}
            allowActions={true}
            ResponsiveContentComponent={ResponsiveRmAndProcessContent}
        />
}

export default ProductTable;
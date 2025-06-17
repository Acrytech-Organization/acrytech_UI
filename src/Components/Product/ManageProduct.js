import { useContext } from 'react';
import { UPDATE_ON_PRODUCT, PRODUCTS, CREATEPRODUCT, NEW_PRODUCTS } from '../../Helpers/ConstantProperties';
import { serviceHelpers } from '../../Helpers/ServiceHelpers';
import DataView from '../GenericComponents/DataView/DataView';
import { AuthContext } from '../Auth/Auth';
import { FirmContext } from '../Contexts/FirmContext';
import DataviewList from '../GenericComponents/DataView/DataviewList';
import ProductCardComponent from './ProductCardComponent';
import { productConfig } from '../../Helpers/helpers';

export function ManageProduct({ productType, navigateTo = NEW_PRODUCTS }) {
    const { uid } = useContext(AuthContext);
    const { khID } = useContext(FirmContext);
    const queryKey = [
        uid,
        khID,
        UPDATE_ON_PRODUCT,
        PRODUCTS,
        productType
    ];

    const queryFunction = async (pageParam) => {
        return await serviceHelpers.getProducts(
            khID,
            null,
            { type: productType, sort: "createdAt", desending: true },
            pageParam
        );
    }

    const getSearchableValue = (current) => {
        return (
            current.name + " "
            + current.productHSNcode + " "
            + current.productItemcode + " "
            + current.GSTRate + " "
            + current.saleRate + " "
            + current.unit
        )
    }

    const config = productConfig[productType];

    return (
        <DataView
            routeDetails={{ heading: config.heading, subText: config.subText }}
            limitSupported={true}
            getSearchableValue={getSearchableValue}
            queryKeyParameter={queryKey}
            queryFunctionParameter={queryFunction}
            ShowElement={{ Component: ProductCardComponent }}
            searchingPlaceholder={"Search By Name, Company Name, city, phoneNumber, email"}
            DisplayComponent={DataviewList}
            routeOptions={{ type: productType, navigateTo }}
            buttonDetails={{ text: config.addButtonText, navigateTo: CREATEPRODUCT }}
        />
    );
}



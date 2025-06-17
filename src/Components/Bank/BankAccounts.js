import { useContext } from "react";
import { AuthContext } from "../Auth/Auth";
import { FirmContext } from "../Contexts/FirmContext";
import { ADD_BANK, UPDATE_BANK_ACCOUNT } from "../../Helpers/ConstantProperties";
import { BANK_ACCOUNT_TAG } from "../../Helpers/ExtraProperties";
import DataView from "../GenericComponents/DataView/DataView";
import { serviceHelpers } from "../../Helpers/ServiceHelpers";
import { BankCard } from "./BankCard";

function BankAccounts() {
    const { uid } = useContext(AuthContext);
    const { khID } = useContext(FirmContext);

    const queryKey = [
        uid,
        khID,
        UPDATE_BANK_ACCOUNT,
    ];

    const queryFunction = async (pageParam) => {
        return await serviceHelpers.getBankAccount(khID, null, { tag: BANK_ACCOUNT_TAG }, pageParam);
    }

    const getSearchableValue = (current) => {
        return (
            current.name + " " + current.bankbranch + " " + current.bankaccount + " " + current.ifsc + " " + current.upiID
        )
    }

    return (
        <DataView
            routeDetails={{ heading: 'Bank Detail' }}
            getSearchableValue={getSearchableValue}
            queryKeyParameter={queryKey}
            queryFunctionParameter={queryFunction}
            ShowElement={{ Component: BankCard }}
            buttonDetails={{ text: 'Add New Account', navigateTo: ADD_BANK }}
            searchingPlaceholder={"Search By bank name , branch , bankaccount,ifsc , upiID"}
            limitSupported={true}
        />
    )
}

export default BankAccounts;
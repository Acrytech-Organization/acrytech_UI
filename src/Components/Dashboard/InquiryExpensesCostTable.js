import React, { useContext } from "react";
import { UPDATE_ON_INQUIRY } from "../../Helpers/ConstantProperties";
import { AuthContext } from "../Auth/Auth";
import { FirmContext } from "../Contexts/FirmContext";
import { serviceHelpers } from "../../Helpers/ServiceHelpers";
import { useQuery } from "@tanstack/react-query";
import GenericSpinner from "../GenericComponents/FormComponent/GenericSpinner";
import { Paper } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import ExpensesCostCard from "./ExpensesCostCard";

const InquiryExpensesCostTable = ({ inquiry }) => {
    const { uid } = useContext(AuthContext);
    const { khID } = useContext(FirmContext);

    const queryKey = [
        uid,
        khID,
        UPDATE_ON_INQUIRY,
        inquiry.id,
        "EXPENSES TABLE"
    ];

    const queryFunction = async () => {
        return await serviceHelpers.getExpenseCostForToday(khID, inquiry);
    }

    const { data, isLoading } = useQuery({
        queryFn: queryFunction,
        queryKey: queryKey
    })

    if (isLoading) return <GenericSpinner />

    if (data) {
        return (
            <Paper elevation={1}>
                <Grid2 container>
                    {
                        data.map((item, index) => {
                            if (index === 0) return <React.Fragment key={index}></React.Fragment>

                            return (
                                <Grid2 xs={12} key={index} padding={1}>
                                    <ExpensesCostCard item={item} />
                                </Grid2>
                            )
                        })
                    }
                </Grid2>
            </Paper>
        )

    }

    return <></>
};

export default InquiryExpensesCostTable;
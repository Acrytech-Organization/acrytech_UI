import { Grid } from "@mui/material";
import { AccountsToCreate, ResourcesToCreate, userLevels } from "../../Helpers/ConstantProperties";
import VerifyKnownResource from "./VerifyKnownResource";
import { Accounts, Resources, UserRoles } from "khatavani-client";

export default function FixBreakingChange() {

    const resources = ResourcesToCreate;
    const accounts = AccountsToCreate;
    const userRoles = userLevels

    return (
        <Grid container spacing={3}>
            {
                resources.map((resource) => (
                    <Grid item xs={12} key={resource.id}>
                        <VerifyKnownResource resource={resource} endPoint={Resources()} />
                    </Grid>
                ))
            }

            {
                accounts.map((resource) => (
                    <Grid item xs={12} key={resource.id}>
                        <VerifyKnownResource resource={resource} endPoint={Accounts()} />
                    </Grid>
                ))
            }

            {
                userRoles.map((resource) => (
                    <Grid item xs={12} key={resource.id}>
                        <VerifyKnownResource resource={resource} endPoint={UserRoles()} />
                    </Grid>
                ))
            }

        </Grid>
    )
}
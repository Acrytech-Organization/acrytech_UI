import DashboardCardBody from "./DashboardCardBody"

export const DashboardDefaultCardBody = ({ item, handleDialogOpen }) => {
    return (
        <>
            <DashboardCardBody
                item={item}
                handleDialogOpen={handleDialogOpen}
            />
        </>
    )
}
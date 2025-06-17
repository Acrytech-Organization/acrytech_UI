import Grid2 from "@mui/material/Unstable_Grid2"

export const DataViewLoader = (props) => {
    const itemWidth = { xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }
    return (
        <Grid2 container >
            {props.renderData.map((item) => {
                return (
                    item?.map((element, index) => (
                        <Grid2
                            width={"100%"}
                            padding={1}
                            {...itemWidth}
                            key={index}
                        >
                            <props.Component
                                item={element}
                                context={props.context}
                                endOfList={props.data?.length === index + 1}
                            />
                        </Grid2>
                    ))
                )
            })}
        </Grid2>
    )
}
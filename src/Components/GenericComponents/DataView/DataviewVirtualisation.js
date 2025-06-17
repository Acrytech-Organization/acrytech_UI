import { Virtuoso, VirtuosoGrid } from "react-virtuoso";
import { EXTRA_LARGE_SCREEN, getDataWithSkeleton, LARGE_SCREEN, MEDIUM_SCREEN, SMALL_SCREEN, useScreenSize } from "../../../Helpers/helpers";
import React, { useRef } from "react";
import Grid2 from "@mui/material/Unstable_Grid2";
import { DataViewLoader } from "./DataViewLoader";

export const DataviewVirtualisation = (props) => {
    const ref = useRef(null)
    const screenSize = useScreenSize();
    const gridSize = 12;

    const itemWidth = { xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }
    // const DetailsElement = props.DetailsElement;
    // const showList = () => props.setSelected(undefined);

    let columnCount;

    switch (screenSize) {
        case SMALL_SCREEN:
            columnCount = gridSize / itemWidth.xs
            break;
        case MEDIUM_SCREEN:
            columnCount = gridSize / itemWidth.sm;
            break;
        case LARGE_SCREEN:
            columnCount = gridSize / itemWidth.md;
            break;
        case EXTRA_LARGE_SCREEN:
            columnCount = gridSize / itemWidth.lg;
            break;
        default:
            columnCount = gridSize / itemWidth.xl;
            break;
    }


    if (!props.showSkeleton && (!props.data || props.data.length === 0)) {
        return (
            <div className="w-100 bg-info p-2">
                No data availble to display.
            </div>
        );
    }

    var renderData = getDataWithSkeleton(props.data, props.showSkeleton, columnCount);

    // Todo 
    //Does Not Added the Detail Element Section
    //Issue At shadow Effect
    //Issue At OnClick of the Body of the Card of the prop.setSelected for showing the DetailElement

    if (props.DataViewLoader) {
        return (
            <Virtuoso
                className="d-flex flex-column gap-2"
                ref={ref}
                totalCount={props.visibleUICount}
                data={props.data || []}
                endReached={props.canFetchData ? props.fetchNextPage : undefined}
                itemContent={(index, user) => {
                    return <props.RenderComponent key={index} item={user} />
                }}
                components={{
                    List: React.forwardRef(({ style, ...props }, ref) => (
                        <Grid2
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '5px'
                            }}
                            ref={ref}
                            style={{ ...style }}
                            {...props}
                        />
                    )),
                    Footer: props.showSkeleton
                        ? () => <props.DataViewLoader
                            renderData={renderData}
                            Component={props.RenderComponent}
                            context={{}}
                            data={props.data}
                        /> : undefined,
                }}
            />
        )
    }

    return (
        <div className="flex-grow-1 overflow-auto container">
            <VirtuosoGrid
                ref={ref}
                data={props.data}
                totalCount={props.visibleUICount}
                endReached={props.canFetchData ? props.fetchNextPage : undefined}
                itemContent={(index, user) => {
                    return (
                        <props.RenderComponent
                            key={index}
                            item={user}
                            context={{}}
                            endOfList={props.data?.length === index + 1}
                        />
                    );
                }}
                components={{
                    List: React.forwardRef(({ style, ...props }, ref) => (
                        <Grid2 container
                            ref={ref}
                            style={{ ...style }}
                            {...props}
                        />
                    )),
                    Item: ({ style, ...props }) => (
                        <Grid2
                            width={"100%"}
                            padding={1}
                            {...itemWidth}
                            style={{ ...style }}
                            {...props}
                        />
                    ),
                    Footer: props.showSkeleton ? () => <DataViewLoader
                        renderData={renderData}
                        Component={props.RenderComponent}
                        context={{}}
                        data={props.data}
                    /> : undefined,
                }}
            />
        </div>
    )
}
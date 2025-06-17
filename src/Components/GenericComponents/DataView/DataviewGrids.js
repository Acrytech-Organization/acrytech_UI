import React from 'react';
import { EXTRA_LARGE_SCREEN, getDataWithSkeleton, LARGE_SCREEN, MEDIUM_SCREEN, SMALL_SCREEN, useScreenSize } from '../../../Helpers/helpers';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';


function DataviewGrids(props) {
    const { Component } = props.ShowElement;
    const screenSize = useScreenSize();
    const gridSize = 12;

    const itemWidth = { xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }

    let columnCount;

    // Here we are using breakpoints to define different layouts for 
    // --different screen sizes.
    // Grids are simply dividing the screen size into equal parts to 
    // --organize content. However, when dealing with breakpoints, we are 
    // --considering the space between two breakpoints.
    // For example, let's say we have breakpoints at 768px and 1024px. 
    // --Between these two breakpoints, we might have defined a layout where 
    // --items are displayed differently compared to when the screen size 
    // --is below 768px or above 1024px.
    // Now, when calculating the width of each item within this range 
    // --(between 768px and 1024px), the itemWidth might not be directly 
    // --proportional to the screen size. This is because we might want the items 
    // --to take up a certain percentage of the screen or a fixed width regardless 
    // --of the screen size within this range.
    // So, while the screen size might be changing fluidly, the itemWidth 
    // --might not change linearly with it. Instead, it might be based on a 
    // --predefined design choice or responsiveness strategy that fits the content
    //  --and layout requirements.
    // Therefore, the relationship between itemWidth and screen size might 
    // --appear mismatched because they are governed by different rules and constraints, 
    // --such as maintaining a certain visual balance, accommodating varying 
    // --content sizes, or optimizing for user experience across different devices.


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


    const data = getDataWithSkeleton(props.data, props.showSkeleton, columnCount);

    return (
            <Grid2 container>
                {data.map((item) => {
                    return (
                        item?.map((element, index) => (
                            <Grid2
                                width={"100%"}
                                padding={1}
                                xs={itemWidth.xs}
                                sm={itemWidth.sm}
                                md={itemWidth.md}
                                lg={itemWidth.lg}
                                xl={itemWidth.xl}
                                key={index}
                                onClick={() => props.setSelected({ element: element, index: index })} >
                                <Component
                                    item={element}
                                    context={props.context}
                                    endOfList={props.data?.length === index + 1}
                                />
                            </Grid2>
                        ))
                    )
                })}
            </Grid2>
    );
}

export default DataviewGrids;

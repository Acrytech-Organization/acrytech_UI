import React from 'react';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

function DataviewList(props) {
    return (
        <div>
            {props.renderData?.map((item) => {
                return (
                    item?.map((element, index) => (
                        <Grid2
                            width={"100%"}
                            key={index} >
                            <props.Component
                                item={element}
                                context={props.context}
                                endOfList={props.data?.length === index + 1}
                            />
                        </Grid2>
                    ))
                )
            })}
        </div >
    );
}

export default DataviewList;

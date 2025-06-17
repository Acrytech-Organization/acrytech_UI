import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from 'react';

export default function GenericTabs({ tabs, initialTabs }) {

    const [value, setValue] = useState({ index: 0, ...initialTabs });

    const handleChange = (event, newValue) => {
        setValue({ index: newValue, ...tabs[newValue] });
    };


    return (
        <Box>
            <Tabs value={value.index} onChange={handleChange}>
                {
                    tabs.map((Component, index) => {
                        return (
                            <Tab key={index} className={
                                Component.label === value.label
                                    ? "text-info text-capitalize" : "text-capitalize text-dark fw-bold"
                            } label={Component.label} />
                        )
                    })
                }
            </Tabs>
            <div className='mt-2'>
                {
                    value.Component
                }
            </div>
        </Box>
    );
}

import React, { useState } from 'react';
import { Box, MenuItem, Select, Grid } from '@mui/material';
import { useScreenSize, SMALL_SCREEN, MEDIUM_SCREEN, CATEGORIES } from '../../Helpers/helpers';
import LeadCardContent from './LeadCardContent';
import GenericHeader from '../GenericComponents/Header/GenericHeader';
import { CREATE_NEW_INQUIRY } from '../../Helpers/ConstantProperties';
import { useNavigate } from 'react-router-dom';

const LeadStatus = ({ searchString, setSearchString, leads, categories = CATEGORIES}) => {
    const screenSize = useScreenSize();
    const isTablet = screenSize === SMALL_SCREEN || screenSize === MEDIUM_SCREEN;
    const [selectedCategory, setSelectedCategory] = useState("open");
    const navigate = useNavigate()

    const handleChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const newInqNavigate = (e) => {
        navigate(CREATE_NEW_INQUIRY)
    }

    var leadList = []

    if (isTablet) {

        leadList.push({
            metadata: categories[selectedCategory],
            leads: leads[selectedCategory]
        })
    }
    else {
        Object.entries(categories).map(([KEY, VALUE]) => {
            leadList.push(
                {
                    metadata: VALUE,
                    leads: leads[KEY]
                }
            )

            return true;
        })
    }

    return (
        <>
            <GenericHeader
                title="Review Inquiries"
                textFieldLabel="Search by Company Name, Contact Person, City, Phone Number or Source of Lead"
                buttonText="New Inquiry"
                setSearchString={setSearchString}
                searchString={searchString}
                onButtonClick={newInqNavigate}
            />
            <Box sx={{ p: 2 }}>
                <Select
                    value={selectedCategory}
                    onChange={handleChange}
                    displayEmpty
                    fullWidth
                    sx={{
                        display: {
                            md: "block",
                            lg: "none"
                        }
                    }}
                >
                    <MenuItem value="">
                        <em>Select Category</em>
                    </MenuItem>
                    {Object.entries(categories).map(([KEY, VALUE]) => (
                        <MenuItem
                            key={KEY}
                            value={KEY}
                            sx={{ color: VALUE.color }}
                        >
                            {`${VALUE.name} (${leads[KEY]?.length?leads[KEY]?.length:0})`}
                        </MenuItem>
                    ))}
                </Select>

                <Grid container spacing={1} wrap="nowrap">
                    {leadList.map((category, index) => (
                        <Grid item xs={12} md={12 / 7} key={index}>
                            <LeadCardContent
                                data={category}
                                showMainCard={true} // Show main cards here
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    );
};

export default LeadStatus;
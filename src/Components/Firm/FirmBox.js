import React from 'react';
import { Card, CardHeader } from '@mui/material';
import { SECONDARY_COLOR, gradientMenuColors } from '../../Helpers/ConstantProperties';

const FirmBox = ({ firm, onClick, index }) => {

    return (
        <Card
            className="firm-box shadow"
            onClick={onClick}
            sx={{
                cursor: 'pointer',
                width: 250,
                borderRadius: 2,
                textAlign: 'center',
                '&:hover': {
                    boxShadow: 6,
                },
            }}
        >
            <CardHeader
                title={firm.name}
                subheader={`Click to join firm`}
                titleTypographyProps={{ variant: 'subtitle1' }}
                subheaderTypographyProps={{ variant: 'body2', sx: { color: SECONDARY_COLOR } }}
                sx={{
                    backgroundImage: gradientMenuColors[index % gradientMenuColors.length],
                    backgroundSize: 'cover',
                    color: SECONDARY_COLOR,
                    margin: 0,
                    paddingY: 2,
                    height: '90px',
                }}
            />
        </Card>
    );
};

export default FirmBox;
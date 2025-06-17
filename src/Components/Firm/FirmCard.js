import React from 'react';
import { Box, Card, CardContent, CardHeader, Link, Typography } from '@mui/material';
import { Language, Phone } from '@mui/icons-material';

const FirmCard = ({ title, description, website, contactNumber, navigateTo, PRIMARY_COLOR, SECONDARY_COLOR }) => {
  return (
    <Card className="shadow border-0 rounded">
      <CardHeader
        onClick={navigateTo}
        title={title}
        titleTypographyProps={{ variant: 'h4', align: 'center' }}
        sx={{
          backgroundColor: PRIMARY_COLOR,
          color: SECONDARY_COLOR,
          borderRadius: 1,
          marginBottom: 2,
          cursor: 'pointer',
        }}
      />
      <CardContent>
        <Typography variant="h6" color="textSecondary" align="center" gutterBottom>
          {description}
        </Typography>
        <Box display="flex" alignItems="center" justifyContent="center" sx={{ mb: 2 }}>
          <Language className="me-2 text-primary" />
          <Link href={website} variant="body1" color="primary" underline="hover" noWrap>
            {website}
          </Link>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center" sx={{ mb: 2 }}>
          <Phone className="me-2 text-primary" />
          <Typography variant="body1">{contactNumber}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FirmCard;

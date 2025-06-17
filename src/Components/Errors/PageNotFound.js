import { Box, Container, Link, Typography } from '@mui/material';
import React from 'react';
import pageNotFoundImg from '../../Assests/PageNotFound.png';

const PageNotFound = () => {
  return (
    <Container
      className='d-flex justify-content-center align-items-center flex-column' sx={{height: '90svh'}}>
      <Box
        className='d-flex justify-content-center align-items-center w-auto' sx={{height: '75vh'}}>
        <img
          src={pageNotFoundImg}
          alt='page not found'
          style={{
            maxHeight: '100%',
            maxWidth: '100%',
            objectFit: 'contain'
          }}
        />
      </Box>
      <Box className='d-flex flex-column justify-content-center align-items-center mt-2'>
          <Typography variant='h6' align='center' className='text-info'>
            Oops! The page you are looking for does not exist.
          </Typography>
          <Link href='/' underline='hover' sx={{ mt: 1 }}>
            Go to Home Page
          </Link>
        </Box>
    </Container>
  );
}

export default PageNotFound;

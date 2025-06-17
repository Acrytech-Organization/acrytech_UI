import React from 'react';
import { Box, TextField, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { SMALL_SCREEN, useScreenSize } from '../../../Helpers/helpers';

export function NetworkImageInput({ currentValue, props, controlProps }) {

  const handleNetworkImageChange = (e) => {
    const url = e.target.value;
    props.onChange({ name: props.data.item.name, value: url });
  };

  const ImageSizeClass = useScreenSize() === SMALL_SCREEN ? "FirmImageSmScr" : "FirmImageLgScr";

  return (
    <Grid2 container spacing={1} direction={'column'} {...props.data.attributes} p={1} width={'100%'}>
      <Typography className="fw-semibold">
        {props.data.item.displayName} {props.data.item.required ? "*" : ''}
      </Typography>
      <TextField
        className="bg-light"
        size="small"
        type="text"
        onChange={handleNetworkImageChange}
        variant="outlined"
        error={!!props.data.item.error && props.data.item.error !== ''}
        helperText={props.data.item.error}
        fullWidth
        inputProps={{
          inputMode: props.data.inputMode,
          maxLength: 1000,
          type: props.data.item.type,
          className: "form-control " + props.data.inputFieldClass,
          id: "floatingInput" + props.data.item.name,
          pattern: controlProps.pattern,
          ...controlProps,
        }}
        id={"floatingInput" + props.data.item.name}
      />
      {currentValue && (
        <Box
          mt={2}
          display={'flex'}
          justifyContent={'center'}
        >
          <Box
            p={2}
            border={1}
            borderColor="black"
          >
            <img
              src={currentValue}
              alt="img view"
              className={`${ImageSizeClass} ${props.data.item.ImageClass}`}
              style={{ width: '100%', height: 'auto' }}
            />
          </Box>
        </Box>
      )}
    </Grid2>
  );
}

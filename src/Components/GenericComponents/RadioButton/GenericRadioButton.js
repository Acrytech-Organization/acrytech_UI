import React from 'react';
import { Radio, FormControlLabel, FormControl, FormLabel, RadioGroup } from '@mui/material';

function GenericRadioButton({ options, selectedValue, onChange, data }) {
  return (
    <FormControl className='pt-2'>
      <FormLabel id={"radio" + data.item.name}>{data.item.displayName}</FormLabel>
      <RadioGroup
        aria-labelledby={"radio" + data.item.name}
        name={data.item.name}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
            checked={selectedValue === option.value}
            onChange={() => onChange(option.value)}
            className='d-block'
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

export default GenericRadioButton;

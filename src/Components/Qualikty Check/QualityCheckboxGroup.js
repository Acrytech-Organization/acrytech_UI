import React from 'react';
import { FormControl, FormControlLabel, Checkbox, FormGroup } from '@mui/material';

const QualityCheckboxGroup = ({ options, selectedValues, onChange }) => {
  const handleChange = (event, value) => {
    const newSelectedValues = {
      ...selectedValues,
      [value]: event.target.checked,
    };
    onChange(newSelectedValues);
  };

  return (
    <FormControl component="fieldset">
      <FormGroup>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            control={
              <Checkbox
                checked={selectedValues[option.value] === true}
                onChange={(event) => handleChange(event, option.value)}
                name={option.value}
              />
            }
            label={option.label}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};

export default QualityCheckboxGroup;

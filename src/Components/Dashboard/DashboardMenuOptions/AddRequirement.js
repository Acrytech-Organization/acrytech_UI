import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MenuItem } from '@mui/material';
import { GENERATE_REQUIREMENT } from '../../../Helpers/ConstantProperties';

const AddRequirement = ({ item }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(GENERATE_REQUIREMENT, { state: { item } });
  };

  return (
    <MenuItem onClick={handleClick} >Add Requirement</MenuItem>
  );
};

export default AddRequirement;
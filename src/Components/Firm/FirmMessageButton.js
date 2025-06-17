import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import DomainAddRoundedIcon from '@mui/icons-material/DomainAddRounded';
import { extraSmallFontSize, JOINFIRMMSG } from '../../Helpers/ConstantProperties';

const FirmMessageButton = ({ onClose }) => {
  const navigate = useNavigate()
  const handleSubmit = () => {
    onClose()
    navigate(JOINFIRMMSG)
  }
  return (
    <Button variant="Text" startIcon={<DomainAddRoundedIcon />} className="text-center w-100" onClick={handleSubmit} sx={{ fontSize: extraSmallFontSize }}>
      Create Firm
    </Button>
  )
}

export default FirmMessageButton
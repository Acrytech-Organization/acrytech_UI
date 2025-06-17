import { CircularProgress, TextField } from "@mui/material";

export default function GenericDropdownTextField({ params, inputLabel, loading }) {
  return (
    <TextField
    className='bg-light m-0 p-0'
    {...params}
    placeholder={inputLabel}
    InputProps={{
      ...params.InputProps,
      endAdornment: (
        <>
          {loading && (
            <CircularProgress size={25} sx={{
              animationDuration: '1s',
            }} />
          )}
          {params.InputProps.endAdornment}
        </>
      ),
    }}
    margin="normal"
  />
  )
}
  
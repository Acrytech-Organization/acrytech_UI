import { useContext } from 'react';
import { AuthContext } from '../Auth/Auth';
import GenericDropDown from '../GenericComponents/DropDown/GenericDropDown';
import { serviceHelpers } from '../../Helpers/ServiceHelpers';
import { UNASSIGNED_INQUIRY, UPDATE_ON_USER, USERS_DROPDOWN } from '../../Helpers/ConstantProperties';
import { FirmContext } from '../Contexts/FirmContext';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { InputAdornment, Typography } from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { stringToColor } from '../../Helpers/helpers';
import { CircularProgress, TextField } from "@mui/material";

function UsersDropdown({ getSelected, attributes, currentValue, props }) {
  const { uid } = useContext(AuthContext);
  const { khID } = useContext(FirmContext);

  const queryKey = [
    uid,
    khID,
    UPDATE_ON_USER,
    USERS_DROPDOWN
  ];

  const queryFunction = async () => {
    const data = await serviceHelpers.getUsers(khID);
    const filteredData = data.filter(item => item.approved === true);
    filteredData.push(UNASSIGNED_INQUIRY);
    return filteredData;
  }


  const DisplayComponent = ({ props, option }) => (
    <li {...props} key={option.id}>
      <Grid2 container alignItems="center" spacing={2} wrap="nowrap">
        <Grid2>
          <AccountCircleOutlinedIcon sx={{ color: stringToColor(option.displayName) }}/>
        </Grid2>
        <Grid2 xs={8} className="text-truncate w-100">
          <Typography
            variant="body"
            noWrap
          >
            {option.displayName}
          </Typography>
        </Grid2>
      </Grid2>
    </li>
  );


  return (
    <GenericDropDown
      hideInputLabel={true}
      currentValue={currentValue}
      attributes={attributes}
      queryKey={queryKey}
      queryFunction={queryFunction}
      // inputLabel="Select User"
      getSelected={getSelected}
      searchFilter={(option) => option.displayName}
      getOptionLabel={(option) => option.displayName}
      DisplayComponent={DisplayComponent}
      DropdownTextField={UserDropdownTextField}
      props={{
        data: {
          item: {
            required: false
          }
        }
      }}
    />
  );
}

export default UsersDropdown;

function UserDropdownTextField({ params, inputLabel, loading }) {
  return (
    <TextField
      className="m-0 p-0"
      {...params}
      placeholder={inputLabel}
      variant="standard"
      sx={{
        '& .MuiInput-underline:before': {
          borderBottom: 'none',
        },
        '& .MuiInput-underline:hover:before': {
          borderBottom: 'none',
        },
        '& .MuiInput-underline:after': {
          borderBottom: 'none',
        },
        '& .Mui-focused': {
          backgroundColor: 'transparent',
        },
        '& .MuiInputBase-root': {
          backgroundColor: 'transparent',
        },
      }}
      InputProps={{
        ...params.InputProps,
        startAdornment: (
          <InputAdornment position="start">
            <AccountCircleOutlinedIcon />
          </InputAdornment>
        ),
        endAdornment: (
          <>
            {loading && (
              <CircularProgress
                size={25}
                sx={{
                  animationDuration: '1s',
                }}
              />
            )}
            {params.InputProps.endAdornment}
          </>
        ),
      }}
      margin="normal"
    />
  );
}


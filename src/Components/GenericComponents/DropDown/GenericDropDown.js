import { useId, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import UseInfiniteQueryFunction from '../DataView/UseInfiniteQueryFunction';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Typography } from '@mui/material';
import GenericDropdownTextField from './GenericDropdownTextField';

function GenericDropDown({
  queryKey,
  queryFunction,
  getSelected,
  searchFilter,
  getOptionLabel,
  inputLabel,
  queryfilterData,
  limitSupported = true,
  DisplayComponent,
  enableAddNewValue,
  DialogContentBody,
  setInputValue,
  attributes,
  currentValue,
  freeSolo = false,
  hideInputLabel = false,
  DropdownTextField = GenericDropdownTextField,
  additionalItems = [],
  props
}) {
  const [open, setOpen] = useState(false);

  const queryFunctionParameter = async ({ pageParam = 0 }) => await queryFunction(pageParam);

  const infiniteQueryProps = {
    queryKeyParameter: queryKey,
    queryFunction: queryFunctionParameter,
    limitSupported: limitSupported,
    filterData: queryfilterData
  };

  const { data, loading, fetchNextPage, canFetchData, fetchOnScroll } = UseInfiniteQueryFunction(infiniteQueryProps);
  const id = useId();
  const handleInputChange = (options, value) => {
    const filteredOptions = options?.filter(item =>
      searchFilter(item).toLowerCase().includes(value.inputValue.toLowerCase())
    );
    if (filteredOptions.length === 0 && canFetchData) {
      fetchNextPage();
    }
    if (value.inputValue !== '' && enableAddNewValue && filteredOptions.length === 0 && !canFetchData) {
      filteredOptions.push({
        id: id,
        openDialog: true,
        name: `Add "${value.inputValue}"`,
        inputValue: value.inputValue
      });
    }
    return filteredOptions;
  };

  const extraProps = setInputValue ? {
    onInputChange: (event, newInputValue) => setInputValue(newInputValue)
  } : {};

  //if free solo is on, the autocomplete is using its own input
  //else the its uses value of renderInput
  //input value is the value from user and value is selected value
  if (freeSolo) {
    extraProps.inputValue = currentValue?.name || ''
  }

  if (data) {
    data.push(...additionalItems);
  }

  return (
    <Grid2 spacing={1} container direction={'column'} p={1} {...attributes} width={'100%'}>
      {!hideInputLabel && <Grid2>
        <Typography className="fw-semibold">
          {inputLabel}
        </Typography>
      </Grid2>}
      <Grid2 >
        <Autocomplete
          size="small"
          className='m-0 p-0'
          fullWidth
          isOptionEqualToValue={(option, value) => option.id === value.id}
          freeSolo={freeSolo}
          open={open}
          {...extraProps}
          selectOnFocus
          getOptionDisabled={(() => props.data.item.disableList)}
          value={currentValue}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          getOptionLabel={getOptionLabel}
          filterOptions={handleInputChange}
          options={data || []}
          onChange={(event, newValue) => getSelected(newValue)}
          ListboxProps={{ onScroll: fetchOnScroll }}
          renderOption={(props, option) => <DisplayComponent
            props={props}
            key={option.id}
            option={option}
          />}
          renderInput={(params) => {
            if (props.data.item.required) {
              params.inputProps.required = true
              params.inputProps.className += params.inputProps.className + " form-control"
            }
            params.inputProps.value = params.inputProps.value.trim() !== "" ? params.inputProps.value : "";
            return (<DropdownTextField
              params={params}
              inputLabel={inputLabel}
              loading={loading}
            />)
          }}
        />
        {DialogContentBody}
      </Grid2>
    </Grid2>

  );
}

export default GenericDropDown;
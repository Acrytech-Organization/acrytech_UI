import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
import GenericSpinner from "../FormComponent/GenericSpinner";
import CloseIcon from '@mui/icons-material/Close';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import AddProperty from "../../AddProperties/AddProperty";

function DropdownDialogComponent(props) {

  const queryClient = useQueryClient();
  const { isPending, error, data, mutate, reset } = useMutation({
    mutationFn: props.queryFunction,

    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes(props.queryKeyValue),
      });
      handleClose();
    }
  });

  const handleClose = () => {
    props.handleClose();
    reset();
  };

  const displayInput = !isPending && !error && data;

  return (
    <Dialog open={props.openDialog} onClose={handleClose}>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>

      <form noValidate>
        <DialogTitle>Add a new Source</DialogTitle>
        <DialogContent>
          {isPending && <GenericSpinner />}

          {error && <Alert severity="error">{error}</Alert>}

          {data && (
            <Alert severity="success">
              {data?.id}
            </Alert>
          )}

          {!displayInput && (
            props.propertyList.map((data, index) => {
              return (
                <AddProperty
                  key={index}
                  data={data}
                  currentValue={props.dialogValue.inputValue || ""}
                  onChange={props.handleChange}
                  disabled = {true}
                />
              );
            }))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={()=>{ mutate()}}>Add</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default DropdownDialogComponent;
import { useReducer, useRef } from "react";
import AddProperty from "./AddProperty";
import { ADD_PROPS_TYPE, checkValidity, formReducer, REMOVE_PROPS } from "../../Helpers/helpers";
import { Button } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

export function AddPropertyGroups(props) {
    const [state, dispatch] = useReducer(formReducer, {});
    const divRef = useRef()
    const onChange = (e, data) => {
        var obj = { type: ADD_PROPS_TYPE, payload: e }

        if (data.manageState) {
            obj.afterDispatch = props.afterDispatch;
            obj.propList = props.propList;
            obj.propType = data.item.type
        }

        dispatch(obj);
    };

    const handleSubmit = () => {
        let isValid = checkValidity(divRef.current,
            '#groupId input[required], #groupId textarea[required], #groupId select[required]');
        if (isValid) {
            props.onChange(state);
            dispatch({ type: REMOVE_PROPS })
        }
    }
    //groupId for accessing the container of the specific id 
    return (
        <Grid2 container
            {...props.data.attributes}
            width={'100%'}
            id="groupId"
            flexDirection={'column'}
            ref={divRef}
            spacing={0}
        >
            <Grid2 container spacing={0}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                {props.propList.map((element, index) => {
                    return (
                        <AddProperty
                            deleteField={props.deleteField}
                            required={props.required}
                            key={index}
                            state={state}
                            data={element}
                            currentValue={state[element.item.name] ? state[element.item.name] : null}
                            onChange={(e) => onChange(e, element)}
                        />
                    );
                })}

                <Button variant="contained"
                    color="success"
                    sx={{
                        marginTop: {
                            xs: "0.3125rem",
                            sm: "1.875rem",
                            lg: "2.0625rem",
                        },
                        marginBottom: {
                            xs: "0.625rem",
                            sm: "0.125rem",
                            lg: "0.3125rem",
                        },
                    }}
                    onClick={handleSubmit}
                >
                    +
                </Button>
            </Grid2>

            <Grid2>
                {props.GroupDetailsComponent}
            </Grid2>
        </Grid2>

    );
}

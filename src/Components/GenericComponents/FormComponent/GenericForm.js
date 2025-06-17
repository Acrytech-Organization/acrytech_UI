import React, { useId, useReducer, useRef } from 'react';
import { ADD_GROUP_PROPS, ADD_PROPS_TYPE, deepCopyObject, FileReducer, formReducer, REMOVE_GROUP_PROPS, REMOVE_ITEM_FILEDATA, REMOVE_PROPS, REMOVE_PROPS_TYPE, UPDATE_GROUP_PROPS_TYPE } from '../../../Helpers/helpers';
import AddProperty from '../../AddProperties/AddProperty';
import { HandleFormButton } from './HandleFormButton';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { SchemaTypes } from '../../../Helpers/ExtraProperties';
import CenteredPaper from '../Layout/CenteredPaper';
import GenericFormHeader from './GenericFormHeader';
import { AddPropertyGroups } from '../../AddProperties/AddPropertyGroups';
import { Typography } from '@mui/material';
import DetailPaneWithDropdown from '../Layout/DetailPaneWithDropdown';


const GenericForm = ({
    queryFunction,
    queryKeyValue,
    ErrorComponent,
    SuccessComponent,
    navigateOnSuccess,
    GroupDetailsComponent,
    formClass = " pb-2 pt-2 m-sm-1 m-md-0 text-dark bg-opacity-10 rounded-2  ",
    addButtonText,
    navigateTo,
    handleCancel,
    buttonClasses,
    enableVerify = false,
    VerifyAlertComponent = undefined,
    formTitle,
    propertyList,
    propertyListWithGrids,
    currentData,
    CustomButtonComponent = undefined,
    clearButtonText = 'Clear',
    enableClear = false,
    showAlertDialog,
    enableBack,//for enabling the back button for the form
    displayGroupWithProp = false,
    displayPane = false,
    paneID,
    afterDispatch = () => { }
    //through that method u have access of changing the state with the any value input , dropdown etc..
}) => {
    const [state, dispatch] = useReducer(formReducer, currentData);
    const [file, setfile] = useReducer(FileReducer, []);
    const formRef = useRef();
    const id = useId()

    const handleDelete = (element, data) => {
        if (
            data.item.type === SchemaTypes.IMAGE
            || data.item.type === SchemaTypes.file) {
            setfile({ type: REMOVE_ITEM_FILEDATA, element });
        } else {
            dispatch({ type: REMOVE_PROPS_TYPE, payload: data.item.name });
        }
    }

    const handleClear = () => {
        dispatch({ type: REMOVE_PROPS });
    }

    const Onchange = (e, data) => {
        switch (data.item.type) {
            case SchemaTypes.IMAGE || SchemaTypes.file:
                setfile({
                    type: data.item.type,
                    payload: { e: e, name: data.item.name }
                });
                break;
            default:
                var obj = { type: ADD_PROPS_TYPE, payload: e }

                if (data.manageState) {
                    obj.afterDispatch = afterDispatch;
                    obj.propList = propertyList;
                    obj.propType = data.item.type
                }

                dispatch(obj);
        }

    }

    const GetCurrentValue = (data) => {
        if (
            data.item.type === SchemaTypes.IMAGE
            || data.item.type === SchemaTypes.file) {
            return file.find(item => item.name === data.item.name);
        } else {
            return state[data.item.name] ? state[data.item.name] : null
        }
    }

    const mutationQueryFunction = async (khID = null) => {
        return await queryFunction(state, khID, file)
    }

    var gridDisrtibution = [{
        attributes: {
            lg: 12
        },
        list: propertyList
    }];

    if (propertyListWithGrids) {
        gridDisrtibution = propertyListWithGrids;
    }

    const clearField = (propName, index) =>
        dispatch({
            type: REMOVE_GROUP_PROPS,
            name: propName,
            index: index
        })

    const editProp = (e, propName, index, groupName) =>
        dispatch({
            type: UPDATE_GROUP_PROPS_TYPE,
            payload: {
                name: propName,
                index: index,
                value: e,
                groupName: groupName
            }
        })

    const tabPanels = [];

    if (displayPane) {
        gridDisrtibution.forEach((item, i) => {
            item.list.forEach((data, index) => {
                if (data.tabId) {
                    tabPanels.push({
                        id: data.tabId, name: data.groupName, Component: () => <AddPropertyGroups key={index}
                            deleteField={(element) => handleDelete(element)}
                            propList={deepCopyObject(data.group)}
                            data={data}
                            state={state}
                            afterDispatch={afterDispatch}
                            formRef={formRef}
                            onChange={(e) => {
                                dispatch({
                                    type: ADD_GROUP_PROPS,
                                    payload: {
                                        name: data.groupName,
                                        value: e,
                                        uniqueIdProp: data.uniqueIdProp
                                    },
                                });
                            }}
                            GroupDetailsComponent={GroupDetailsComponent && (
                                <GroupDetailsComponent
                                    groupName={data.groupName}
                                    data={state}
                                    clearField={clearField}
                                    editProp={editProp}
                                />
                            )}
                        />
                    })
                }
            });
        });
    }

    return (
        <div>
            <GenericFormHeader title={formTitle} enableBack={enableBack} />
            <CenteredPaper>
                <div
                    id={id}
                    ref={formRef}
                    className={"needs-validation " + formClass}
                >
                    <Grid2 container display='flex' className='navbar-nav-scroll'>
                        {gridDisrtibution.map((item, i) => <Grid2 container {...item.attributes} key={i} width={'100%'}>
                            {item.list.map((data, index) => {
                                if (data.warningMsg) {
                                    return (
                                        <Grid2
                                            key={index}
                                            container
                                            {...data.attributes}
                                            width="100%"
                                            id="groupId"
                                            flexDirection="column"
                                            spacing={0}
                                        >
                                            <Typography {...data.extraProps}>
                                                {data.warningMsg}
                                            </Typography>
                                        </Grid2>
                                    );
                                }

                                if (!data.groupName) {
                                    return (
                                        <AddProperty
                                            deleteField={(element) => {
                                                handleDelete(element, data);
                                            }}
                                            key={index}
                                            data={data}
                                            currentValue={GetCurrentValue(data)}
                                            state={state}
                                            onChange={(e) => {
                                                Onchange(e, data)
                                            }}
                                        />
                                    )
                                }

                                if (data.tabId) return <React.Fragment key={index}></React.Fragment>

                                return (
                                    <React.Fragment key={data.groupName}>
                                        <AddPropertyGroups
                                            deleteField={(element) => handleDelete(element)}
                                            propList={deepCopyObject(data.group)}
                                            data={data}
                                            state={state}
                                            afterDispatch={afterDispatch}
                                            formRef={formRef}
                                            onChange={(e) => {
                                                dispatch({ type: ADD_GROUP_PROPS, payload: { name: data.groupName, value: e, uniqueIdProp: data.uniqueIdProp } });
                                            }}
                                            GroupDetailsComponent={GroupDetailsComponent && displayGroupWithProp && <GroupDetailsComponent
                                                groupName={data.groupName}
                                                data={state}
                                                clearField={clearField}
                                                editProp={editProp}
                                            />}
                                        />
                                    </React.Fragment>)
                            })}
                        </Grid2>)}
                        <Grid2 container flexGrow={1} mt={1}>
                            {GroupDetailsComponent && !displayGroupWithProp && <GroupDetailsComponent
                                data={state}
                                clearField={clearField}
                                editProp={editProp}
                            />}
                        </Grid2>

                        {displayPane && <DetailPaneWithDropdown
                        item={state}
                        tabData={tabPanels}
                        paneID={paneID}
                    />}

                    </Grid2 >
                    <HandleFormButton
                        navigateTo={navigateTo}
                        ErrorComponent={ErrorComponent}
                        SuccessComponent={SuccessComponent}
                        navigateOnSuccess={navigateOnSuccess}
                        addButtonText={addButtonText}
                        querryFunction={mutationQueryFunction}
                        queryKeyValue={queryKeyValue}
                        enableVerify={enableVerify}
                        buttonClasses={buttonClasses}
                        VerifyAlertContentComponent={VerifyAlertComponent}
                        CutomButtonComponent={CustomButtonComponent}
                        handleCancel={handleCancel}
                        showAlertDialog={showAlertDialog}
                        enableClear={enableClear}
                        handleClear={handleClear}
                        clearButtonText={clearButtonText}
                        id={id}
                        state={state}
                    />
                </div>
            </CenteredPaper>
        </div>
    )
}
export default GenericForm;

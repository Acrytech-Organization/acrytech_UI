import { Alert, AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { BiArrowBack } from 'react-icons/bi';

function ShowData(props) {

    if (!props.showSkeleton && (!props.data || props.data.length === 0)) {
        return (
            <Alert severity="info">
                No data available to display.
            </Alert>
        );
    }

    const DetailsElement = props.DetailsElement;
    const showList = () => props.setSelected(undefined);
    let context = {};
    if (props.selectedItem?.element && props.DetailsElement) {

        return (
            <div className="heightAndOverflow hstack align-items-start">
                <div className="vr d-none d-sm-block " />
                <Box sx={{ flexGrow: 1, position: "relative" }}>
                    <AppBar position="static" color="transparent" className="m-0 p-0">
                        <Toolbar className="hstack gap-3 px-1">
                            <IconButton onClick={showList}>
                                <BiArrowBack />
                            </IconButton>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                <div className='w-50 text-truncate'>
                                    {props.selectedItem.element.displayName
                                        ? props.selectedItem.element.displayName
                                        : props.selectedItem.element.name}
                                </div>
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Box component="main" sx={{ p: 1, mt: 1 }}>
                        <DetailsElement
                            item={props.selectedItem.element}
                            key={props.selectedItem.element.id + props.selectedItem.index}
                        />
                    </Box>
                </Box>
            </div>
        )
    }

    return (
        //we can get custom display option here i.e table or else
        <props.DisplayComponent {...props} context={context} />
    )
}

export default ShowData;
import { MenuItem } from '@mui/material';
import TransportForm from './TransportForm';

const AddTransport = ({ item, showDialog }) => {

    const onMenuClick = () => {
        showDialog({
            contents: <TransportForm document={item} />,
            title: "Add Transport Cost"
        });
    }

    return (
        <>
            <MenuItem onClick={() => onMenuClick()}>
                {item.transportConst ? "Delete Tranport" : "Add Transport"}
            </MenuItem>
        </>
    );
};

export default AddTransport;
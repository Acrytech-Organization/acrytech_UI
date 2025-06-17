import { useNavigate } from 'react-router-dom';
import { MenuItem } from '@mui/material';
import { EDITPORDER } from '../../Helpers/ConstantProperties';

const EditPOMenu = ({ item }) => {
    const navigate = useNavigate();

    const onMenuClick = () => {
        navigate(EDITPORDER, { state: { inquiry: item } });
    };

    return (
        <MenuItem onClick={onMenuClick}>
            Edit Order
        </MenuItem>
    );
};

export default EditPOMenu;
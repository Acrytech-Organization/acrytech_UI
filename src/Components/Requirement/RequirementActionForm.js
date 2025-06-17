import { Box, IconButton, Tooltip } from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { CREATEPRODUCT, NOT_AVAILABLE, PRODUCT_TYPE_FINISHED } from '../../Helpers/ConstantProperties';
import { useNavigate } from 'react-router-dom';
import { getSaleRate } from '../../Helpers/helpers';

export const RequirementActionForm = ({ item, data, products }) => {
    const navigate = useNavigate();

    const isEdit = 0 !== getSaleRate(item);

    const index = products.findIndex(product => product.product.id === item.product.id);

    const navigateTo = () => navigate(
        CREATEPRODUCT,
        {
            state: {
                ...item.product,
                navigateTo: -1,
                extraProp: { inquiry: { ...data, products }, index: index }
            }
        })

    return (
        <Box className="d-flex flex-row w-100 justify-content-sm-center justify-content-lg-center">
            {item.product.type === PRODUCT_TYPE_FINISHED ? NOT_AVAILABLE : (
                <IconButton size="small" onClick={navigateTo}>
                    <Tooltip title={isEdit ? "Add Requirements" : "Edit Requirements"}>
                        {
                            isEdit
                                ? (<EditRoundedIcon color='primary' />)
                                : (<AddCircleRoundedIcon color="success" />)
                        }

                    </Tooltip>
                </IconButton>
            )}
        </Box>
    )
}
import { MenuItem, Divider, Typography, Box } from "@mui/material";
import { useContext } from "react";
import { FirmContext } from "../Contexts/FirmContext";
import { commonFontSize } from "../../Helpers/ConstantProperties";
import { gradientMenuColors } from "../../Helpers/ConstantProperties";

function FirmList() {
    const { setCurrentFirm, firms } = useContext(FirmContext);

    return (
        <>
            {firms.map((item, index) => (
                <MenuItem
                    key={index}
                    onClick={() => setCurrentFirm(item)}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        py: 0,

                        '& .gradient-text': {
                            background: gradientMenuColors[index % gradientMenuColors.length],
                            WebkitBackgroundClip: 'text',
                            color: 'transparent',
                            fontWeight: 'bold',
                        }
                    }}
                >
                    <Typography fontSize={commonFontSize} className="gradient-text py-2">
                        {item.name}
                    </Typography>
                    <Divider sx={{ width: '100%', mx: 'auto', borderBottomWidth: 1, bgcolor: 'black', my: 0 }} />
                </MenuItem>
            ))}
        </>
    )
}

function SelectFirm() {
    return (
        <Box className="p-0" >
            <FirmList />
        </Box>
    )
}

export default SelectFirm;
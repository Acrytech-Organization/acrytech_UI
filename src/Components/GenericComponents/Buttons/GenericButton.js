import { IconButton } from "@mui/material"

export const GenericButton = ({ IconsComponent, onClick, type, ariaLable, color, size, style, disable = false }) => {
    return (
        <IconButton disabled={disable} size={size} onClick={onClick} type={type} aria-label={ariaLable} style={style} color={color}>
            {IconsComponent}
        </IconButton>
    )
}
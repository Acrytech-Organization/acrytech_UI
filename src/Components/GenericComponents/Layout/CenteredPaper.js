import { Box, Paper } from "@mui/material";
import { SMALL_SCREEN, useScreenSize } from "../../../Helpers/helpers";

const ResponsivePaper = ({ enableForSmall, paperSize, children }) => {
    if (enableForSmall) {
        return <Box sx={{ maxWidth: paperSize, width: '100%', maxHeight: paperSize }}>{children}</Box>
    }
    return <Paper elevation={1} className="px-2 rounded" sx={{ maxWidth: paperSize, width: '100%', maxHeight: paperSize }}>
        {children}
    </Paper>
}

function CenteredPaper({ children, paperSize = '100rem' }) {
    const screenSize = useScreenSize()
    return (
        <div className="p-1 h-100  py-1">
            <Box sx={{ padding: 0, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <ResponsivePaper enableForSmall={screenSize === SMALL_SCREEN} paperSize={paperSize}>
                    {children}
                </ResponsivePaper>
            </Box>
        </div>
    );
}

export default CenteredPaper;

import { Box, Typography } from "@mui/material"
import Grid2 from "@mui/material/Unstable_Grid2"
import { commonFontSize, extraSmallFontSize, PRIMARY_COLOR } from "../../../Helpers/ConstantProperties"

export function ResponsiveItem({ propList, item }) {
    return (
        <>
            {
                propList.map(({ key, sizes, format, color, textAlign, content }, index) => {
                    return (
                        <Grid2
                            key={index}
                            {...sizes}
                            sx={{ color }}
                        >
                            <Box display={{ xs: "block", md: "none" }}>

                                <Typography
                                    fontSize={commonFontSize}
                                    className='text-truncate'
                                    textAlign={'left'}
                                >
                                    <strong>{content}: </strong>
                                    {format ? format(item[key]) : item[key]}
                                </Typography>

                            </Box>

                            <Box display={{ xs: "none", md: "block" }}>

                                <Typography
                                    fontSize={commonFontSize}
                                    className='text-truncate'
                                    textAlign={textAlign || 'center'}>

                                    {format ? format(item[key]) : item[key]}

                                </Typography>

                                {key === 'name'
                                    && item.productdescription
                                    && (
                                        <Typography
                                            fontSize={extraSmallFontSize}
                                            className='text-truncate'
                                            textAlign={textAlign || 'center'}
                                            color={PRIMARY_COLOR}>

                                            {item.productdescription}

                                        </Typography>
                                    )
                                }
                            </Box>
                        </Grid2>
                    )
                })
            }
        </>
    )
}
import { Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { commonFontSize } from "../../../Helpers/ConstantProperties";

export default function TableHeader({ propList }) {
    return (
        <>
            {
                propList.map((property, index) => (
                    <Grid2
                        key={index}
                        {...property.sizes}
                        className="bg-primary-subtle"
                        padding={0.5}
                        display={{ xs: "none", md: "block" }}>

                        <Typography
                            padding={0.5}
                            textAlign={"center"}
                            fontSize={commonFontSize}
                            noWrap={property.noWrap}>
                            <strong>{property.content}</strong>
                        </Typography>

                    </Grid2>
                ))
            }
        </>
    )
}
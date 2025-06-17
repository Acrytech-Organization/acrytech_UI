import { Typography } from "@mui/material";
import { GridField } from "../Stock/StockDashboardCard";
import GenericProductList from "../GenericComponents/Body/GenericProductList";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { commonFontSize } from "../../Helpers/ConstantProperties";
import MarkQualityButton from "./MarkQualityButton";

function QualityCheckContent({ item }) {

    const qualityCkackData = [
        {
            key: 'orderNo',
            gridSizes: { xs: 12, sm: 4, md: 1.5 },
            render: (data) => <GridField
                label={"Order Number"}
                value={data.orderNo || '12345'}
                RenderMediumScreenComponent={
                    <Typography sx={{ textAlign: { xs: 'start', md: 'center' }, fontWeight: '1rem' }} fontSize={commonFontSize}>
                        {data.orderNo || '12345'}
                    </Typography>
                }
            />
        },
        {
            key: 'products',
            gridSizes: { xs: 12, sm: 4, md: 1.5 },
            render: () =>
                <GridField
                    label={"Products"}
                    value={<GenericProductList products={item.products || []} />}
                    RenderMediumScreenComponent={
                        <GenericProductList products={item.products || []} />
                    }
                />
        },
        {
            key: '',
            gridSizes: { xs: 12, sm: 4, md: 3 },
            render: () => <GridField
                label={''}
                value={<MarkQualityButton item={item} />}
                RenderMediumScreenComponent={
                    <Grid2 display={'flex'} justifyContent={'center'} lg={12}>
                        <MarkQualityButton item={item} />
                    </Grid2>
                }
            />
        }
    ];

    return (
        <>
            {qualityCkackData.map((column, index) => {
                const { gridSizes, render } = column;
                return (
                    <Grid2
                        key={index}
                        xs={gridSizes.xs}
                        sm={gridSizes.sm}
                        md={gridSizes.md}
                        sx={column.sx || {}}
                    >
                        {render(item)}
                    </Grid2>
                );
            })}
        </>
    )
}

export default QualityCheckContent;
import { Paper, Typography } from "@mui/material";
import InquiryProductDetails from "../Inquiry/InquiryProductDetails";
import ProductContentCell from "../Inquiry/ProductContentCell";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { qualityCheckHeading, SMALL_SCREEN, useScreenSize } from "../../Helpers/helpers";
import { QualityActionButtons } from "./QualityCheckActionButtons";
import { PENDING } from "../../Helpers/ConstantProperties";

function QualityCheckProducts({ item, inquiry }) {

    return <InquiryProductDetails
        headingList={qualityCheckHeading}
        ResponsiveContentComponent={(props) => <QualityCheckProductsTable {...props} inquiry={inquiry} />}
        data={item}
    />
}

export default QualityCheckProducts;

const QualityCheckProductsTable = ({ item, row, index, inquiry }) => {

    const screenSize = useScreenSize()

    const data = [{
        label: 'Item Code:',
        value: row.product?.productItemcode
    }, {
        label: 'Name:',
        value: row.product?.name
    }, {
        label: 'Quantity:',
        value: row.units
    }, {
        label: 'Status:',
        sx: { md: 2 },
        value: row.qualityCheck || PENDING
    }, {
        label: '',
        sx: { md: 4 },
        value: <QualityActionButtons item={item} index={index} inquiry={inquiry} />
    }]

    return (
        <>
            <Paper
                elevation={0}
                className="p-2 rounded-2 rounded-sm-0"
                sx={{
                    border: screenSize === SMALL_SCREEN ? '1px solid rgba(0, 0, 0, 0.12)' : 'none',
                    width: '100%'
                }}
            >
                <Grid2 container>
                    {data.map((item, i) => (
                        screenSize === SMALL_SCREEN ? <Grid2 key={i}
                            xs={12}
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                        >

                            <Typography sx={{ mr: 1 }} textAlign={'end'}>
                                {item.label}
                            </Typography>

                            {item.value}

                        </Grid2>
                            :
                            <ProductContentCell xs={12} md={2} {...item.sx} key={i}>
                                {item.value}
                            </ProductContentCell>
                    ))}
                </Grid2>
            </Paper>
        </>
    )
}
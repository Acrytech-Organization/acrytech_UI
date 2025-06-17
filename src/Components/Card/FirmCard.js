import { useContext } from "react";
import { FirmContext } from "../Contexts/FirmContext";
import { Card, CardHeader, CardContent, CardActions, Button, Typography } from "@mui/material";
import { commonFontSize, gradientMenuColors, SECONDARY_COLOR } from "../../Helpers/ConstantProperties";
import { getValidity } from "../Firm/FirmHelper";

function FirmCard({ item, hideButton }) {
    const { setCurrentFirm } = useContext(FirmContext);

    const handleConnectClick = () => {
        setCurrentFirm(item);
    };

    return (
        <Card>
            <CardHeader
                sx={{
                    color: SECONDARY_COLOR,
                    backgroundImage:
                        gradientMenuColors[item.colorIndex % gradientMenuColors.length],
                }}
                className="rounded"
                title={item.name}
            />
            <CardContent className="d-flex flex-column">
                <Typography variant="h6" className="text-primary" component="div">
                    Firm ID: {item.khID}
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    className="text-secondary"
                >
                    Please give this ID to clients for joining the firm.
                </Typography>

                {
                    !item.validity?.isValid &&
                    <Typography variant="body" className="text-danger" padding={2}>
                        The Business is not active. Please recharge or renew to continue.
                    </Typography>
                }

                {
                    item.validity?.isValid &&
                    <Typography variant="body" className="text-success" padding={2}>
                        {getValidity(item)}
                    </Typography>
                }

                <Typography variant="caption">
                    You have the following access to the Firm:
                </Typography>
                <Typography component={"span"} fontSize={commonFontSize}>
                    <ul className="list-group">
                        {item.currentAccess.map((level, index) => (
                            <li key={index} className="list-group-item">
                                {level.name}
                            </li>
                        ))}
                    </ul>
                </Typography>
            </CardContent>
            {
                !hideButton && (
                    <CardActions className="d-flex justify-content-center">
                        <Button
                            onClick={handleConnectClick}
                            variant="outlined"
                            color="primary"
                            size="small"
                        >
                            Connect Now
                        </Button>
                    </CardActions>
                )
            }
        </Card >
    );
}

export default FirmCard;
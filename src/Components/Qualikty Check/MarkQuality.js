import { useLocation } from "react-router-dom";
import InquiryDetails from "../Inquiry/InquiryDetails";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import GenericFormHeader from "../GenericComponents/FormComponent/GenericFormHeader";
import CenteredPaper from "../GenericComponents/Layout/CenteredPaper";
import { CircularProgress, Typography } from "@mui/material";
import QualityCheckProducts from "./QualityCheckProducts";
import { serviceHelpers } from "../../Helpers/ServiceHelpers";
import { AuthContext } from "../Auth/Auth";
import { useContext } from "react";
import { FirmContext } from "../Contexts/FirmContext";
import { useQuery } from "@tanstack/react-query";
import { QUALITY, UPDATE_ON_INQUIRY } from "../../Helpers/ConstantProperties";
import { DecodeServerError, deepCopyObject } from "../../Helpers/helpers";
import { GenericAlert } from "../GenericComponents/Alerts/GenericAlert";

function MarkQuality() {
  const location = useLocation();
  const { uid } = useContext(AuthContext);
  const { khID } = useContext(FirmContext);

  const { data, isLoading, error } = useQuery(
    {
      queryKey: [
        uid,
        khID,
        UPDATE_ON_INQUIRY,
        QUALITY,
        location.state?.id
      ]
      ,
      queryFn: async () =>
        await serviceHelpers.getOneLead(khID, location.state?.id)
    }
  );

  if (error) return <GenericAlert error={DecodeServerError(error)} />

  if (isLoading) return <CircularProgress />

  const inquiry = deepCopyObject(data);

  return (
    <div>
      <GenericFormHeader title={"Mark Quality Of Product"} />
      <CenteredPaper sx={{ width: '100%' }}>
        <Grid2
          container
          display="flex"
          spacing={2}
          direction="row"
          sx={{ width: '100%' }}
        >
          <Grid2 xs={12}>
            <InquiryDetails item={{ ...data, products: location.state.products }} />
          </Grid2>
          <Grid2 xs={12}>
            <Typography className="fw-bold mb-1">
              Product For Quality Checking
            </Typography>
            <QualityCheckProducts item={{ ...data, products: location.state.products }} inquiry={inquiry}/>
          </Grid2>
        </Grid2>
      </CenteredPaper>
    </div>

  );
}

export default MarkQuality;

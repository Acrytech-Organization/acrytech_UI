import React from "react";
import { Paper } from "@mui/material";
import CardActionButtons from "./CardActionButtons";
import GenericSkeleton from "./GenericSkeleton";
import EditMenuItem from "./EditMenuItem";
import DeleteMenuItem from "./DeleteMenuItem";

const GenericCard = ({
  contentComponent: ContentComponent,
  item,
  onEdit,
  onDelete,
  ...props
}) => {
  if (item.showSkeleton) return <GenericSkeleton />;

  return (
    <Paper className="bg-white">
      <CardActionButtons menuList={[
        <EditMenuItem onEdit={onEdit} />,
        <DeleteMenuItem onDelete={onDelete} />
      ]} />
      <ContentComponent item={item} />
    </Paper>
  );
};

export default GenericCard;
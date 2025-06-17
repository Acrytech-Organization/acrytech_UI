import { Tab } from "@mui/material";

function NavItemTabButton({ active, id, name, onClick, disabled }) {
  return (
    <Tab
      disabled={disabled}
      className={active ? "active" : ""}
      label={name}
      onClick={onClick}
      id={`${id}-tab`}
      aria-controls={`${id}-tab-pane`}
      role="tab"
      aria-selected={active}
    />
  );
}

export default NavItemTabButton;
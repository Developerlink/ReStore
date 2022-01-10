import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { useState } from "react";
import { useAppDispatch, useAppSelecter } from "../store/configureStore";
import { signOut } from "../../features/account/accountSlice";

export default function SignedInMenu() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelecter((state) => state.account);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button color="inherit" sx={{ typography: "h6" }} onClick={handleClick}>
        {user?.email}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My orders</MenuItem>
        <MenuItem onClick={() => dispatch(signOut())}>Logout</MenuItem>
      </Menu>
    </>
  );
}

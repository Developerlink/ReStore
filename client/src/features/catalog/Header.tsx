import {
  AppBar,
  Badge,
  Box,
  IconButton,
  List,
  ListItem,
  Toolbar,
  Typography,
} from "@mui/material";
import Switch from "@mui/material/Switch";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import { ShoppingCart } from "@mui/icons-material";
import { useStoreContext } from "../../app/context/StoreContext";

interface Props {
  handleThemeChange: () => void;
  isDarkMode: boolean;
}

const midLinks = [
  { title: "catalog", to: "/catalog" },
  { title: "about", to: "/about" },
  { title: "contact", to: "/contact" },
];

const rightLinks = [
  { title: "login", to: "/login" },
  { title: "register", to: "/register" },
];

const navStyles = {
  typography: "h6",
  "&:hover": {
    color: "grey.500",
  },
};

const Header = ({ handleThemeChange, isDarkMode }: Props) => {
  const { basket } = useStoreContext();
  const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box display="flex" alignItems="center">
          <Typography variant="h6" sx={navStyles}>
            <NavLink
              className={(thisNavlink) =>
                thisNavlink.isActive ? styles.active : styles.navlink
              }
              to="/"
            >
              RE-STORE
            </NavLink>
          </Typography>
          <Switch
            checked={isDarkMode}
            onChange={handleThemeChange}
            icon={<DarkModeIcon />}
            checkedIcon={<LightModeIcon />}
            color="default"
            inputProps={{ "aria-label": "Dark mode switch" }}
          />
        </Box>

        <List sx={{ display: "flex" }}>
          {midLinks.map(({ title, to }) => (
            <ListItem key={to} sx={navStyles}>
              <NavLink
                className={(thisNavlink) =>
                  thisNavlink.isActive ? styles.active : styles.navlink
                }
                to={to}
              >
                {title.toUpperCase()}
              </NavLink>
            </ListItem>
          ))}
        </List>

        <Box display="flex" alignItems="center">
          <IconButton size="large" >
            <NavLink to="/basket">
              <Badge badgeContent={itemCount} color="secondary">
                <ShoppingCart sx={ basket ? { fill: '#6F42C1'} : {fill: "white"}}/>
              </Badge>
            </NavLink>
          </IconButton>
          <List sx={{ display: "flex" }}>
            {rightLinks.map(({ title, to }) => (
              <ListItem key={to} sx={navStyles}>
                <NavLink
                  className={(thisNavlink) =>
                    thisNavlink.isActive ? styles.active : styles.navlink
                  }
                  to={to}
                >
                  {title.toUpperCase()}
                </NavLink>
              </ListItem>
            ))}
          </List>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

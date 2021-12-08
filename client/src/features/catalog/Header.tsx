import { AppBar, List, ListItem, Toolbar, Typography } from "@mui/material";
import Switch from "@mui/material/Switch";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { NavLink } from "react-router-dom";

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

const Header = ({ handleThemeChange, isDarkMode }: Props) => {
  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography variant="h6">ReStore</Typography>
        <Switch
          checked={isDarkMode}
          onChange={handleThemeChange}
          icon={<DarkModeIcon />}
          checkedIcon={<LightModeIcon />}
          color="default"
          inputProps={{ "aria-label": "Dark mode switch" }}
        />
        <List>
          {midLinks.map(({ title, to }) => (
            <ListItem key={to} sx={{ color: "inherit", typography: "h6" }}>
              <NavLink to={to}>{title.toUpperCase()}</NavLink>
            </ListItem>
          ))}
        </List>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

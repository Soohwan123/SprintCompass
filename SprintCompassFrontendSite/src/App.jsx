import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandshake } from '@fortawesome/free-solid-svg-icons'
import { Routes, Route, NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import {
    Toolbar,
    AppBar,
    Menu,
    MenuItem,
    IconButton,
    Typography,
    Snackbar
} from "@mui/material";
import LoginComponent from "./components/LoginComponent";

const Footer = () => {
    return (
      <AppBar position="fixed" style={{ top: "auto", bottom: 0, backgroundColor: '#686A6C' }}>
        <Toolbar style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Typography variant="h6" color="inherit" style={{ fontSize: 14, textAlign: 'right' }}>
             &copy;HES Software Company
          </Typography>
        </Toolbar>
      </AppBar>
    );
};

const App = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [contactServer, setContactServer] = useState(false);
    const [snackBarMsg, setSnackBarMsg] = useState("");

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const snackbarClose = async (event, reason) => {
        if (reason === "clickaway") {
          return;
      }     
        setContactServer(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <AppBar>
                <Toolbar>
                    <Typography variant="h6" color="inherit" textAlign={"left"} style={{fontSize:27}}>
                        <FontAwesomeIcon icon={faHandshake} /> sprinTCompass
                    </Typography>

                    <IconButton
                        id="menubtn"
                        onClick={handleClick}
                        color="inherit"
                        style={{ marginLeft: "auto", paddingRight: "1vh" }}
                    >
                        <MenuIcon />
                    </IconButton>
                    
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem component={NavLink} to="/home" onClick={handleClose}>
                            Home
                        </MenuItem>
                        <MenuItem component={NavLink} to="/login" onClick={handleClose}>
                            Reset Data
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>

            <Routes>
                <Route path="/" element={<LoginComponent />} />
                <Route path="/home" element={<LoginComponent />} />
                <Route path="/login" element={<LoginComponent />} />
            </Routes>
            <Footer />
        </ThemeProvider>
    );
};

export default App;
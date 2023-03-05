import React, {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandshake, faPlus  } from '@fortawesome/free-solid-svg-icons'
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import { Card, 
         CardContent, 
         Modal,
         TextField, 
         Typography,
         Button,
} from "@mui/material";

import "../App.css";

const MainpageComponent = () => {
    const [open, setOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnterToPlusSign = () => {
      setIsHovered(true);
    };
  
    const handleMouseLeaveToPlusSign = () => {
      setIsHovered(false);
    };

    const projectAddModalOpen = () => {
      setOpen(true);
    };
  
    const projectAddModalClose = () => {
      setOpen(false);
    };

    const iconStyle = {
        position: "absolute",
        top: 10,
        right: 15,
        cursor: "pointer",
        color: '#C0C0C0',
        transform: isHovered ? "rotate(135deg)" : "none",
        transition: "transform 0.2s ease-in-out",
    };

    return (
        <ThemeProvider theme={theme}>
            <div className="main-div">
                <Card
                className='left-card'
                style={{
                    width: '15vw',
                    height: '80vh',
                    position: 'absolute',
                    left: 20,
                    top: '5%',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
                }}
                >
                <CardContent>
                    <Typography
                    style={{
                        position: 'absolute',
                        top: 10,
                        left: 20,
                        fontSize: 14,
                        fontFamily: 'Roboto, sans-serif',
                        fontWeight: 'bold',
                        color: '#C0C0C0',
                    }}
                    >
                    My projects
                    </Typography>
                    <FontAwesomeIcon
                    icon={faPlus}
                    style={iconStyle}
                    onClick={projectAddModalOpen}
                    onMouseEnter={handleMouseEnterToPlusSign}
                    onMouseLeave={handleMouseLeaveToPlusSign}
                    />
                </CardContent>
                </Card>

                <Card
                className='main-card'
                style={{
                    width: '65vw',
                    height: '80vh',
                    position: 'absolute',
                    top: '45%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    minWidth: 350,
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
                }}
                >
                <FontAwesomeIcon
                    icon={faHandshake}
                    style={{
                    color: theme.palette.primary.main,
                    textAlign: 'center',
                    fontSize: 90,
                    marginTop: 30,
                    }}
                />
                <CardContent></CardContent>
                </Card>

                <Card
                className='right-card'
                style={{
                    width: '15vw',
                    height: '80vh',
                    position: 'absolute',
                    right: 20,
                    top: '5%',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
                }}
                >
                <CardContent></CardContent>
                </Card>
            </div>

            <Modal open={open} onClose={projectAddModalClose}>
                <div
                    style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "60%",
                    height: "60%",
                    border: "1px solid black",
                    borderRadius: 5,
                    backgroundColor: "white",
                    overflow: "auto",
                    }}
                >
                    <div
                    style={{
                        backgroundColor: theme.palette.primary.main,
                        padding: "10px",
                        borderTopLeftRadius: 5,
                        borderTopRightRadius: 5,
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                    }}
                    >
                        <Typography
                            style={{
                            fontWeight: "bold",
                            fontSize: 30,
                            color: "white",
                            marginRight: 10,
                            paddingLeft: 15
                            }}
                        >
                            Add Project
                        </Typography>
                    </div>

                    <div style={{ padding: 20 }}>
                        <TextField
                            label="Project Name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Stacks Used"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Description"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={7}
                            margin="normal"
                        />

                    </div>
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ 
                                position: 'absolute',
                                bottom: 10,
                                right: 20,}}
                        onClick={projectAddModalClose}
                        >
                        CLOSE
                    </Button>
                </div>
            </Modal>
        </ThemeProvider>
    );
};
export default MainpageComponent;
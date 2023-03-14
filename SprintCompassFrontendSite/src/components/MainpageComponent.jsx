import React, { useReducer, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandshake, faPlus } from "@fortawesome/free-solid-svg-icons";
import { ThemeProvider } from "@mui/material/styles";
import { toast } from "react-toastify";
import { Routes, Route, NavLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { v4 as uuidv4 } from "uuid";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";

import theme from "../theme";
import customFetch from "../utilities/utility";
import {
  Card,
  CardContent,
  Modal,
  TextField,
  Typography,
  Button,
} from "@mui/material";

import "../App.css";

import LoginComponent from "./LoginComponent";

const MainpageComponent = () => {
  const initialInfoState = {
    projects: [],
    users: [],
  };
  //State for showing table
  const [showTable, setShowTable] = useState([]);
  const [showList, setShowList] = useState([]);

  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);
  const [checked, setChecked] = React.useState([]);

  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialInfoState);

  const [projectName, setProjectName] = useState("");
  const [stacks, setStacks] = useState("");
  const [numOfSprints, setNumOfSprints] = useState("");
  const [description, setDescription] = useState("");

  const [selectedProject, setSelectedProject] = useState("");
  const [projectUsers, setProjectUsers] = useState([]);

  useEffect(() => {
    LoadProjectList();
    LoadUserList();
    if (projectName !== "" && Number.isInteger(parseInt(numOfSprints))) {
      setSaveButtonDisabled(false);
    } else {
      setSaveButtonDisabled(true);
    }
  }, [projectName, numOfSprints]);

  //api call

  const LoadProjectList = async () => {
    try {
      let projects = [];
      let newProjects = [];
      //fetching data
      let response = await customFetch(
        "query { getallprojects {_id, ProjectName, Stacks, NumOfSprints, Description}}"
      );
      let json = await response.json();

      projects = json.data.getallprojects;

      projects.map((project) => {
        let newProject = {
          Key: project._id,
          ProjectName: project.ProjectName,
          Stacks: project.Stacks,
          NumOfSprints: project.NumOfSprints,
          Description: project.Description,
        };

        newProjects.push(newProject);
      });

      if (newProjects.length > 0) {
        setShowTable(true);
      }

      setState({
        projects: newProjects,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const SaveProjectOnClick = async () => {
    try {
      //fetching data
      let response = await customFetch(`mutation { addproject 
            (ProjectName: "${projectName}", 
             Stacks : "${stacks}", 
             NumOfSprints: ${parseInt(numOfSprints)},
             Description: "${description}") 
            { ProjectName, Stacks, NumOfSprints, Description} 
          }`);

      setProjectName("");
      setStacks("");
      setNumOfSprints("");
      setDescription("");

      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const LoadUserList = async () => {
    try {
      let users = [];
      let newUsers = [];
      //fetching data
      let response = await customFetch(
        "query { getallusers {_id, FirstName, LastName}}"
      );
      let json = await response.json();

      users = json.data.getallusers;

      users.map((user) => {
        let newUser = {
          Key: user._id,
          FirstName: user.FirstName,
          LastName: user.LastName,
        };

        newUsers.push(newUser);
      });

      if (newUsers.length > 0) {
        setShowList(true);
      }

      setState({
        users: newUsers,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const LoadProjectUserList = async (Project_id) => {
    try {
      let project_users = [];
      let newProject_users = [];
      //fetching data
      let response = await customFetch(
        `query { getproject_users(Project_id: "${Project_id}") {_id, Project_id, User_id}}`
      );
      let json = await response.json();

      project_users = json.data.getproject_users;

      project_users.map((pu) => {
        let newPu = {
          Key: pu._id,
          Project_id: pu.Project_id,
          User_id: pu.User_id,
        };

        newProject_users.push(newPu);
      });

      setProjectUsers(newProject_users);
    } catch (error) {
      console.log(error);
    }
  };

  // OnChange functions
  const ProjectNameTextFieldOnChange = (e, value) => {
    setProjectName(e.target.value);
  };
  const StackTextFieldOnChange = (e, value) => {
    setStacks(e.target.value);
  };

  const NumOfSprintsTextFieldOnChange = (e, value) => {
    const input = e.target.value;

    if (!Number.isInteger(parseInt(input))) {
      // show toaster
      toast.error("Number of sprints must be an integer");
      setNumOfSprints("");
      setSaveButtonDisabled(true);
      return;
    }

    setNumOfSprints(e.target.value);
  };

  const DesTextFieldOnChange = (e, value) => {
    setDescription(e.target.value);
  };

  const handleRowClick = (project) => {
    //TODO -- render info in the middle Card
    setSelectedProject(project.Key);
    LoadProjectUserList(project.Key);
  };

  const handleToggle = (user_id) => async () => {
    const currentPu = projectUsers.find(pu => pu.User_id === user_id);

    if (currentPu === undefined) {
      try {
        let response = await customFetch(`
        mutation { addproject_user 
          (Project_id: "${selectedProject}", 
           User_id : "${user_id}") 
          { Project_id, User_id } 
        }`);
      } catch (error) {
        console.log(error);
      }
    } else {
      let response = await customFetch(
        `mutation { deleteproject_user(_id: "${currentPu.Key}") }`
      );
    }

    LoadProjectUserList(selectedProject);
  };

  // UI Handlers
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

  return (
    <ThemeProvider theme={theme}>
      <div className="main-div">
        <Card
          className="left-card"
          style={{
            width: "15vw",
            height: "80vh",
            position: "absolute",
            left: 20,
            top: "5%",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          <CardContent>
            <Typography
              style={{
                position: "absolute",
                top: 10,
                left: 20,
                fontSize: 14,
                fontFamily: "Roboto, sans-serif",
                fontWeight: "bold",
                color: "#C0C0C0",
              }}
            >
              My projects
            </Typography>
            <FontAwesomeIcon
              icon={faPlus}
              style={{
                position: "absolute",
                top: 10,
                right: 15,
                cursor: "pointer",
                color: "#C0C0C0",
                transform: isHovered ? "rotate(135deg)" : "none",
                transition: "transform 0.2s ease-in-out",
              }}
              onClick={projectAddModalOpen}
              onMouseEnter={handleMouseEnterToPlusSign}
              onMouseLeave={handleMouseLeaveToPlusSign}
            />

            <br />
            {showTable && (
              <Table>
                <TableBody>
                  {state.projects.length > 0 &&
                    state.projects.map((project) => (
                      <TableRow
                        key={project.Key}
                        onClick={() => handleRowClick(project)}
                        hover={true}
                      >
                        <TableCell
                          style={{
                            fontSize: 12,
                            fontFamily: "Roboto, sans-serif",
                          }}
                        >
                          {project.ProjectName}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <Card
          className="main-card"
          style={{
            width: "65vw",
            height: "80vh",
            position: "absolute",
            top: "45%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#F0EFEF",
            minWidth: 350,
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          <FontAwesomeIcon
            icon={faHandshake}
            style={{
              color: theme.palette.primary.main,
              textAlign: "center",
              fontSize: 90,
              marginTop: 30,
            }}
          />
          <CardContent></CardContent>
        </Card>

        <Card
          className="right-card"
          style={{
            width: "15vw",
            height: "80vh",
            position: "absolute",
            right: 20,
            top: "5%",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          <CardContent>            
            <Typography
              style={{
                position: "absolute",
                top: 10,
                left: 20,
                fontSize: 14,
                fontFamily: "Roboto, sans-serif",
                fontWeight: "bold",
                color: "#C0C0C0",
              }}
            >
              Team Member List
            </Typography>
            </CardContent>
          {showList && selectedProject !== "" && (<List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {state.users.map((user) => {
              const labelId = `checkbox-list-label-${user.Key}`;

              return (
                <ListItem
                  key={user.Key}
                  disablePadding
                >
                  <ListItemButton
                    role={undefined}
                    onClick={handleToggle(user.Key)}
                    dense
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={projectUsers.find(pu => pu.User_id === user.Key) !== undefined}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      id={labelId}
                      primary={`${user.FirstName} ${user.LastName}`}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>)}
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
                paddingLeft: 15,
              }}
            >
              Add Project
            </Typography>
          </div>

          <div style={{ padding: 20 }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <TextField
                label="Project Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={projectName}
                onChange={ProjectNameTextFieldOnChange}
              />
              <TextField
                label="Number of Sprints"
                variant="outlined"
                fullWidth
                margin="normal"
                value={numOfSprints}
                onChange={NumOfSprintsTextFieldOnChange}
              />
              <TextField
                label="Stacks Used"
                variant="outlined"
                fullWidth
                margin="normal"
                value={stacks}
                onChange={StackTextFieldOnChange}
              />
            </div>
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              rows={11}
              margin="normal"
              value={description}
              onChange={DesTextFieldOnChange}
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            style={{
              position: "absolute",
              width: 88,
              bottom: 10,
              right: 127,
            }}
            disabled={saveButtonDisabled}
            onClick={SaveProjectOnClick}
          >
            SAVE
          </Button>
          <Button
            variant="contained"
            color="error"
            style={{
              position: "absolute",
              bottom: 10,
              right: 20,
            }}
            onClick={projectAddModalClose}
          >
            CLOSE
          </Button>
          <div>
            <ToastContainer />
          </div>
        </div>
      </Modal>

      <Routes>
        <Route path="/login" element={<LoginComponent />} />
      </Routes>
    </ThemeProvider>
  );
};
export default MainpageComponent;

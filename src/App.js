import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Autocomplete from "@material-ui/core/Autocomplete";
import TextField from "@material-ui/core/TextField";
import EditIcon from "@material-ui/icons/Edit";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

function App() {
  const [users, setUsers] = useState([]);
  const [role, setRole] = React.useState("All");
  const [filter, setFilter] = React.useState("Firstname");
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [id, setId] = React.useState("");
  const [notes, setNotes] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeRole = (event) => {
    setRole(event.target.value);
  };
  const handleChangeFil = (event) => {
    setFilter(event.target.value);
  };
  const addNotes = async () => {
    await axios
      .put(`http://localhost:5000/api/addnote/${id}/${notes}`)
      .then((data) => {
        console.log(data.data);
        setUsers(data.data);
      });
    setNotes("");
  };
  useEffect(() => {
    if (role === "All") {
      axios.get("http://localhost:5000/api/users").then((data) => {
        console.log(data.data);
        setUsers(data.data);
      });
    } else {
      axios
        .get(`http://localhost:5000/api/filterbytag/${role}`)
        .then((data) => {
          console.log(data.data);
          setUsers(data.data);
        });
    }
  }, [role, notes]);
  return (
    <div
      style={{
        backgroundColor: "aliceblue",
        width: "100vw",
        height: "100%",
      }}
    >
      <h1 style={{ textAlign: "center", marginTop: 0, padding: 20 }}>
        Havi- Dashboard
      </h1>
      <Grid
        style={{
          width: "60vw",
          margin: "auto",
        }}
        container
        spacing={2}
      >
        <Grid item xs={2}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Filter By</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue={"Firstname"}
              value={filter}
              label="Filter By"
              onChange={handleChangeFil}
            >
              <MenuItem value={"Age"}>Age</MenuItem>
              <MenuItem value={"Firstname"}>First-Name</MenuItem>
              <MenuItem value={"Notes"}>Notes</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={8}>
          <Autocomplete
            id="free-solo-demo"
            freeSolo
            options={
              users.length > 0
                ? users.map((option) => {
                    if (filter === "Firstname") {
                      return option.firstname;
                    } else if (filter === "Age") {
                      return option.age;
                    } else {
                      return option.notes;
                    }
                  })
                : null
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label={"filter by " + filter.toLocaleLowerCase()}
                onChange={(e) => {
                  if (e.target.value.length < 1) {
                    axios
                      .get(`http://localhost:5000/api/users`)
                      .then((data) => {
                        console.log("data", data.data);
                        setUsers(data.data);
                      });
                  } else {
                    if (filter === "Firstname") {
                      axios
                        .get(
                          `http://localhost:5000/api/filterbyfn/${e.target.value}`
                        )
                        .then((data) => {
                          console.log("data", data.data);
                          setUsers(data.data);
                        });
                    } else if (filter === "Age") {
                      axios
                        .get(
                          `http://localhost:5000/api/filterbyage/${e.target.value}`
                        )
                        .then((data) => {
                          console.log("data", data.data);
                          setUsers(data.data);
                        });
                    } else {
                      axios
                        .get(
                          `http://localhost:5000/api/filterbynote/${e.target.value}`
                        )
                        .then((data) => {
                          console.log("data", data.data);
                          setUsers(data.data);
                        });
                    }
                  }
                }}
              />
            )}
            // onInputChange={(e) => {

            // }}
          />
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue={"All"}
              value={role}
              label="Role"
              onChange={handleChangeRole}
            >
              <MenuItem value={"All"}>All</MenuItem>
              <MenuItem value={"Teacher"}>Teacher</MenuItem>
              <MenuItem value={"Student"}>Student</MenuItem>
              <MenuItem value={"Parent"}>Parent</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      {users.length > 0 ? (
        <Grid
          style={{
            width: "60vw",
            margin: "auto",
          }}
          container
          spacing={4}
        >
          {users?.map((data) => (
            <Grid item xs={4}>
              <Card sx={{ width: "100%", alignSelf: "center" }}>
                <div
                  style={{
                    width: 150,
                    height: 150,
                    margin: "auto",
                    marginTop: 20,
                  }}
                >
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 75,
                    }}
                    src={data.img_path}
                  />
                </div>

                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    style={{ textAlign: "center" }}
                  >
                    {data.firstname + " " + data.lastname}
                  </Typography>
                  <h3 style={{ color: "#022e7a" }}>
                    Bio:{" "}
                    <span
                      style={{
                        color: "#4a4d4b",
                        fontWeight: "normal",
                        fontSize: 16,
                      }}
                    >
                      {data.bio}
                    </span>{" "}
                  </h3>
                  <h3 style={{ color: "#022e7a", marginTop: -20 }}>
                    age:{" "}
                    <span
                      style={{
                        color: "#4a4d4b",
                        fontWeight: "normal",
                        fontSize: 16,
                      }}
                    >
                      {data.age}
                    </span>{" "}
                  </h3>
                  <h3 style={{ color: "#022e7a", marginTop: -20 }}>
                    Type:{" "}
                    <span
                      style={{
                        color: "#4a4d4b",
                        fontWeight: "normal",
                        fontSize: 16,
                      }}
                    >
                      {data.tag}
                    </span>{" "}
                  </h3>
                </CardContent>
                <CardActions
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    margin: "auto",
                  }}
                >
                  <a
                    download={`${data.firstname}'s doc`}
                    href={data.pdf_path}
                    title="Download pdf document"
                    style={{ color: "#022e7a" }}
                  >
                    Download
                  </a>

                  <Button
                    style={{ backgroundColor: "#022e7a" }}
                    variant="contained"
                    endIcon={<EditIcon />}
                    onClick={() => {
                      handleClickOpen();
                      setName(data.firstname);
                      setId(data._id);
                    }}
                  >
                    Add Notes
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <h2 style={{ textAlign: "center" }}>loading...</h2>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" style={{ color: "#022e7a" }}>
          {"Add Notes for " + name}
        </DialogTitle>
        <DialogContent>
          <TextField value={notes} onChange={(e) => setNotes(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
              addNotes();
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;

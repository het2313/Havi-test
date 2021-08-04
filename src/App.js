import React from "react";
import { makeStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import FileBase64 from "react-file-base64";
import axios from "axios";

const useStyles = makeStyles({
  select: {
    "&:before": {
      borderBottom: `3px solid success`,
      // normal
    },
    "&:after": {
      // focused
      borderBottom: `3px solid success`,
    },
    "&:hover:not(.Mui-disabled):not(.Mui-focused):not(.Mui-error):before": {
      // hover
      borderBottom: `3px solid success`,
    },
  },
});

function App() {
  const classes = useStyles();
  const API = axios.create({
    baseURL: "https://immense-everglades-90826.herokuapp.com/api",
  });
  const [form, setForm] = React.useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    bio: "",
    age: 0,
    tag: "",
    pdf_path: "",
    img_path: "",
    notes: [],
  });

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
    console.log([event.target.name]);
  };

  const onSubmit = () => {
    axios.post(
      "https://immense-everglades-90826.herokuapp.com/api/users",
      form
    );
  };
  return (
    <div
      style={{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100vw",
          height: 50,
          backgroundColor: "black",
        }}
      >
        <h2
          style={{
            color: "white",
            marginTop: 0,
            textAlign: "center",
          }}
        >
          Havi - Form
        </h2>
      </div>
      <div style={{ width: "30vw", margin: "auto", marginTop: 50 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="First Name"
              variant="standard"
              color="success"
              focused
              placeholder="Harry"
              style={{ width: "100%" }}
              value={form.firstname}
              onChange={handleChange}
              inputProps={{
                name: "firstname",
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Last Name"
              variant="standard"
              color="success"
              focused
              placeholder="Poter"
              style={{ width: "100%" }}
              value={form.lastname}
              onChange={handleChange}
              inputProps={{
                name: "lastname",
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              variant="standard"
              color="success"
              focused
              placeholder="hello@test.com"
              style={{ width: "100%" }}
              value={form.email}
              onChange={handleChange}
              inputProps={{
                name: "email",
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Bio"
              variant="standard"
              color="success"
              focused
              placeholder="Teaching is my passion!!"
              style={{ width: "100%" }}
              value={form.bio}
              onChange={handleChange}
              inputProps={{
                name: "bio",
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Age"
              variant="standard"
              color="success"
              type="number"
              focused
              placeholder="Teaching is my passion!!"
              style={{ width: "100%" }}
              value={form.age}
              onChange={handleChange}
              inputProps={{
                name: "age",
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel
                variant="standard"
                color="success"
                htmlFor="uncontrolled-native"
              >
                Role as
              </InputLabel>
              <Select
                className={classes.select}
                color="success"
                variant="standard"
                value={form.tag}
                onChange={handleChange}
                inputProps={{
                  name: "tag",
                }}
              >
                <MenuItem value="Student" disabled color="success" />
                <MenuItem value={"Teacher"} color="success">
                  Teacher
                </MenuItem>
                <MenuItem value={"Student"} color="success">
                  Student
                </MenuItem>
                <MenuItem value={"Parent"} color="success">
                  Parent
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Password"
              variant="standard"
              color="success"
              type="password"
              focused
              placeholder="hello@test.com"
              style={{ width: "100%" }}
              value={form.password}
              onChange={handleChange}
              inputProps={{
                name: "password",
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <InputLabel
              variant="standard"
              color="success"
              htmlFor="uncontrolled-native"
            >
              Your Resume
            </InputLabel>
            <FileBase64
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setForm({ ...form, ["pdf_path"]: base64 })
              }
            />
          </Grid>
          <Grid item xs={6}>
            <InputLabel
              variant="standard"
              color="success"
              htmlFor="uncontrolled-native"
            >
              Your Photo
            </InputLabel>
            <FileBase64
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setForm({ ...form, ["img_path"]: base64 })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="success"
              disabled={
                form.email.length === 0 || form.password.length === 0
                  ? true
                  : false
              }
              style={{ width: "100%", marginTop: 16 }}
              onClick={onSubmit}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default App;

import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Avatar, Popover } from "@mui/material";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useUserContext } from "./UserContext";

export const Apple = () => {
  // const [name, setName] = useState();
  // const [email, setEmail] = useState();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const Navigate = useNavigate();
  const [user, setUser] = useState([]);
  const { setUserName } = useUserContext();

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts").then((res) => {
      console.log("User detail: ", res.data);
      setUser(res.data);
    });
  }, []);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Please make sure you have entered you name with at least 3 char.")
      .required("Please enter your name"),
    email: Yup.string().email("Please enter a valid email address").required("Please enter email address"),
  });

  const initialValues = {
    name: "",
    email: "",
  };

  const onFormSubmit = async (values) => {
    console.log("On the form submitted", values);

    const requestData = {
      userName: values.name,
      userEmail: values.email,
    };

    setUserName(values.name);

    // call API to post submit the form
    const res = await axios.post("https://jsonplaceholder.typicode.com/posts", requestData);

    if (res.status === 201) {
      console.log(res.data.id);
      toast.success("API call is completted successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    axios.delete("https://jsonplaceholder.typicode.com/posts/1").then((res) => {
      if (res.status === 200) {
        toast.success("Data is deleted successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    });
  };

  const handleClick = (event) => {
    console.log(123);
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  return (
    <div
      style={{
        padding: 5,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          cursor: "pointer",
        }}
      >
        <div
          onClick={handleClick}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            columnGap: 5,
          }}
        >
          <Avatar sx={{ bgcolor: "blue" }}>MB</Avatar>
        </div>
      </div>
      <div
        style={{
          padding: 5,
          display: "flex",
          flexDirection: "column",
          rowGap: 8,
        }}
      >
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onFormSubmit}>
          {({ value, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: 5,
                }}
              >
                <TextField
                  variant="outlined"
                  type="text"
                  label="Name"
                  id="name"
                  name="name"
                  placeholder="Name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.name && (
                  <span
                    style={{
                      padding: 5,
                      color: "red",
                      fontSize: 16,
                      fontWeight: 500,
                    }}
                  >
                    {errors.name}
                  </span>
                )}
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: 5,
                }}
              >
                <TextField
                  variant="outlined"
                  type="email"
                  label="Email"
                  id="email"
                  name="email"
                  placeholder="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.email && (
                  <span
                    style={{
                      padding: 5,
                      color: "red",
                      fontSize: 16,
                      fontWeight: 500,
                    }}
                  >
                    {errors.email}
                  </span>
                )}
              </div>
              <Button variant="contained" type="submit" className="">
                Submit
              </Button>
            </form>
          )}
        </Formik>
      </div>
      <div>
        {user.map((item) => (
          <div key={item.id}>
            <h3>{item.title}</h3>
            <span>{item.body}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

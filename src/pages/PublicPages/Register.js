import React, { useState, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { StoreContext } from "../../context/store";
import { useFormik } from "formik";
import {
  Paper,
  MenuItem,
  Typography,
  TextField,
  Select,
  FormControl,
} from "@material-ui/core";
import Lottie from "react-lottie";
import { RegisterInfo } from "../../components/schema/validator";
import ModalPop from "../../components/objects/Modal";
import Navbar from "../../components/objects/Navbar";
import CustomButton from "../../components/objects/CustomButton";
import Footer from "../../components/objects/Footer";

import {
  successAnimationObjects,
  failedAnimationObjects,
  loadingringAnimationObjects,
} from "../../components/animation/animation";

export default function Register() {
  const [error, setError] = useState({});
  const history = useHistory();
  const [success, setSuccess] = useState(false);
  const [success_text, setSuccessText] = useState({});
  const { setOpenModal } = useContext(StoreContext);
  let baseUrl = process.env.REACT_APP_API_URL;

  const [loadingFetch, setLoadingFetch] = useState(false);

  const { handleSubmit, handleChange, values, touched, errors, handleBlur } =
    useFormik({
      initialValues: {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
      },
      validationSchema: RegisterInfo,
      onSubmit: ({ username, email, password, confirmPassword, role }) => {
        let success_text = {};

        const payload = {
          username: values.username,
          email: values.email,
          password: values.password,
          role: values.role,
        };

        setTimeout(() => {
          setLoadingFetch(false);
          setOpenModal(false);

          setTimeout(() => {
            setOpenModal(true);
            setLoadingFetch(true);
            axios
              .post(`${baseUrl}/api/v1/register`, payload)
              .then((response) => {
                setSuccess(true);
                success_text["message"] = response.data.message;
                setSuccessText(success_text);
                setTimeout(() => {
                  history.push(`/verify/email?uuid=${response.data.uuid}`);
                }, 5000);
              })
              .catch((error) => {
                setSuccess(false);
                setLoadingFetch(false);
                let errors = {};
                let error_detail = error.response.data.detail;
                errors["message"] = error_detail;
                setError(errors);
              });
          }, 3000);
        }, 1000);
      },
    });

  const modalContent = (
    <div className="flex justify-center">
      {loadingFetch ? (
        <div>
          <Typography className="flex justify-center">
            <h1 className="title font-bold text-3xl">Processing ... </h1>
          </Typography>
          <Lottie
            style={{
              marginTop: "30px",
            }}
            options={loadingringAnimationObjects}
            height={200}
            width={200}
          />
        </div>
      ) : (
        <div>
          {!success ? (
            <div className="p-1">
              <Typography className="flex justify-center">
                <h1 className="title font-bold text-3xl"> Failed</h1>
              </Typography>

              <Lottie
                style={{
                  marginTop: "30px",
                }}
                options={failedAnimationObjects}
                height={200}
                width={200}
              ></Lottie>
              <Typography className="flex justify-center">
                <h1 className="title font-bold text-3xl">{error["message"]}</h1>
              </Typography>
            </div>
          ) : (
            <div className="p-1">
              <Typography className="flex justify-center">
                <h1 className="title font-bold text-3xl">Success</h1>
              </Typography>

              <Lottie
                style={{
                  marginTop: "30px",
                }}
                options={successAnimationObjects}
                height={270}
                width={270}
              ></Lottie>
              <Typography className="flex justify-center">
                <h1 className="title font-bold text-3xl">
                  {success_text["message"]}
                </h1>
              </Typography>
            </div>
          )}
        </div>
      )}
    </div>
  );
  return (
    <div>
      <div className="bg-right-top bg-auto bg-no-repeat bg-fixed bg-mainbackground2 w-full h-screen">
        <Navbar btn_name={"Login"} btn_link={"/login"} />
        <ModalPop contents={modalContent} width={"450px"} height={"450px"} />
        <div>
          <div className="flex justify-center">
            <div></div>

            <div>
              <Paper
                style={{
                  height: "710px",
                  borderRadius: "30px",
                }}
                variant="outlined"
                className="mt-10 p-4 w-96 bg-white-300 bg-opacity-40 shadow-lg blur-lg rounded-3xl"
              >
                <Typography className="flex justify-center">
                  <h1 className="title text-4xl font-bold">Register</h1>
                </Typography>
                <FormControl>
                  <form onSubmit={handleSubmit}>
                    <div
                      style={{
                        marginTop: "30px",
                      }}
                      className="h-56 flex flex-wrap content-start content-between"
                    >
                      <TextField
                        style={{
                          marginTop: "30px",
                        }}
                        className="w-full"
                        autoComplete="off"
                        label="Username*"
                        name="username"
                        variant="outlined"
                        type="text"
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.username && errors.username}
                        helperText={errors.username}
                      />

                      <TextField
                        style={{
                          marginTop: "30px",
                        }}
                        className="w-full"
                        autoComplete="off"
                        label="Email*"
                        name="email"
                        variant="outlined"
                        type="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.email && errors.email}
                        helperText={errors.email}
                      />
                      <TextField
                        style={{
                          marginTop: "30px",
                        }}
                        className="w-full"
                        autoComplete="off"
                        label="Password*"
                        variant="outlined"
                        name="password"
                        type="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.password && errors.password}
                        helperText={errors.password}
                      />
                      <TextField
                        style={{
                          marginTop: "30px",
                        }}
                        className=" my-10 w-full"
                        autoComplete="off"
                        label="Confrim password*"
                        variant="outlined"
                        name="confirmPassword"
                        type="password"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          touched.confirmPassword && errors.confirmPassword
                        }
                        helperText={errors.confirmPassword}
                      />

                      <p className="mt-5 w-full text-black">Select Role</p>
                      <Select
                        className="mt-5 w-full text-black"
                        name="role"
                        variant="filled"
                        label="Select Role"
                        value={values.role}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.role && errors.role}
                        helperText={errors.role}
                      >
                        <MenuItem value="" disabled>
                          <em>Select Role</em>
                        </MenuItem>
                        <MenuItem value="visitor">Visitor</MenuItem>
                        <MenuItem value="co-responding">Corresponding</MenuItem>
                        <MenuItem value="researcher">Researcher</MenuItem>
                        <MenuItem value="labeler">Labeler</MenuItem>
                      </Select>
                      <CustomButton
                        name={"Register"}
                        type={"submit"}
                        classStyle={
                          "fixed mt-10 relative p-5 title text-sm font-bold transition duration-500 ease-in-out bg-green-400 text-white font-bold w-full rounded-full hover:bg-green-500 filter drop-shadow-lg  transform hover:-translate-y-1 hover:scale-10"
                        }
                      />
                    </div>
                  </form>
                </FormControl>
              </Paper>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

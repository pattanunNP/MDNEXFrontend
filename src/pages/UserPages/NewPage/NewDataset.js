import React, { useState, useContext, useMemo } from "react";
import {
  makeStyles,
  withStyles,
  Step,
  Stepper,
  StepLabel,
  IconButton,
  Tooltip,
  Paper,

  Typography,
  TextField,
  TextareaAutosize,
  StepConnector,
} from "@material-ui/core/";
import axios from "axios";
import Lottie from "react-lottie";
import clsx from "clsx";
import { useFormik } from "formik";
import { Dashboard } from "@uppy/react";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import {
  successAnimationObjects,
  failedAnimationObjects,
  loadingringAnimationObjects,
} from "../../../components/animation/animation";
import ModalPop from "../../../components/objects/Modal";
import CustomButton from "../../../components/objects/CustomButton";
import PropTypes from "prop-types";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import Sidenavbar from "../../../components/objects/Sidenavbar";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import InsertDriveFileSharpIcon from "@material-ui/icons/InsertDriveFileSharp";
import { StoreContext } from "../../../context/store";
import Uppy from "@uppy/core";
import XHRUpload from "@uppy/xhr-upload";

import { DatasetInfo } from "../../../components/schema/validator";

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
    fontFamily: "Kanit",
  },
  active: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 100.6deg,  rgba(0,200,180,1) 11.2%, rgba(0,140,255,1) 91.1% )",
    },
  },
  completed: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 100.6deg,  rgba(0,200,180,1) 11.2%, rgba(0,140,255,1) 91.1% )",
    },
  },
  line: {
    height: 6,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",

    fontFamily: "Kanit",
  },
  active: {
    backgroundImage:
      "linear-gradient( 100.6deg,  rgba(0,200,180,1) 11.2%, rgba(0,140,255,1) 91.1% )",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  },
  completed: {
    backgroundImage:
      "linear-gradient( 100.6deg,  rgba(0,200,180,1) 11.2%, rgba(0,140,255,1) 91.1% )",
  },
});
function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <TextFieldsIcon />,
    2: <InsertDriveFileSharpIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,

  completed: PropTypes.bool,

  icon: PropTypes.node,
};
export default function NewData(props) {
  const { userData, activeStep, setActiveStep, dataset_name, dataset_uuid,
    setOpenModal, setDatasetname, setDatasetuuid } =
    useContext(StoreContext);
  const url = process.env.REACT_APP_API_URL;
  const access_token = sessionStorage.getItem("access_token");
  const [error, setError] = useState({});
  const [success_text, setSuccessText] = useState({});
  const [loadingFetch, setLoadingFetch] = useState(false);
  const [success, setSuccess] = useState(false);





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
  const { handleSubmit, handleChange, values, touched, errors, handleBlur } =
    useFormik({
      initialValues: {
        name: "",
        description: "",
      },
      validationSchema: DatasetInfo,
      onSubmit: ({ name, description }) => {
        const payload = {
          dataset_name: values.name,
          dataset_description: values.description,
        };
        console.log(payload);

        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        };

        setTimeout(() => {
          setOpenModal(true);
          setLoadingFetch(true);
          setTimeout(() => {
            axios
              .post(`${url}/api/v1/dataset/newdata`, payload, {
                headers: headers,
              })
              .then((response) => {
                console.log(response.data);

                success_text["message"] = response.data.message;
                setSuccess(true);
                setSuccessText(success_text);
                setLoadingFetch(false);
                setDatasetname(response.data.dataset_name);
                setDatasetuuid(response.data.dataset_uuid);
                setTimeout(() => {
                  setActiveStep(activeStep + 1);
                }, 2500);
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

  function getStep() {
    return ["Name Your Dataset", "Upload Your Data"];
  }

  const step = getStep();
  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <div>
            <Typography className="flex justify-center">
              <h1 className="mt-10 font-bold text-xl text-green-500">
                Your dataset name : &nbsp;
                {values.name !== undefined ? `${values.name}` : null}
              </h1>
            </Typography>

            <div className="mt-5 flex justify-center">
              <form onSubmit={handleSubmit}>
                <div className="mt-5 flex justify-center">
                  <TextField
                    style={{
                      marginTop: "30px",
                      width: "260px",
                    }}
                    className="w-full"
                    autoComplete="off"
                    label="Name your dataset"
                    name="name"
                    variant="outlined"
                    type="text"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.name && errors.name}
                    helperText={errors.name}
                  />
                </div>
                <div className="mt-5 flex justify-center">
                  <TextareaAutosize
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    className="p-2 w-96 border-4 border-green-400"
                    rowsMin={5}
                    placeholder="Your Dataset Description (optional)"
                  ></TextareaAutosize>
                </div>
                <div className="mt-5 flex justify-center">
                  <CustomButton
                    name={"Create Dataset"}
                    type={"submit"}
                    classStyle={
                      "fixed mt-10 relative p-3 title text-sm font-bold transition duration-500 ease-in-out bg-green-400 text-white font-bold w-full rounded-full hover:bg-green-500 filter drop-shadow-lg  transform hover:-translate-y-1 hover:scale-10"
                    }
                  />
                </div>
              </form>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="mt-5 flex justify-center ">
            <Tooltip title="Back Last step">
              <IconButton
                onClick={() => {
                  setActiveStep(activeStep - 1);
                }}
              >
                <KeyboardArrowLeftIcon
                  style={{
                    width: "40px",
                    height: "40px",
                  }}
                  className="text-green-400 text-xl hover:text-green-500"
                />
              </IconButton>
            </Tooltip>

            <Dashboard
              uppy={uppy}
              plugins={["XHRUpload"]}
              {...props}
              theme={"auto"}
              note={
                "Maximum 1000 files; Per 1 upload Your can add more data later"
              }
              width={"700px"}
              showProgressDetails={true}
              height={"450px"}
            />
          </div>
        );

      default:
        return "Unknown step";
    }
  }

  const uppy = useMemo(() => {
    return Uppy({
      limit: 1000,
      debug: true,
      autoProceed: false,
    })
      .use(XHRUpload, {
        id: "XHRUpload",

        endpoint: `${url}/api/v1/dataset/upload?dataset_name=${dataset_name}&dataset_uuid=${dataset_uuid}`,
        formData: true,
        fieldName: "files",
        headers: {
          authorization: `Bearer ${access_token}`,
        },
      })
      .on("upload-success", (file, response) => {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        };
        console.log(response.status);
        console.log(response.body);
        const payload = {
          datasetfiles: response.body.content,
          action_type: "UPDATE_FILES",
        };
        axios.post(
          `${url}/api/v1/dataset/update?dataset_name=${dataset_name}&dataset_uuid=${dataset_uuid}`,
          payload,
          { headers: headers }
        );
      });
  }, [url, access_token, dataset_name, dataset_uuid]);

  return (
    <div className="bg-right-top bg-auto bg-no-repeat bg-fixed bg-mainbackground2 flex h-screen">
      <Sidenavbar
        uuid={userData.uuid}
        username={userData.username}
        role={userData.role}
        profileImage={userData.profileImage}
      />

      <div className="flex flex-col flex-1 w-full overflow-y-auto">
        <header className="grid justify-items-stretch py-1 bg-gray-800 h-16"></header>

        <main>
          <ModalPop contents={modalContent} width={"450px"} height={"450px"} />
          <div className="z-10 col-span-12 mt-5">
            <Paper
              className="m-10 w-sceen h-full"
              style={{
                padding: "3rem",
                background: "rgba(255, 255, 255, 0.5 )",
                boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
                backdropFilter: "blur( 5.0px )",
                borderRadius: "20px",
                border: "1px solid rgba( 255, 255, 255, 0.18 )",
                height: "900px",
              }}
            >
              <div className="flex justify-start">
                <Tooltip title="Back">
                  <IconButton
                    onClick={() => {
                      window.history.back();
                    }}
                  >
                    <KeyboardArrowLeftIcon
                      style={{
                        width: "40px",
                        height: "40px",
                      }}
                      className="text-green-400 text-xl hover:text-green-500"
                    />
                  </IconButton>
                </Tooltip>
              </div>
              <Typography className="flex justify-center">
                <h1 className="mt-10 font-bold text-3xl text-gray-500">
                  {" "}
                  {dataset_name ? `Add data to ${dataset_name}` : "Create Dataset"}
                </h1>
              </Typography>
              <div>
                <Stepper
                  activeStep={activeStep}
                  alternativeLabel
                  connector={<ColorlibConnector />}
                >
                  {step.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};

                    return (
                      <Step key={index} {...stepProps}>
                        <StepLabel
                          {...labelProps}
                          StepIconComponent={ColorlibStepIcon}
                        >
                          <p style={{ fontFamily: "Kanit" }}>{label}</p>
                        </StepLabel>
                      </Step>
                    );
                  })}
                </Stepper>
              </div>

              <div className="overflow-y-auto h-full">
                {" "}
                {getStepContent(activeStep)}
              </div>
            </Paper>
          </div>
        </main>
      </div>
    </div>
  );
}

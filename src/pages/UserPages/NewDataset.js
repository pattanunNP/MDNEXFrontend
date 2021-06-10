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
  StepConnector,
} from "@material-ui/core/";
import PropTypes from "prop-types";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import Sidenavbar from "../../components/objects/Sidenavbar";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { StoreContext } from "../../context/store";
import Uppy from "@uppy/core";
import XHRUpload from "@uppy/xhr-upload";
import useDashboardFetch from "../../components/Hook/useDashboardFetch";
import clsx from "clsx";
import { Dashboard } from "@uppy/react";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import AddToPhotosSharpIcon from "@material-ui/icons/AddToPhotosSharp";
import InsertDriveFileSharpIcon from "@material-ui/icons/InsertDriveFileSharp";
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
    3: <AddToPhotosSharpIcon />,
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
  const [dataset, setDataset] = useState({});
  const { userData, activeStep, setActiveStep } = useContext(StoreContext);
  const url = process.env.REACT_APP_API_URL;
  const access_token = sessionStorage.getItem("access_token");
  useDashboardFetch(url, access_token);

  function handleChange(e) {
    e.preventDefault();
    setDataset({ ...dataset, name: e.target.value });
  }
  function getStep() {
    return [
      "Name Your Dataset",
      "Upload Your Data",
      "Attach dataset to projects",
    ];
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
                {dataset.name !== undefined ? `${dataset.name}` : null}
              </h1>
            </Typography>

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
                value={dataset.name}
                onChange={handleChange}
              />
            </div>
          </div>
        );
      case 1:
        return (
          <div className="mt-5 flex justify-center ">
            <Dashboard
              uppy={uppy}
              plugins={["XHRUpload"]}
              {...props}
              width={"750px"}
              height={"450px"}
            />
          </div>
        );
      case 2:
        return <div>3</div>;
      default:
        return "Unknown step";
    }
  }
  const uppy = useMemo(() => {
    return Uppy({
      debug: true,
      autoProceed: false,
    }).use(XHRUpload, {
      id: "XHRUpload",
      endpoint: `${url}/api/v1/upload`,
      formData: true,
      fieldName: "files",
      headers: {
        authorization: `Bearer ${access_token}`,
      },
    });
  }, [url, access_token]);

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
          <div className="z-10 col-span-12 mt-5">
            <Paper
              className="m-10 w-sceen h-full"
              style={{
                padding: "2rem",
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
                  Create Dataset
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
              <div className="mt-5  flex justify-center">
                <button
                  style={{
                    backgroundColor: "#F171B4",
                    borderRadius: "30px",
                    color: "white",
                  }}
                  className="p-3 w-24 bg-red-300 mx-3"
                  onClick={() => {
                    setActiveStep(activeStep - 1);
                  }}
                >
                  <KeyboardArrowLeftIcon />
                  Back
                </button>
                <button
                  style={{
                    borderRadius: "30px",
                    backgroundColor: "#00D09A",
                    color: "white",
                  }}
                  className="p-3 w-24 mx-3"
                  onClick={() => {
                    setActiveStep(activeStep + 1);
                  }}
                >
                  Next <KeyboardArrowRightIcon />
                </button>
              </div>
              <div> {getStepContent(activeStep)}</div>
            </Paper>
          </div>
        </main>
      </div>
    </div>
  );
}

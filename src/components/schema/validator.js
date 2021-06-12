import * as Yup from "yup";

export const RegisterInfo = Yup.object({
  username: Yup.string()
    .min(4, "Username must be at least 4 charaters")
    .required("Username is required"),
  email: Yup.string().email("Email is invalid").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 charaters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password must match")
    .required("Confirm password is required"),
  role: Yup.string().required("Need to select role"),
});

export const LoginInfo = Yup.object({
  username: Yup.string()
    .min(4, "Username must be at least 4 charaters")
    .required("Username is required"),

  password: Yup.string()
    .min(8, "Password must be at least 8 charaters")
    .required("Password is required"),
});

export const ProjectInfo = Yup.object({
  name: Yup.string()
    .min(4, "Project name must be at least 4 charaters")
    .required("Project name is required"),
});

export const DatasetInfo = Yup.object({
  name: Yup.string()
    .min(4, "Dataset name must be at least 4 charaters")
    .required("Dataset name is required"),
});

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Paper, Typography } from "@material-ui/core";
import { EmailOutlined } from "@material-ui/icons";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { useLocation, Link } from "react-router-dom";
import { process } from "autoprefixer";

export default function VerifyEmail() {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  let query = useQuery();
  let uuid = query.get("uuid");
  let baseUrl;
  if (process.env.NODE_ENV === "production") {
    baseUrl = process.env.REACT_APP_API_URL_PRODUCTION;
  } else {
    baseUrl = process.env.REACT_APP_API_URL_DEV;
  }
  const [sent, setSent] = useState(false);
  const [resent, setResent] = useState(true);
  const [info, setInfo] = useState({
    username: "example",
    email: "example@mail.com",
    expire: "10 minues",
    isVerified: false,
    verifiedTime: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `${baseUrl}/api/v1/check/verify-email?uuid=${uuid}`
      );

      setInfo({
        email: result.data.email,
        isVerified: result.data.isVerified,
        expire: "10 minues",
        username: result.data.username,
        verifiedTime: result.data.verifiedTime,
      });
    };

    fetchData();
  }, [uuid]);

  const sendemail = () => {
    const payload = {
      username: info.username,
      profile_uuid: uuid,
      email: info.email,
    };

    axios
      .post(`${baseUrl}/api/v1/send/confrim-email`, payload)
      .then((response) => {
        if (response.status === 200) {
          setSent(true);
          setTimeout(() => {
            setResent(false);
          }, 600000);
        }
      });
  };
  const date = String(new Date(info.verifiedTime));

  return (
    <div>
      <div className="flex justify-center">
        <Paper
          style={{
            width: "580px",
            height: "350px",
          }}
          className="m-32 p-10 w-96 flex justify-center"
        >
          {!info.isVerified ? (
            <div>
              {!sent ? (
                <div>
                  <EmailOutlined className="text-green-500 w-64 font-bold" />
                  <Typography>
                    <h1 className="mt-2 title text-3xl font-extrabold">
                      {" "}
                      Please verify your email{" "}
                    </h1>
                    <p className="mt-4 font-semibold">
                      {" "}
                      Verification link will send to{" "}
                      <span className="font-bold text-green-500">
                        {info.email}
                      </span>{" "}
                    </p>
                    <p className="mt-5 font-bold text-red-600">
                      * Verify link will vilid for{" "}
                      <span className=" title font-extrabold">
                        {info.expire}
                      </span>
                    </p>
                  </Typography>
                  <button
                    className="mt-10 w-32 p-3 bg-green-400 text-white font-bold rounded-3xl  ring-4 ring-green-300 hover:bg-green-500"
                    onClick={sendemail}
                  >
                    Send
                  </button>
                </div>
              ) : (
                <div>
                  <Typography>
                    <h1 className="title text-3xl font-extrabold">
                      {" "}
                      Email has sent !
                    </h1>
                    <p className="mt-4 font-semibold">
                      {" "}
                      Verify link will send to{" "}
                      <span className="font-bold text-green-500">
                        {info.email}
                      </span>{" "}
                    </p>
                    <p className="mt-5 font-bold text-red-600">
                      * If your don't receive email in {info.expire} please
                      refresh this page and try to send again
                    </p>
                  </Typography>
                  <button
                    disabled={resent}
                    className="mt-10 w-32 p-3 text-white font-bold rounded-3xl ring-4 ring-green-300 bg-green-400  disabled:bg-red-400 hover:bg-green-500"
                    onClick={sendemail}
                  >
                    Resend
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div>
              <CheckCircleIcon className="mt-5 text-green-500 w-64 font-bold" />
              <Typography className="mt-64">
                <h1 className="mt-5 title text-3xl font-extrabold">
                  Your account has been verified
                </h1>
                <p className="mt-5 title font-bold break-words">
                  Verified Time:{date}{" "}
                </p>
                <Link to="/login">
                  <button className="m-10 w-32 p-3 bg-green-400 text-white font-bold rounded-3xl ring-4 ring-green-300 hover:bg-green-500">
                    Go to login
                  </button>
                </Link>
              </Typography>
            </div>
          )}
        </Paper>
      </div>
    </div>
  );
}

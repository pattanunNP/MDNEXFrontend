import React, { useState, useEffect } from "react";
import axios from "axios";
import { Paper, Typography } from "@material-ui/core";
import { EmailOutlined } from "@material-ui/icons";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { useLocation, Link } from "react-router-dom";
import Lottie from "react-lottie";
import loadingAnimation from "../../components/animation/loading.json";

export default function VerifyEmail() {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  let query = useQuery();
  let uuid = query.get("uuid");
  let baseUrl = process.env.REACT_APP_API_URL;
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState({
    username: "example",
    email: "example@mail.com",
    expire: "10 minues",
    isVerified: false,
    verifiedTime: "",
  });

  useEffect(() => {
    const fetchData = () => {
      axios(`${baseUrl}/api/v1/check/verify-email?uuid=${uuid}`).then(
        (response) => {
          setInfo({
            email: response.data.email,
            isVerified: response.data.isVerified,
            expire: "10 minues",
            username: response.data.username,
            verifiedTime: response.data.verifiedTime,
          });
        }
      );

      setLoading(false);
    };
    setLoading(true);
    setTimeout(() => {
      fetchData();
    }, 2000);
  }, [uuid, baseUrl]);

  const sendemail = () => {
    const payload = {
      username: info.username,
      profile_uuid: uuid,
      email: info.email,
    };
    setTimeout(() => {
      axios
        .post(`${baseUrl}/api/v1/send/confrim-email`, payload)
        .then((response) => {
          if (response.status === 200) {
            setSent(true);
          }
        });
      setLoading(false);
    }, 2000);
  };
  const date = String(new Date(info.verifiedTime));

  return (
    <div>
      {loading ? (
        <div className="flex justify-center">
          <Lottie
            style={{
              marginTop: "30px",
            }}
            options={defaultOptions}
            height={500}
            width={500}
          />
        </div>
      ) : (
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
                    <EmailOutlined className="text-green-500 w-64 font-bold" />
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
      )}
    </div>
  );
}

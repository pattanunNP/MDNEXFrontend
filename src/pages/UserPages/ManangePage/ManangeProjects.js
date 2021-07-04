import React from "react";
import axios from "axios";
import useSWR from "swr";
import { useHistory, Link } from "react-router-dom";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { Paper, Typography } from "@material-ui/core";

import Sidenavbar from "../../../components/objects/Sidenavbar";

async function FetchProjects(path) {
  const url = process.env.REACT_APP_API_URL;
  const access_token = sessionStorage.getItem("access_token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${access_token}`,
  };

  const response = await axios.get(`${url}${path}`, { headers: headers });

  if (!response.statusText === "OK") {
    const error = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    error.info = await response.data;
    error.status = response.status;
    throw error;
  }
  console.log(response.data);
  return response.data.match;
}
export default function ManangeProjects() {
  const history = useHistory();

  const options = { suspense: true };
  const { data: projects } = useSWR(
    "/api/v1/userprojects",
    FetchProjects,
    options
  );
  return (
    <div className="bg-right-top bg-auto bg-no-repeat bg-fixed bg-mainbackground2 flex h-screen">
      <Sidenavbar />

      <div className="flex flex-col flex-1 w-full overflow-y-auto">
        <header className="grid justify-items-stretch py-1 bg-gray-800 h-16"></header>

        <main>
          <div className="z-10 col-span-12 mt-5">
            <Paper
              className=" m-10 w-sceen h-screen"
              style={{
                background: "rgba(255, 255, 255, 0.5 )",
                boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
                backdropFilter: "blur( 5.0px )",
                borderRadius: "20px",
                border: "1px solid rgba( 255, 255, 255, 0.18 )",
              }}
            >
              <Typography className="flex justify-center">
                <h1 className="mt-10 font-bold text-3xl text-gray-500">
                  {" "}
                  Projects Manager
                </h1>
              </Typography>
              <div className="mt-5 flex justify-center">
                <button
                  onClick={() => {
                    history.push("/dashboard/projects/newproject");
                  }}
                  className="p-2 transition duration-500 ease-in-out bg-green-400 text-white w-48 font-bold rounded-full hover:bg-green-500 filter drop-shadow-lg  transform hover:-translate-y-1 hover:scale-10"
                >
                  <AddCircleIcon />
                  Create New Projects
                </button>
              </div>
              <div className="mt-10 flex justify-center">
                <Typography>
                  <h1 className="text-3xl font-semibold">OR</h1>
                </Typography>
              </div>
              <div className="mt-10 flex justify-center">
                <Typography>
                  <h1 className="text-xl font-semibold text-gray-500">
                    Select Below
                  </h1>
                </Typography>
              </div>
              <div className="mt-20 flex justify-center container mx-auto overflow-y-auto h-96">
                <div className="grid md:grid-cols-3 gap-8 sm:grid-cols-1">
                  {projects.length > 0 ? (
                    projects.map((project) => (
                      <div
                        className="shadow-md bg-white w-64 h-80 rounded-xl hover:shadow-xl"
                        key={project.project_uuid}
                      >
                        <img
                          alt="thumbnail"
                          src={project.project_thumbnail}
                          className="h-40 object-cover rounded-t-xl "
                        />
                        <p className="mt-3 flex justify-between text-green-500 text-sm p-1 font-bold">
                          <h1 className="orders-frist">
                            {" "}
                            {project.project_name}
                          </h1>
                        </p>
                        <div className="flex justify-center text-gray-400 text-sm">
                          <Link to={`/project/${project.project_uuid}`}>
                            <button className="mx-3 p-1 bg-blue-500 text-white rounded-xl text-sm w-16 shadow-sm">
                              Veiw
                            </button>
                          </Link>
                        </div>
                        <div className="mt-5 flex justify-center">
                          <button
                            className="p-1 bg-red-400 text-white w-32 rounded-3xl font-bold shadow-xl text-sm"
                            onClick={() => {
                              history.push(
                                `/dashboard/datasets/manage?projectuuid=${project.project_uuid}`
                              );
                            }}
                          >
                            Attach Dataset
                          </button>
                        </div>

                      </div>
                    ))
                  ) : (
                    <div>
                      <h1 className="text-xl font-semibold text-gray-500">
                        Your don't have any projects
                      </h1>
                    </div>
                  )}
                </div>
              </div>
            </Paper>
          </div>
        </main>
      </div>
    </div>
  );
}

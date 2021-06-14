import React, { useContext } from "react";

import { useHistory, Link } from "react-router-dom";
import { StoreContext } from "../../context/store";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import Sidenavbar from "../../components/objects/Sidenavbar";

import { Paper, Typography } from "@material-ui/core";

export default function ManangeProjects() {
  const { userData, userProjects } = useContext(StoreContext);

  const history = useHistory();

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
                <div className="grid grid-cols-3 gap-8">
                  {userProjects.length > 0 ? (
                    userProjects.map((project) => (
                      <div className="shadow-md bg-white w-64 h-80 rounded-xl hover:shadow-xl">
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
                        </p>{" "}
                        <p className="flex justify-start text-gray-500 text-sm p-2 ">
                          {project.project_description !== null
                            ? project.project_description
                            : "no description"}
                        </p>
                        <Link to={`/project/${project.project_uuid}`}>
                          <button className="mx-3 p-1 bg-blue-500 text-white rounded-xl text-sm w-16 shadow-sm">
                            Veiw
                          </button>
                        </Link>
                        <p className="flex justify-center text-gray-400 text-sm">
                          Owner:
                          <a href={`/profile/${project.project_owner_uuid}`}>
                            {project.project_owner_name}
                          </a>
                        </p>
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

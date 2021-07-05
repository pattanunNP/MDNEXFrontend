import React, { useContext } from "react";
import FadeIn from "react-fade-in";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import { IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Link } from "react-router-dom";
import useSWR from "swr";
import axios from "axios"
import { StoreContext } from "../../context/store";

async function FetchImage(path) {
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
  // console.log(response.data);
  return response.data
}

export default function LabelBrowser(props) {
  const { openSidebar, setOpenSidebar } = useContext(StoreContext);
  const task_id = props.task_id
  const options = { suspense: true };
  const { data: image } = useSWR(
    `/api/v1/labeling/gettasks?task_id=${task_id}`,
    FetchImage,
    options
  );
  return (
    <aside
      className={`${openSidebar === true
        ? `z-40 bg-gray-800 h-screen shadow-xl overflow-y-auto overflow-x-hidden w-96 transition delay-300 ease-in-out`
        : `z-40 bg-gray-800 h-screen shadow-xl overflow-y-auto overflow-x-hidden w-16 transition delay-300 ease-in-out `
        }`}
    >
      {" "}
      <FadeIn>
        <div className="flex flex-col">
          <div className="flex justify-start"> <a href="/dashboard" className="w-16"> <img
            alt="logo"
            src="https://res.cloudinary.com/image-chatbot/image/upload/v1623756618/MD_NEX/Purple_Event_Styling_Logo_7_ixrzkq.png"

          /></a></div>
          <div className="flex justify-start">


            <IconButton
              className="w-16 h-16"
              onClick={() => {
                setOpenSidebar(!openSidebar);
              }}
            >
              <MenuOpenIcon className="text-green-500" />
            </IconButton>
            {openSidebar ? (
              <div>
                <div className="my-5 flex justify-center">
                  <h1 className="title text-green-400 text-3xl">
                    Image Browser
                  </h1>
                </div>

                <div className=" bg-gray-700 h-full w-full border-2 border-green-300">

                  {Object.keys(image.task).map((item, idx) => (

                    < Link to={`/dashboard/labeltool/${task_id}?queue_id=${item}`}>
                      <button
                        key={item}
                        className=" mt-1 shadow-xl p-2 bg-gray-800 w-full h-28 text-white hover:bg-gray-700"
                      >

                        <div className="grid grid-cols-4 gap-2">
                          <div> {idx}</div>

                          <div>


                            <img
                              alt="thumnail"
                              className="w-16 h-16"
                              src={image.task[item].image.file_url}
                            />{" "}
                            <div className="text-sm truncate">{image.task[item].image.filename}</div>
                            <div className="text-sm text-gray-300">
                              &nbsp;id&nbsp;
                              {item}
                            </div>
                          </div>

                          <div>
                            <IconButton>
                              <MoreVertIcon className="text-green-400 hover:text-green-500" />
                            </IconButton>
                          </div>
                        </div>
                      </button>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </FadeIn>
    </aside >
  );
}

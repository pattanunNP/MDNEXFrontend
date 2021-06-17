import React, { useContext } from "react";
import FadeIn from "react-fade-in";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import { IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/store";
export default function LabelBrowser() {
  const { openSidebar, setOpenSidebar } = useContext(StoreContext);
  const mockdata = [
    {
      id: "1",
      name: "12.jpg",
      last_edit: "pattanun",
      last_edit_time: "1 month ago",
      is_Labeled: true,
      image:
        "https://res.cloudinary.com/image-chatbot/image/upload/v1623427934/MD_NEX/image1_howum6.png",
    },
    {
      id: "2",
      name: "12.jpg",
      last_edit: "pattanun",
      last_edit_time: "1 month ago",
      image:
        "https://res.cloudinary.com/image-chatbot/image/upload/v1623427934/MD_NEX/image1_howum6.png",
    },
    {
      id: "3",
      name: "12.jpg",
      last_edit: "pattanun",
      last_edit_time: "1 month ago",
      is_Labeled: true,
      image:
        "https://res.cloudinary.com/image-chatbot/image/upload/v1623427934/MD_NEX/image1_howum6.png",
    },
    {
      id: "4",
      name: "12.jpg",
      last_edit: "pattanun",
      last_edit_time: "1 month ago",
      is_Labeled: true,
      image:
        "https://res.cloudinary.com/image-chatbot/image/upload/v1623427934/MD_NEX/image1_howum6.png",
    },
    {
      id: "5",
      name: "12.jpg",
      last_edit: "pattanun",
      last_edit_time: "1 month ago",
      is_Labeled: true,
      image:
        "https://res.cloudinary.com/image-chatbot/image/upload/v1623427934/MD_NEX/image1_howum6.png",
    },
    {
      id: "6",
      name: "image2.jpg",
      last_edit: "pattanun",
      last_edit_time: "1 month ago",
      is_Labeled: true,
      url: "/2",
      image:
        "https://res.cloudinary.com/image-chatbot/image/upload/v1623427934/MD_NEX/image1_howum6.png",
    },
    {
      id: "7",
      name: "12.jpg",
      last_edit: "pattanun",
      last_edit_time: "1 month ago",
      is_Labeled: false,
      url: "/2",
      image:
        "https://res.cloudinary.com/image-chatbot/image/upload/v1623427934/MD_NEX/image1_howum6.png",
    },
    {
      id: "8",
      name: "12.jpg",
      last_edit: "pattanun",
      last_edit_time: "1 month ago",
      is_Labeled: false,
      url: "/2",
      image:
        "https://res.cloudinary.com/image-chatbot/image/upload/v1623427934/MD_NEX/image1_howum6.png",
    },
    {
      id: "9",
      name: "12.jpg",
      last_edit: "pattanun",
      last_edit_time: "1 month ago",
      is_Labeled: false,
      url: "/2",
      image:
        "https://res.cloudinary.com/image-chatbot/image/upload/v1623427934/MD_NEX/image1_howum6.png",
    },
    {
      id: "10",
      name: "12.jpg",
      last_edit: "pattanun",
      last_edit_time: "1 month ago",
      is_Labeled: false,
      url: "/2",
      image:
        "https://res.cloudinary.com/image-chatbot/image/upload/v1623427934/MD_NEX/image1_howum6.png",
    },
    {
      id: "11",
      name: "12.jpg",
      last_edit: "pattanun",
      last_edit_time: "1 month ago",
      is_Labeled: false,
      url: "/2",
      image:
        "https://res.cloudinary.com/image-chatbot/image/upload/v1623427934/MD_NEX/image1_howum6.png",
    },
  ];
  return (
    <aside
      className={`${
        openSidebar === true
          ? `z-40 bg-gray-800 h-screen shadow-xl overflow-y-auto overflow-x-hidden w-96 transition delay-300 ease-in-out`
          : `z-40 bg-gray-800 h-screen shadow-xl overflow-y-auto overflow-x-hidden w-16 transition delay-300 ease-in-out `
      }`}
    >
      {" "}
      <FadeIn>
        <div className="flex flex-col">
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
                  {mockdata.map((item, id) => (
                    <Link to={item.url}>
                      <button
                        key={id}
                        className=" mt-1 shadow-xl p-2 bg-gray-800 w-full h-28 text-white hover:bg-gray-700"
                      >
                        <div className="grid grid-cols-4 gap-2">
                          <div>
                            {" "}
                            <img
                              alt="thumnail"
                              className="w-16 h-16"
                              src={item.image}
                            />{" "}
                            <div className="text-sm">{item.name}</div>
                            <div className="text-sm text-gray-300">
                              &nbsp;by&nbsp;
                              {item.last_edit}
                            </div>
                          </div>

                          <div className="text-sm text-gray-400">
                            {item.last_edit_time}
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
    </aside>
  );
}

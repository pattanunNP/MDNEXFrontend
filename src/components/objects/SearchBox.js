import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import SearchIcon from "@material-ui/icons/Search";

import { IconButton, Tooltip } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";

export default function SearchBox(props) {
  const [searchQuery, setSearchQuery] = useState("");
  const inputElement = useRef("");
  const [matchedQuery, setMatchedQuery] = useState([]);
  const [invite, setInvite] = useState({});

  useEffect(() => {
    let access_token = sessionStorage.getItem("access_token");
    let baseUrl = process.env.REACT_APP_API_URL;

    if (searchQuery.length > 0) {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      };

      axios
        .get(`${baseUrl}/api/v1/search?query=${inputElement.current.value}`, {
          headers: headers,
        })
        .then((response) => {
          setMatchedQuery([]);
          // console.log(response.data.match);
          setMatchedQuery(response.data.match);
        });
    } else {
      setMatchedQuery([]);
    }
  }, [searchQuery]);
  function handleSearch(e) {
    console.log(e.target.value);
    setSearchQuery(e.target.value);
  }

  function role_color(role) {
    let color;
    if (role === "admin") {
      color = "justify-self-start font-semibold bg-red-300 p-1 rounded-xl";
    } else if (role === "co-responding") {
      color = "justify-self-start font-semibold bg-blue-300 p-1 rounded-xl";
    } else if (role === "labeler") {
      color = "justify-self-start font-semibold bg-yellow-300 p-1 rounded-xl";
    } else if (role === "researcher") {
      color = "justify-self-start font-semibold bg-pink-300 p-1 rounded-xl";
    } else if (role === "visitor") {
      color = "justify-self-start font-semibold bg-green-200 p-1 rounded-xl";
    }
    return color;
  }
  return (
    <div className="z-30 relative flex w-96 flex-wrap items-stretch">
      <input
        ref={inputElement}
        type="search"
        placeholder="Search"
        name="search"
        onChange={handleSearch}
        className="my-2 form-input px-2 py-2  h-10 placeholder-green-300 text-green-400 relative bg-gray-200 rounded-lg text-sm shadow outline-none  focus:outline-none focus: w-full pr-10 rounded-b-lg"
      />
      <span className="h-full leading-snug font-normal  text-center text-gray-400 absolute bg-transparent rounded-lg text-base items-center justify-center w-8 right-0 pr-3 py-3">
        <SearchIcon />
      </span>
      {matchedQuery.length > 0 ? (
        <div className="z-40 overflow-y-auto overflow-x-hidden ">
          <ul className="z-0 w-96 h-64">
            {matchedQuery.map((search) => (
              <li
                style={{
                  background: "rgba(20, 20, 20, 0.4 )",
                  backdropFilter: "blur( 5.0px )",
                }}
                className="flex justify-between  rounded-b-sm  h-24 p-3 w-full"
                key={search.uuid}
              >
                <div className="order-3 opacity-100">
                  <img
                    alt="profile_img"
                    src={search.profileimage}
                    className="border-2 border-green-400  w-8 h-8 justify-self-start rounded-full flex items-center justify-center"
                  />
                  <div className="order-5">
                    <span className="font-bold text-white">
                      {search.username}
                    </span>
                  </div>
                  <div className="order-last">
                    <span className={role_color(search.role)}>
                      {search.role}
                    </span>
                  </div>
                </div>
                <div className="order-last">
                  <Tooltip title="Send Invite">
                    <IconButton
                      onClick={() => {
                        setInvite({
                          ...invite,
                          uuid: search.uuid,
                          email: search.email,
                          username: search.username,
                          expire: "1 days",
                        });
                      }}
                    >
                      <SendIcon className="text-green-300 hover:text-green-400" />
                    </IconButton>
                  </Tooltip>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

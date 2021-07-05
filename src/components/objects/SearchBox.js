import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import SearchIcon from "@material-ui/icons/Search";

import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { Link } from "react-router-dom";
export default function SearchBox(props) {
  const [searchQuery, setSearchQuery] = useState("");
  const inputElement = useRef("");
  const [matchedQuery, setMatchedQuery] = useState([]);


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
      color = "ml-20 justify-self-start font-semibold bg-red-300 p-1 rounded-xl";
    } else if (role === "co-responding") {
      color = "ml-20 justify-self-start font-semibold bg-blue-300 p-1 rounded-xl";
    } else if (role === "labeler") {
      color = "ml-20 justify-self-start font-semibold bg-yellow-300 p-1 rounded-xl";
    } else if (role === "researcher") {
      color = "ml-20 justify-self-start font-semibold bg-pink-300 p-1 rounded-xl";
    } else if (role === "visitor") {
      color = "ml-20 justify-self-start font-semibold bg-green-200 p-1 rounded-xl";
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
        className="my-2 form-input px-2 py-2  h-10 placeholder-gray-700 text-gray-800 relative bg-gray-200 rounded-lg text-sm shadow outline-none  focus:outline-none focus: w-full pr-10 rounded-b-lg"
      />
      <span className="h-full leading-snug font-normal  text-center text-gray-400 absolute bg-transparent rounded-lg text-base items-center justify-center w-8 right-0 pr-3 py-3">
        <SearchIcon />
      </span>
      {matchedQuery.length > 0 ? (
        <div className="z-40 overflow-y-auto overflow-x-hidden ">
          <List className="z-0 w-96 h-64">
            {matchedQuery.map((search) => (
              <Link to={`/profile/${search.uuid}`}>
                <button className=" w-full"

                >
                  <ListItem
                    style={{
                      background: "rgba(20, 20, 20, 0.4 )",
                      backdropFilter: "blur( 5.0px )",
                    }}
                    className=" h-16  w-full"
                    key={search.uuid}
                  >

                    <ListItemAvatar>
                      <Avatar>
                        <img
                          alt="profile_img"
                          src={search.profileimage}
                          className="border-2 border-green-400  w-10 h-10 rounded-full flex items-center "
                        />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                    >
                      <span className="font-bold text-white">
                        {search.username}
                      </span><br></br>
                      <span className={role_color(search.role)}>
                        {search.role}
                      </span>
                    </ListItemText>



                    <Divider variant="inset" component="li" />
                  </ListItem>
                </button>
              </Link>
            ))}
          </List>
        </div >
      ) : (
        <div></div>
      )
      }
    </div >
  );
}

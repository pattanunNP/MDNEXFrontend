import { useEffect, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../../context/store";

export default function useDashboardFetch(url, access_token) {
  const { setUserData, setUserProjects } = useContext(StoreContext);

  useEffect(() => {
    async function fetchData() {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      };
      await axios
        .get(`${url}/api/v1/dashboard`, { headers: headers })
        .then((response) => {
          setUserData(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
    fetchData();
  }, [setUserData, url, access_token]);

  useEffect(() => {
    async function fetchProjects() {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      };
      await axios
        .get(`${url}/api/v1/userprojects`, { headers: headers })
        .then((response) => {
          setUserProjects(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
    fetchProjects();
  }, [setUserProjects, url, access_token]);
}
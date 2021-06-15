import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import EditIcon from "@material-ui/icons/Edit";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import useSWR, { mutate } from "swr";
import { Link } from "react-router-dom";

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
export default function ProjectsTabel(props) {
  const url = process.env.REACT_APP_API_URL;
  const access_token = sessionStorage.getItem("access_token");
  function ConvertTime(timestamp) {
    const time = new Date(timestamp).toLocaleDateString("en-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    return time;
  }
  async function handleDelete(uuid) {
    let payload = {
      project_uuid: uuid,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    };
    axios
      .post(`${url}/api/v1/delete/project`, payload, { headers: headers })
      .then((res) => {
        mutate("/api/v1/userprojects");
        mutate("/api/v1/dashboard");
      });
  }
  const options = { suspense: true };

  const { data: projects } = useSWR(
    "/api/v1/userprojects",
    FetchProjects,
    options
  );

  return (
    <div className="grid gap-2 grid-cols-1 lg:grid-cols-1">
      <div className=" p-4 rounded-lg">
        <h2 className="title text-green-400 font-bold">Projects</h2>
        <div className="mt-4">
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto">
              <div className="py-2 align-middle inline-block min-w-full">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg bg-white h-64 overflow-x-auto overflow-y-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                          <div className="flex cursor-pointer">
                            <span className="mr-2">PROJECTS NAME</span>
                          </div>
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                          <div className="flex cursor-pointer">
                            <span className="mr-2">Labels</span>
                          </div>
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                          <div className="flex cursor-pointer">
                            <span className="mr-2">STATUS</span>
                          </div>
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                          <div className="flex cursor-pointer">
                            <span className="mr-2">ACTION</span>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    {projects.length > 0 ? (
                      <tbody class="bg-white divide-y divide-gray-200">
                        {projects.map((item) => (
                          <tr key="project_uuid">
                            <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                              <p>{item.project_name}</p>
                              <div>
                                <p className="text-xs text-gray-400">
                                  ProjectDescription: {item.project_description}
                                </p>
                                <p className="text-xs text-gray-300">
                                  ProjectID: {item.project_uuid}&nbsp;&nbsp;
                                  <span
                                    className="text-green-400 hover:text-green-500"
                                    onClick={() => {
                                      navigator.clipboard.writeText(
                                        item.project_uuid
                                      );
                                    }}
                                  >
                                    <i classNameName="fas fa-copy" />
                                  </span>
                                </p>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                              <p>77</p>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                              {!item.isDeactive ? (
                                <div class="flex text-green-500">
                                  <CheckCircleOutlineIcon />
                                  <p>
                                    {ConvertTime(item.project_last_modified)}
                                  </p>
                                </div>
                              ) : (
                                <div className="flex text-red-500">
                                  <RemoveCircleIcon />
                                  <p>
                                    {ConvertTime(item.project_last_modified)}
                                  </p>
                                </div>
                              )}
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                              <div class="flex space-x-4">
                                <div class="flex justify-center">
                                  <Link
                                    to={`/project/${item.project_uuid}`}
                                    class="text-blue-500 hover:text-blue-600"
                                  >
                                    <EditIcon />
                                    <p>Edit</p>
                                  </Link>
                                </div>

                                <div className="flex justify-center">
                                  <button
                                    onClick={() => {
                                      handleDelete(item.project_uuid);
                                    }}
                                    className="text-red-500 hover:text-red-600"
                                  >
                                    <DeleteIcon />
                                    <p>Delete</p>
                                  </button>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    ) : (
                      <tbody className="bg-white divide-y divide-gray-200 flex justify-center ">
                        <tr className="flex justify-center">
                          <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                            <div>
                              <p>Your Don't have any projects</p>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    )}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

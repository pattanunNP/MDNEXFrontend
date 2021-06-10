import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
export default function ProjectsTabel(props) {
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

  return (
    <div className="grid gap-2 grid-cols-1 lg:grid-cols-1">
      <div className=" p-4 rounded-lg">
        <h2 className="title text-green-400 font-bold">Projects</h2>
        <div className="mt-4">
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto">
              <div className="py-2 align-middle inline-block min-w-full">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg bg-white h-96 overflow-x-auto overflow-y-auto">
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
                            <span class="mr-2">Labels</span>
                          </div>
                        </th>
                        <th class="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                          <div class="flex cursor-pointer">
                            <span class="mr-2">STATUS</span>
                          </div>
                        </th>
                        <th class="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                          <div class="flex cursor-pointer">
                            <span class="mr-2">ACTION</span>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    {props.data !== undefined ? (
                      <tbody class="bg-white divide-y divide-gray-200">
                        {props.data.map((item) => (
                          <tr key="project_uuid">
                            <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                              <p>{item.project_name}</p>
                              <p class="text-xs text-gray-400">
                                ProjectDescription: {item.project_description}
                              </p>
                              <p class="text-xs text-gray-200">
                                ProjectID: {item.project_uuid}
                              </p>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                              <p>77</p>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                              {!item.isDeactive ? (
                                <div class="flex text-green-500">
                                  <CheckCircleOutlineIcon />
                                  <p>
                                    {ConvertTime(item.project_last_modified)}
                                  </p>
                                </div>
                              ) : (
                                <div class="flex text-red-500">
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
                                  <a
                                    href="/edit?id=dw22"
                                    class="text-blue-500 hover:text-blue-600"
                                  >
                                    <EditIcon />
                                    <p>Edit</p>
                                  </a>
                                </div>
                                <div class="flex justify-center">
                                  {!item.isDeactive ? (
                                    <a
                                      href="/edit?id=dw22"
                                      class="text-yellow-500 hover:text-yellow-600"
                                    >
                                      <RemoveCircleIcon />
                                      <p>Deactive</p>
                                    </a>
                                  ) : (
                                    <a
                                      href="/edit?id=dw22"
                                      class="text-gray-500 hover:text-gray-600"
                                    >
                                      <RemoveCircleIcon />
                                      <p>Deactive</p>
                                    </a>
                                  )}
                                </div>
                                <div class="flex justify-center">
                                  <a
                                    href="/delete?id=dw2222"
                                    class="text-red-500 hover:text-red-600"
                                  >
                                    <DeleteIcon />
                                    <p>Delete</p>
                                  </a>{" "}
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    ) : null}
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

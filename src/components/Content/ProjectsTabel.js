import CancelIcon from "@material-ui/icons/Cancel";

export default function ProjectsTabel(props) {
  return (
    <div className="grid gap-2 grid-cols-1 lg:grid-cols-1">
      <div className=" p-4 rounded-lg">
        <h2 className="title text-green-400 font-bold">Projects</h2>
        <div className="mt-4">
          <div className="flex flex-col">
            <div classNaem="-my-2 overflow-x-auto">
              <div className="py-2 align-middle inline-block min-w-full">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg bg-white">
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
                    <tbody class="bg-white divide-y divide-gray-200">
                      <tr>
                        <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                          <p>Bones Segmentation</p>
                          <p class="text-xs text-gray-400">Ortholpredic</p>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                          <p>77</p>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                          <div class="flex text-green-500">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="w-5 h-5 mr-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <p>Active 4 hours age</p>
                          </div>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                          <div class="flex space-x-4">
                            <a
                              href="/edit?id=dw22"
                              class="text-blue-500 hover:text-blue-600"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="w-5 h-5 mr-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                              <p>Edit</p>
                            </a>
                            <a
                              href="/delete?id=dw2222"
                              class="text-red-500 hover:text-red-600"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="w-5 h-5 mr-1 ml-3"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                              <p>Delete</p>
                            </a>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                    <tbody class="bg-white divide-y divide-gray-200">
                      <tr>
                        <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                          <p>Lung Covid</p>
                          <p class="text-xs text-gray-400">Respiratory</p>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                          <p>32</p>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                          <div class="flex text-green-500">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="w-5 h-5 mr-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <p>Active 3 months age</p>
                          </div>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                          <div class="flex space-x-4">
                            <a
                              href="/edit?id=dw22"
                              class="text-blue-500 hover:text-blue-600"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="w-5 h-5 mr-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                              <p>Edit</p>
                            </a>
                            <a
                              href="/delete?id=dwee22"
                              class="text-red-500 hover:text-red-600"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="w-5 h-5 mr-1 ml-3"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                              <p>Delete</p>
                            </a>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                    <tbody class="bg-white divide-y divide-gray-200">
                      <tr>
                        <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                          <p>Cancer Tissue Segement</p>
                          <p class="text-xs text-gray-400">Tissue</p>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                          <p>77</p>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                          <div class="flex text-red-500">
                            <CancelIcon className="text-red-400" />
                            <p>Deactived 4 hours ago</p>
                          </div>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                          <div class="flex space-x-4">
                            <a
                              href="/edit?id=dw22"
                              class="text-blue-500 hover:text-blue-600"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="w-5 h-5 mr-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                              <p>Edit</p>
                            </a>
                            <a
                              href="/delete?id=d12"
                              class="text-red-500 hover:text-red-600"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="w-5 h-5 mr-1 ml-3"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                              <p>Delete</p>
                            </a>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                    <tbody class="bg-white divide-y divide-gray-200">
                      <tr>
                        <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                          <p>Brain</p>
                          <p class="text-xs text-gray-400">Barin</p>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                          <p>77</p>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                          <div class="flex text-green-500">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="w-5 h-5 mr-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <p>Active 1 weeks ago</p>
                          </div>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                          <div class="flex space-x-4">
                            <a
                              href="/edit?id=dw22"
                              class="text-blue-500 hover:text-blue-600"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="w-5 h-5 mr-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                              <p>Edit</p>
                            </a>
                            <a
                              href="/delete?id=dw22"
                              class="text-red-500 hover:text-red-600"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="w-5 h-5 mr-1 ml-3"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                              <p>Delete</p>
                            </a>
                          </div>
                        </td>
                      </tr>
                    </tbody>
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

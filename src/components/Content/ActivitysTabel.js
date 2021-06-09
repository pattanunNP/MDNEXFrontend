export default function ActivitysTabel(props) {
  return (
    <div className="grid gap-2 grid-cols-1 lg:grid-cols-1">
      <div className=" p-4 rounded-lg">
        <h2 className="title text-green-400 font-bold">Activity</h2>
        <div className="mt-4">
          <div className="flex flex-col">
            <div classNaem="-my-2 overflow-x-auto">
              <div className="py-2 align-middle inline-block min-w-full">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg bg-white">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                          <div className="flex cursor-pointer"></div>
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                          <div className="flex cursor-pointer">
                            <span className="mr-2">USER</span>
                          </div>
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                          <div className="flex cursor-pointer">
                            <span class="mr-2">Labels</span>
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
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td>
                          <img
                            className="ml-3 w-10 h-10"
                            src="https://image.flaticon.com/icons/png/512/149/149071.png"
                            alt="user"
                          />
                        </td>
                        <td className="py-4 whitespace-no-wrap text-sm leading-5">
                          <p>Pattanun Numpong</p>
                          <p className="text-xs text-gray-400">Project owner</p>
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
                          <div class="flex text-green-500 hover:text-green-600">
                            <a href="project?id=2123">Created new project</a>
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

import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import StorageIcon from "@material-ui/icons/Storage";
import SettingsIcon from "@material-ui/icons/Settings";
import BuildIcon from "@material-ui/icons/Build";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import { useHistory } from "react-router-dom";
export default function Sidenavbar(props) {
  const history = useHistory();
  function handleLogout() {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("refresh_token");
    history.push("/login");
  }
  return (
    <aside className="z-20 flex-shrink-0 hidden w-60 pl-2 overflow-y-auto bg-gray-800 rounded-rb-2xl filter drop-shadow-lg md:block">
      <div>
        <div className="text-white">
          <div className="flex justify-center">
            <div className="grid grid-row-1">
              <a href="/">
                <img alt="logo" src="/favicon.ico" className="w-20" />
              </a>
              <img
                alt="user"
                className=" my-1 hidden h-24 w-24 rounded-full sm:block object-cover mr-2 border-4 border-green-400"
                src={props.profileImage}
              />
              <p className="font-bold text-green-500 pt-2 text-center w-24">
                {props.username}
              </p>
              <p className="font-normal  text-gray-200 pt-2 text-center w-24">
                {props.role}
              </p>

              <button
                onClick={handleLogout}
                className="mt-4 p-1 font-bold text-center rounded-lg bg-red-400 w-24 hover:bg-red-500"
              >
                <ExitToAppIcon /> Logout
              </button>
              <div>
                <ul className="mt-2 leading-10">
                  <li className="relative px-2 py-8 ">
                    <a
                      className="inline-flex items-center w-full text-sm font-semibold text-green-400 transition-colors duration-150 cursor-pointer hover:text-green-700"
                      href="/dashboard"
                    >
                      <DashboardIcon />

                      <span className="ml-6">DASHBOARD</span>
                    </a>
                  </li>
                  <li className="relative px-2 py-8 ">
                    <a
                      className="inline-flex items-center w-full text-sm font-semibold text-green-400 transition-colors duration-150 cursor-pointer hover:text-green-700"
                      href="/dashboard"
                    >
                      <PeopleIcon />

                      <span className="ml-6">TEAMS</span>
                    </a>
                  </li>
                  <li className="relative px-2 py-8 ">
                    <a
                      className="inline-flex items-center w-full text-sm font-semibold text-green-400 transition-colors duration-150 cursor-pointer hover:text-green-700"
                      href="/tool"
                    >
                      <BuildIcon />
                      <span className="ml-6">TOOLS</span>
                    </a>
                  </li>
                  <li className="relative px-2 py-8 ">
                    <a
                      className="inline-flex items-center w-full text-sm font-semibold text-green-400 transition-colors duration-150 cursor-pointer hover:text-green-700"
                      href="/data"
                    >
                      <StorageIcon />
                      <span className="ml-6">DATA</span>
                    </a>
                  </li>
                  <li className="relative px-2 py-8 ">
                    <a
                      className="inline-flex items-center w-full text-sm font-semibold text-green-400 transition-colors duration-150 cursor-pointer hover:text-green-700"
                      href="/setting"
                    >
                      <SettingsIcon />
                      <span className="ml-6">SETTING</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

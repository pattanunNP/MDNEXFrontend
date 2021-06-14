import { IconButton } from "@material-ui/core";

export default function TopBar(props) {
  return (
    <header className="z-40 h-16 w-screen  bg-gray-800">
      <div className="w-full h-16 flex justify-center">
        <div className=" grid grid-cols-4 gap-10">
          <div>
            <IconButton>
              <i className="fas fa-search-plus text-white w-8 h-5"></i>
              <p className="text-white">53%</p>
            </IconButton>{" "}
          </div>

          <div>
            <IconButton>
              <i className="fas fa-sun text-white w-8 h-5"></i>{" "}
              <p className="text-white">23</p>
            </IconButton>
          </div>
        </div>
      </div>
    </header>
  );
}

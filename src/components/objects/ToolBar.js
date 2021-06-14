// import { IconButton } from "@material-ui/core";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import EditIcon from "@material-ui/icons/Edit";
import TimelineIcon from "@material-ui/icons/Timeline";

export default function ToolBar(props) {
  // const mocktool = [
  //   {
  //     id: "1",
  //     name: "bone",
  //     toolname: "freehand",
  //     useAutoLabel: false,
  //     color: "#FF470D",
  //     icon: (
  //       <EditIcon
  //         style={{
  //           color: "#FF470D",
  //         }}
  //       />
  //     ),
  //   },
  //   {
  //     id: "2",
  //     name: "void",
  //     toolname: "bbox",
  //     useAutoLabel: true,
  //     color: "#8A72E7",
  //     icon: (
  //       <CheckBoxOutlineBlankIcon
  //         style={{
  //           color: "#8A72E7",
  //         }}
  //       />
  //     ),
  //   },
  //   {
  //     id: "3",
  //     name: "x-ray_tag",
  //     toolname: "polygon",
  //     useAutoLabel: false,
  //     color: "#FFCB6B",
  //     icon: (
  //       <TimelineIcon
  //         style={{
  //           color: "#FFCB6B",
  //         }}
  //       />
  //     ),
  //   },
  //   {
  //     id: "3",
  //     name: "x-ray_tag",
  //     toolname: "polygon",
  //     useAutoLabel: false,
  //     color: "#FFCB6B",
  //     icon: (
  //       <TimelineIcon
  //         style={{
  //           color: "#FFCB6B",
  //         }}
  //       />
  //     ),
  //   },
  //   {
  //     id: "3",
  //     name: "x-ray_tag",
  //     toolname: "polygon",
  //     useAutoLabel: false,
  //     color: "#FFCB6B",
  //     icon: (
  //       <TimelineIcon
  //         style={{
  //           color: "#FFCB6B",
  //         }}
  //       />
  //     ),
  //   },
  // ];
  const mockObject = [
    {
      id: "1",
      name: "bone",
      toolname: "freehand",
      useAutoLabel: false,
      color: "#FF470D",
      icon: (
        <EditIcon
          style={{
            color: "#FF470D",
          }}
        />
      ),
    },
    {
      id: "2",
      name: "void",
      toolname: "bbox",
      useAutoLabel: true,
      color: "#8A72E7",
      icon: (
        <CheckBoxOutlineBlankIcon
          style={{
            color: "#8A72E7",
          }}
        />
      ),
    },
    {
      id: "3",
      name: "x-ray_tag",
      toolname: "polygon",
      useAutoLabel: false,
      color: "#FFCB6B",
      icon: (
        <TimelineIcon
          style={{
            color: "#FFCB6B",
          }}
        />
      ),
    },
  ];
  return (
    <aside className="z-40 w-72 bg-gray-800  shadow-xl">
      <div className="flex flex-col ">
        {" "}
        <div className="flex justify-start ">
          <h1 className="mt-4 p-3 title text-green-400">Tool</h1>
        </div>
        <div className="mb-2 overflow-y-auto">
          {mockObject.map((object, id) => (
            <button
              key={id}
              className="mt-1 shadow-xl p-3 bg-gray-800 w-72 h-16 text-white hover:bg-gray-700"
            >
              <div className="grid grid-cols-4 gap-1">
                <div className=""> {object.icon}</div>

                <div className="text-sm">
                  {object.name}
                  <h1 className="text-gray-400 text-sm">{object.toolname}</h1>
                </div>
                <div className=" rounded-xl">
                  <svg width="20" height="20">
                    <rect
                      width="15"
                      height="15"
                      style={{
                        fill: object.color,
                      }}
                    />
                  </svg>
                </div>
              </div>
            </button>
          ))}
        </div>
        <div className="flex justify-start ">
          <h1 className="mt-4 p-3 title text-green-400">Object</h1>
        </div>
        <div className="mb-2 overflow-y-auto">
          {mockObject.map((object, id) => (
            <button
              key={id}
              className="mt-1 shadow-xl p-3 bg-gray-800 w-72 h-16 text-white hover:bg-gray-700"
            >
              <div className="grid grid-cols-4 gap-1">
                <div className=""> {object.icon}</div>

                <div className="text-sm">
                  {object.name}
                  <h1 className="text-gray-400 text-sm">{object.toolname}</h1>
                </div>
                <div className=" rounded-xl">
                  <svg width="20" height="20">
                    <rect
                      width="15"
                      height="15"
                      style={{
                        fill: object.color,
                      }}
                    />
                  </svg>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default function Navbar(props) {
  return (
    <nav className="p-1 bg-gray-800 relative select-none bg-grey lg:flex lg:items-stretch w-full">
      <div className="flex flex-no-shrink items-stretch h-12">
        {props.no_image === true ? (
          <a href="/" className="p-1">
            <img
              alt="logo"
              src="https://res.cloudinary.com/image-chatbot/image/upload/v1623151505/MDNEX_LOGO_250_NEON_xv8b2y.png"
              className="w-10 rounded-2xl"
            />
          </a>
        ) : null}

        <button className="block lg:hidden cursor-pointer ml-auto relative w-12 h-12 p-4">
          <svg
            className="fill-current text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div className="lg:flex lg:items-stretch lg:flex-no-shrink lg:flex-grow">
        <div className="lg:flex lg:items-stretch lg:justify-end ml-auto">
          <a
            href="/"
            className="flex-no-grow flex-no-shrink relative py-2 px-4 leading-normal text-green-500 no-underline flex items-center hover:bg-grey-dark font-bold"
          >
            Home
          </a>
          <a
            href={props.btn_link}
            className="flex-no-grow flex-no-shrink relative py-2 px-4 leading-normal text-red-500 no-underline flex items-center hover:bg-grey-dark font-bold"
          >
            {props.btn_name}
          </a>

          <a
            href="/dashboard"
            className="flex-no-grow flex-no-shrink relative py-2 px-4 leading-normal text-green-500 no-underline flex items-center hover:bg-grey-dark font-bold"
          >
            Dashboard
          </a>
        </div>
      </div>
    </nav>
  );
}

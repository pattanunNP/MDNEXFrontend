export default function Navbar() {
  return (
    <nav className=" bg-white relative select-none bg-grey lg:flex lg:items-stretch w-full">
      <div className="flex flex-no-shrink items-stretch h-12">
        <a
          href="/"
          className="flex-no-grow flex-no-shrink relative py-2 px-4 leading-normal text-blue-500 no-underline flex items-center hover:bg-grey-dark font-bold"
        >
          MD.Labeltools
        </a>

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
            href="/login"
            className="flex-no-grow flex-no-shrink relative py-2 px-4 leading-normal text-blue-500 no-underline flex items-center hover:bg-grey-dark font-bold"
          >
            Login
          </a>
          <a
            href="/dashboard"
            className="flex-no-grow flex-no-shrink relative py-2 px-4 leading-normal text-blue-500 no-underline flex items-center hover:bg-grey-dark font-bold"
          >
            Dashboard
          </a>
        </div>
      </div>
    </nav>
  );
}

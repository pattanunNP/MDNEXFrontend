import { Typography } from "@material-ui/core";
export default function Footer() {
  return (
    <div className="mt-5 p-3 bg-gray-800 w-full h-32">
      <div className="flex justify-center">
        <a
          href="https://github.com/pattanunNP"
          className="mx-3 font-medium text-black hover:text-blue-200 "
        >
          <img
            alt="developer git"
            className="bg-gray-200 p-0.5 w-8 rounded-3xl"
            src="https://cdn.iconscout.com/icon/free/png-512/github-154-675675.png"
          />
        </a>
      </div>
      <div className="flex justify-center">
        <Typography>
          <a
            href="/contact"
            className="mt-5 mx-5 font-medium text-white hover:text-blue-200 "
          >
            Contact us
          </a>

          <a
            href="/terms"
            className="mt-5 mx-5 font-medium text-white hover:text-blue-200"
          >
            Terms of use
          </a>
        </Typography>
      </div>
      <div className="flex justify-center">
        <Typography>
          <h1 className="mx-3 font-medium text-white">
            © 2021 PattanunNP All Right Reserved{" "}
          </h1>
        </Typography>
      </div>
    </div>
  );
}

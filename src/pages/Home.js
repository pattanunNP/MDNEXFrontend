/* This example requires Tailwind CSS v2.0+ */
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
// const navigation = [{ name: "Features", href: "#" }];

export default function Home() {
  return (
    <div>
      <Navbar btn_name={"Get Started"} btn_link={"/register"} />
      <div className="bg-right-top bg-auto bg-no-repeat bg-fixed bg-homebk w-full h-screen">
        <div className="mt-8 p-8 flex justify-start">
          <div className="justify-content-center">
            <img
              alt="logo"
              src="MDNEX_LOGO_250.png"
              className="rounded-3xl w-32"
            />
            <h3
              className="mt-5 title font-extrabold text-3xl"
              style={{
                color: "#F446A0",
              }}
            >
              The Next Generation of <br></br>Medical Images Dataset
            </h3>
            <p
              className="mt-3 title font-extrabold text-xl"
              style={{ color: "#4C59D7" }}
            >
              COLLECT INSPECT ANNOTATE
            </p>
            <div className="mt-10">
              <Link to="/register">
                <button className="mx-5 ring-4 ring-indigo-400 bg-indigo-400 p-3 font-extrabold text-white hover:bg-indigo-500">
                  GET STARTED
                </button>
              </Link>
              <Link to="/dashboard">
                <button className="mx-5 ring-4 ring-pink-400 bg-pink-400 p-3 font-extrabold text-white hover:bg-pink-500">
                  LIVE DEMO
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

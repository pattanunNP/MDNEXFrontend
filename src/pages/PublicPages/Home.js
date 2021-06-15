// Module Import
import React from "react";
import { Link } from "react-router-dom";

//Custrom Objects Import
import Navbar from "../../components/objects/Navbar";
import Footer from "../../components/objects/Footer";
// const navigation = [{ name: "Features", href: "#" }];

export default function Home() {
  return (
    <div>
      <Navbar btn_name={"Get Started"} btn_link={"/register"} />
      <div className="bg-right-top bg-auto bg-no-repeat bg-fixed bg-homebk w-full h-screen">
        <div className="ml-16 flex justify-start">
          <div className="justify-content-center">
            <img
              alt="logo"
              src="https://res.cloudinary.com/image-chatbot/image/upload/v1623756618/MD_NEX/Purple_Event_Styling_Logo_7_ixrzkq.png"
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
            <p className="mt-3 title font-extrabold text-xl lg:text-indigo-400 sm:text-white">
              COLLECT INSPECT ANNOTATE
            </p>
            <div className="mt-10">
              <Link to="/register">
                <button className="mr-5 ring-4 ring-indigo-400 bg-indigo-400 p-3 font-extrabold text-white hover:bg-indigo-500">
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

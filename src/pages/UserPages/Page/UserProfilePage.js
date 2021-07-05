import React from "react";
// import axios from "axios";
import { useParams } from "react-router-dom";
import Sidenavbar from "../../../components/objects/Sidenavbar";
export default function UserProfilePage() {
    let { uuid } = useParams();
    return (

        <>
            <div className="bg-right-top bg-auto bg-no-repeat bg-fixed bg-mainbackground2 flex h-screen">
                <Sidenavbar />
                {uuid}
            </div>
        </>
    )
}
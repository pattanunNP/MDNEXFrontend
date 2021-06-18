import React, { useState } from "react";
import { IconButton, Typography } from "@material-ui/core"
import FadeIn from "react-fade-in"
import PeopleIcon from '@material-ui/icons/People';
import NotificationsIcon from '@material-ui/icons/Notifications';


export default function NotifyBox() {
    const [openNotifyBox, setOpenNotifyBox] = useState(false);

    return (
        <div className="flex justify-end"> <div className="mt-5 grid grid-rows-1 gap-5">
            <IconButton className="w-24" onClick={
                () => {
                    setOpenNotifyBox(!openNotifyBox)
                }
            }>

                <NotificationsIcon className="flex text-white hover:text-green-400" />

            </IconButton>
            {openNotifyBox ? <FadeIn className="z-40 relative">

                <div
                    className=" my-20 w-96 h-64 overflow-y-auto rounded-2xl"
                    style={{
                        backgroundColor: "rgba(20, 20, 20, 0.4 )",
                        backdropFilter: "blur( 5.0px )",
                    }}
                >

                    <ul>
                        <li className="w-full p-2" style={{
                            backgroundColor: "rgba(20,20,20,0.2)",
                            borderRadius: "5px",
                            border: "1px solid rgba(255,255,255,0.6)"


                        }}>  <div className="mt-2 flex">
                                <PeopleIcon className="text-white bg-blue-500 p-1 m-2 order-frist rounded-full" />
                                <Typography className="order-5">
                                    <h1 className="title text-white font-bold"> Teams Alert</h1>
                                    <p className="text-sm text-gray-200">Arm create</p>
                                </Typography>
                            </div></li>


                    </ul>


                </div>
            </FadeIn> : null}


        </div></div>)
}
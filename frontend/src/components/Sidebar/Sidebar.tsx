import { motion } from "motion/react"
import { useState, type JSX } from "react";
import { LuRadius } from "react-icons/lu";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { MdHome } from "react-icons/md";
import { MdOutlineReceiptLong } from "react-icons/md";
import { NavLink } from "react-router";

type SIDE_MENU_TYPES = {
    name: string,
    icon: JSX.Element,
    path: string
}

const SIDE_MENU: SIDE_MENU_TYPES[] = [
    {
        name: "Overview",
        icon: <MdHome />,
        path: "/",
    },
    {
        name: "Transactions",
        icon: <MdOutlineReceiptLong />,
        path: "/transactions",
    }
]



const Sidebar = () => {
    const [isOpen, setOpen] = useState<boolean>(true);
    const handleMenu = () => {
        setOpen(!isOpen);
    }
    return (
        <motion.div
            initial={{ width: 220 }}
            animate={{ width: isOpen ? 220 : 80 }}
            className="h-full flex flex-col">
            <div className="flex items-center text-3xl font-bold font-nunito py-4 px-3 relative cursor-">
                <LuRadius className={`${isOpen ? "" : "ml-2"} text-[#401c94d8]`} />
                <h2 className={`${isOpen ? "inline-block" : "hidden"} ml-1`}>FinTracker</h2>
                {
                    isOpen ? <MdOutlineKeyboardDoubleArrowLeft className="absolute left-[93%] cursor-pointer" onClick={handleMenu} /> :
                        <MdOutlineKeyboardDoubleArrowRight className="absolute left-[80%] cursor-pointer" onClick={handleMenu} />
                }

            </div>
            <div>
                <span className={`${isOpen?"text-[12px] px-3 font-medium text-[#808080b9]":"text-[12px] pl-7 font-medium text-[#808080b9]"}`}>{isOpen ? "Controls" : "C"}</span>
                <div className="p-3 ">
                    {
                        SIDE_MENU.map(item => (
                            <NavLink
                                key={item.name}
                                to={item.path}

                                className={({ isActive }) => isActive ?
                                    `${isActive ? "bg-[#d3c4f56b]  flex items-center font-medium font-nunito px-4 py-2 rounded text-[#777575c9] my-1" : ""} ` : "my-1 flex items-center font-medium font-nunito px-4 py-2 rounded group hover:bg-[#d3c4f534] transition-all  duration-200 ease-in-out"}>
                                {
                                    ({ isActive }) => (
                                        <>
                                            <span className={`${isActive ? 'text-[#401c94d8]' : 'text-gray-500'} mr-[6px] text-[#4a4b4b81] font-extrabold text-[19px] group-hover:text-[#401c94d8]`}>{item.icon}</span>
                                        {isOpen?<span className={`${isActive?"text-[#401c94d8] font-bold":"font-bold group-hover:text-[#401c94d8]"}`}>{item.name}</span>:null}
                                        </>
                                    )
                                }

                            </NavLink>
                        ))
                    }
                </div>
            </div>
            <div></div>
        </motion.div>
    )
}

export default Sidebar
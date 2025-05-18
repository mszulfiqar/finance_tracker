import { tableHeaders, transactions } from "../../utils/utils";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import { getTranscation } from "../../services/api";
import { format } from "date-fns"


type TABLE_PROP_TYPES = {
    setIsOpen:()=>void
}

const Table = ({setIsOpen}:TABLE_PROP_TYPES) => {
    const {data, isLoading, isError, error} = useQuery({
        queryKey:["transactions-table"],
        queryFn:getTranscation
    })
    if (isLoading) return <p>Loading...</p>;
    console.log(data)
    // if (isError) return console.log(error)
    return (

        <div className="">

            <div className="flex justify-between  items-center  w-full mb-6 px-5">
                <div className="flex items-center">
                    <div>
                        <h2 className="font-nunito font-bold text-xl">Transactions</h2>
                        <p className="font-nunito font-medium text-[14px] text-[grey]">View all of your transactions</p>
                    </div>
                    <div className="ml-5">
                        <div className="border-[1.5px] border-[#808080d8] rounded-lg flex items-center h-fit px-2 py-1 w-[300px]">
                            <IoSearch className="font-bold " size={22} />
                            <input type="text" placeholder="Search transaction..." className="outline-none border-none ml-1.5 w-full" />
                        </div>
                    </div>

                </div>
                <div className="flex items-center">

                    <button onClick={setIsOpen} className="flex items-center bg-[#3d1697] text-[white] px-3 py-1 rounded-lg ml-4 cursor-pointer hover:bg-[#2E0D7E] transition-all">
                        <FaPlus className="mr-1 " />
                        <span>Add new Transcation</span>
                    </button>
                </div>

            </div>




            <table className="w-full  font-nunito text-[13px] overflow-auto">
                <tr className="border-b-[1px] border-[#e4e3e350] ">
                    {
                        tableHeaders.map(item => (
                            <th className="text-start pl-5 text-[grey] text-[14px] py-4">{item.value}</th>
                        ))
                    }
                </tr>
                {
                    data?.transactions?.map((item:any) => (
                        <tr key={item.id} className="text-[14px] border-b-[1px] border-[#e4e3e350] ">
                            <td className="pl-5 font-bold py-3">{item.title}</td>
                            <td className="pl-5 py-3">Rs.{item.amount}</td>
                            <td className={` pl-5 py-3`}>
                                <span className={`${item.type == "income" ? "bg-green-200 text-green-600" : "bg-red-200 text-red-500"} font-bold px-[8px] py-[3px] rounded-xl`}>{item.type}</span>
                            </td>
                            <td className="pl-5 py-3">{item.category}</td>
                            <td className="pl-5 py-3 text-blue-500">{format(item.date,"yyyy-MM-dd")}</td>
                            <td className="pl-5 py-3 text-[#525050c5] text-[20px] font-bold flex items-center">
                                <button className=" cursor-pointer "><MdDelete /></button>
                                <button className="ml-5 cursor-pointer"><MdEdit /></button>
                            </td>
                        </tr>
                    ))
                }
            </table>
        </div>
    )
}

export default Table
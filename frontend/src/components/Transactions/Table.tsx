import { tableHeaders} from "../../utils/utils.tsx";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteTranscation, getTranscation } from "../../services/transactions";
import { format } from "date-fns"
import { toast } from "sonner";
import { useState } from "react";
import EditTransaction from "./EditTransaction";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


type TABLE_PROP_TYPES = {
    setIsOpen: () => void
}

const Table = ({ setIsOpen }: TABLE_PROP_TYPES) => {
    const [openEdit, setOpenEdit] = useState(false);
    const [editData, seteditData] = useState<any>();
    const [seltectedType, setSetectedType] = useState<any>("");
    const [searchTerm, setSearchTerm] = useState<string>("");

    const queryClient = useQueryClient();

    const delete_transaction_mutation = useMutation({
        mutationFn: deleteTranscation,
        onSuccess: (data) => {
            toast(data.message)
            queryClient.invalidateQueries({ queryKey: ['transactions-table'] });
        },
        onError: (error) => {
            toast(error.message)
        }
    })
    const handleDelete = (id: any) => {
        seteditData(null)
        delete_transaction_mutation.mutate(id)
    }
    const handleEdit = (item: any) => {
        seteditData(item)

        setOpenEdit(true);
    }
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["transactions-table"],
        queryFn: getTranscation,
        staleTime: 2000
    })

    const handleChange = (value: string) => {

        setSetectedType(value);
    };

    const filteredData = data?.transactions?.filter((item: any) => {
        const matchesType =
            seltectedType === "" || seltectedType === "all" || item.type === seltectedType;

        const matchesSearch = item.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        return matchesType && matchesSearch;
    });
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading transactions: {error.message}</p>;
    if (!data || data.length === 0) return <p>No transactions found.</p>;
    // console.log(filteredData)
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
                            <input type="text" placeholder="Search transaction..." className="outline-none border-none ml-1.5 w-full"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)} />
                        </div>
                    </div>

                </div>
                <div className="flex items-center">
                    <div>
                        <Select onValueChange={handleChange} value={seltectedType}>
                            <SelectTrigger className="bg-white rounded-lg shadow-sm border-[1px] border-[grey]">
                                <SelectValue placeholder="Type" />
                            </SelectTrigger>
                            <SelectContent className="bg-white rounded-lg shadow-sm border-[1px] border-[grey] cursor-pointer">
                                <SelectItem value="income">Income</SelectItem>
                                <SelectItem value="expense">Expenses</SelectItem>
                                <SelectItem value="all">All</SelectItem>
                            </SelectContent>
                        </Select>

                    </div>
                    <button onClick={setIsOpen} className="flex items-center bg-[#3d1697] text-[white] px-3 py-1 rounded-lg ml-4 cursor-pointer hover:bg-[#2E0D7E] transition-all">
                        <FaPlus className="mr-1 " />
                        <span>Add new Transcation</span>
                    </button>
                </div>

            </div>




            <table className="w-full  font-nunito text-[13px] overflow-auto">
                <thead>
                    <tr className="border-b-[1px] border-[#e4e3e350] ">
                        {
                            tableHeaders.map(item => (
                                <th key={item.value} className="text-start pl-5 text-[grey] text-[14px] py-4">{item.value}</th>
                            ))
                        }
                    </tr>
                </thead>

                <tbody>
                    {isLoading ? null :
                        filteredData.map((item: any) => (
                            <tr key={item.id} className="text-[14px] border-b-[1px] border-[#e4e3e350] ">
                                <td className="pl-5 font-bold py-3">{item.title}</td>
                                <td className="pl-5 py-3">Rs.{item.amount}</td>
                                <td className={` pl-5 py-3`}>
                                    <span className={`${item.type == "income" ? "bg-green-200 text-green-600" : "bg-red-200 text-red-500"} font-bold px-[8px] py-[3px] rounded-xl`}>{item.type}</span>
                                </td>
                                <td className="pl-5 py-3">{item.category}</td>
                                <td className="pl-5 py-3 text-blue-500">{format(item.date, "yyyy-MM-dd")}</td>
                                <td className="pl-5 py-3 text-[#525050c5] text-[20px] font-bold flex items-center">
                                    <button className=" cursor-pointer " onClick={() => handleDelete(item.id)}><MdDelete /></button>
                                    <button className="ml-5 cursor-pointer" onClick={() => handleEdit(item)}><MdEdit /></button>

                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <EditTransaction isEditOpen={openEdit} setIsEditOpen={setOpenEdit} data={editData} />



        </div>
    )
}

export default Table
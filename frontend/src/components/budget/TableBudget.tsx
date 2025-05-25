import { tableHeaders_budget } from "@/utils/utils.tsx"
import { FaPlus } from "react-icons/fa"
import BudgetAddition from "./BudgetAddition"
import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { deleteBudget, getBudget } from "@/services/transactions"
import { MdDelete, MdEdit } from "react-icons/md"
import EditBudget from "./EditBudget"
import { toast } from "sonner"

const TableBudget = () => {
    const [openEdit, setOpenEdit] = useState(false)
    const [capture_for_edit, set_capture_for_edit] = useState()
    const [openBudgetForm, setOpenBudgetForm] = useState<boolean>(false);

    const handleBudgetForm = () => {
        setOpenBudgetForm(!openBudgetForm)
    }
    const handelEdit = (item: any) => {
        set_capture_for_edit(item)
        setOpenEdit(!openEdit)
    }
    const queryClient = useQueryClient();
    const deleteMutation = useMutation({
        mutationFn: deleteBudget,
        onSuccess:(data)=>{
            toast.success(data.message)
            queryClient.invalidateQueries({ queryKey: ['budgets'] });
            queryClient.invalidateQueries({ queryKey: ['budget-stats'] });
        },
        onError:(error:any)=>{
            toast.error(error?.response?.data.errorMessage)
        }
    })
    const handleDelete = (id:any) => {
        deleteMutation.mutate(id)
    }
    const { data, isLoading } = useQuery({
        queryKey: ["budgets"],
        queryFn: getBudget
    });
   
    
    if (isLoading) return <p>Loading...........</p>
    return (
        <>
            <div className="flex justify-between items-center   w-full mb-6 px-5 ">
                <div className="flex items-center">
                    <div>
                        <h2 className="font-nunito font-bold text-xl">Budget</h2>
                        <p className="font-nunito font-medium text-[14px] text-[grey]">Budget of the month</p>
                    </div>
                </div>
                {
                    data?.length == 7 ? null :
                        <button
                            onClick={handleBudgetForm}
                            className="flex items-center bg-[#3d1697] text-[white] px-3 py-1 rounded-lg ml-4 cursor-pointer hover:bg-[#2E0D7E] transition-all">

                            <FaPlus className="mr-1 " /><span>Add Budget</span>


                        </button>
                }
            </div>
            <table className="w-full  font-nunito text-[13px] overflow-auto ">
                <thead>
                    <tr className=" border-b-[1px] border-[#e4e3e350] w-full ">
                        {
                            tableHeaders_budget.map(item => (
                                <th key={item.value} className="  text-start pl-5 text-[grey] text-[14px] py-4">{item.value}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map((item: any) => {
                            const budgetProgressbar = item?.progressbar;
                            let progressBarColor = "bg-green-500";
                            if (budgetProgressbar > 75) progressBarColor = "bg-red-500";
                            else if (budgetProgressbar > 50) progressBarColor = "bg-yellow-500";
                            return (
                                <tr key={item.id} className="text-[14px] border-b-[1px] border-[#e4e3e350] ">
                                    <td className="pl-5 font-bold py-3">{item.category}</td>
                                    <td className="pl-5 py-3"><span className="font-bold">Rs.</span>{item.budgeted}</td>
                                    <td className="pl-5 py-3"><span className="font-bold">Rs.</span>{item.Totalspent}</td>
                                    <td className="pl-5 py-3">{item.remaining < 0 ? <><span className="text-red-500 font-bold">Over Spent Rs.({-1 * item.remaining})</span></> : <><span className="font-bold">Rs.</span><span>{item.remaining}</span></>}</td>
                                    <td className="px-5 py-3">
                                        <div className="relative w-full h-3 bg-muted rounded-full overflow-hidden">
                                            <div
                                                className={`h-full  ${progressBarColor}`}
                                                style={{ width: `${item.progressbar}%` }}
                                            />
                                        </div>
                                        <span className="text-xs text-gray-500 mt-1 inline-block">
                                            {item.progressbar}%
                                        </span>
                                    </td>
                                    <td className="pl-5 py-3 text-[#525050c5] text-[20px] font-bold flex items-center">
                                        <button className=" cursor-pointer "
                                         onClick={() => handleDelete(item.id)}
                                        ><MdDelete /></button>
                                        <button className="ml-5 cursor-pointer"
                                            onClick={() => handelEdit(item)}
                                        ><MdEdit /></button>

                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <EditBudget openEdit={openEdit} setIsEditOpen={setOpenEdit} data={capture_for_edit} />
            <BudgetAddition open={openBudgetForm} handle={handleBudgetForm} />
        </>
    )
}

export default TableBudget
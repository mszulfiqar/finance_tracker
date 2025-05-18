import { Controller, useForm } from "react-hook-form"
import { FaRegCalendarAlt } from "react-icons/fa";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { RxCross1 } from "react-icons/rx";
import { format } from "date-fns"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTranscation } from "../../services/api.ts";
import { ToastContainer, toast } from 'react-toastify';

type TRANSACTIONFORM_PROPS_TYPES = {
    setIsOpen: () => void,
}
const expenseCategories = ["Food", "Transport", "Utilities"];
const incomeCategories = ["Salary", "Bonus", "Freelance"];
const Transactionform = ({ setIsOpen }: TRANSACTIONFORM_PROPS_TYPES) => {
    const { register, handleSubmit, formState: { errors }, control, watch } = useForm();
    const type = watch("type");

    // const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createTranscation,
        onSuccess: (data) => {
            // queryClient.invalidateQueries(['data']);
            // console.log("Success",)
            toast.success(data.message)
        },
        onError: (error: any) => {
            // You can type error more specifically if you want
            toast.error(error.message)
            console.error('Error submitting data:', error);
        },
    });

    const fromHandler = async (data: any) => {
        setIsOpen()
        const formatedDate = format(data.date, "yyyy-MM-dd");
        const changedData = {
            title: data.title,
            amount: parseFloat(data.amount),
            category: data.category,
            type: data.type,
            description: data.description,
            date: formatedDate
        }
        mutation.mutate(changedData)
        console.log(changedData)
    }
    return (
        <div className="font-nunito px-5 overflow-auto">
            <div className="  pt-8 flex items-center justify-between">
                <div>
                    <h2 className="font-bold text-xl ">Add a new Transaction</h2>
                    <h2 className="font-nunito font-medium text-[14px] text-[grey]">Add details of transaction</h2>
                </div>
                <RxCross1 onClick={setIsOpen} className="text-[#3d1697] text-[30px] cursor-pointer p-1  bg-white border border-gray-200 rounded-2xl shadow " />
            </div>
            <form onSubmit={handleSubmit(fromHandler)} className="flex flex-col mt-8  ">
                <div className="flex items-center mb-4">
                    <div className="flex-col flex w-full">
                        <label htmlFor="title" className="text-black text-[15px] font-bold ">Title</label>
                        <input type="text" id="title" {...register("title", { required: "Please give the title", maxLength: 60 })} className="outline-none border-[1px] border-[grey] rounded px-2 py-1" />
                        {typeof errors.title?.message === "string" && (
                            <span className="text-red-500 text-sm">{errors.title.message}</span>
                        )}
                    </div>
                </div>

                <div className="flex mb-4">
                    <div className="flex-1">
                        <label htmlFor="amount" className="text-black text-[15px] font-bold ">Amount</label>
                        <input type="number" {...register("amount", { required: "Amount is missing" })} className="outline-none border-[1px] border-[grey] rounded px-2 py-1" />
                        {typeof errors.amount?.message === "string" && (
                            <span className="text-red-500 text-sm">{errors.amount.message}</span>
                        )}
                    </div>
                    <div className="flex-1 ml-2">
                        <label htmlFor="date" className="text-black text-[15px] font-bold " >Date</label>
                        <div className="flex items-center border-[1px] border-[grey] rounded pr-2">
                            <Controller
                                name="date"
                                control={control}
                                rules={{ required: "Date is missing" }}
                                render={({ field }) => (
                                    <DatePicker
                                        placeholderText="Select transaction date"
                                        className="w-full outline-none  rounded px-2 py-1"
                                        onChange={(data) => field.onChange(data)}
                                        selected={field.value}
                                        dateFormat="dd-MM-yyyy" />
                                )}
                            />
                            <FaRegCalendarAlt className=" text-[20px] " />
                        </div>
                        {typeof errors.date?.message === "string" && (
                            <span className="text-red-500 text-sm">{errors.date.message}</span>
                        )}
                    </div>
                </div>


                <div className="flex mb-4 ">
                    <div className="flex-1 ">
                        <label htmlFor="type" className="text-black text-[15px] font-bold ">Type</label><br />
                        <select  {...register("type", { required: "Type is missing" })} className="outline-none border-[1px] border-[grey] rounded px-2 py-1 w-full" >
                            <option value="">Select type</option>
                            <option value="expense">Expense</option>
                            <option value="income">Income</option>
                        </select>
                        {typeof errors.type?.message === "string" && (
                            <span className="text-red-500 text-sm">{errors.type.message}</span>
                        )}
                    </div>
                    <div className="flex-1 ml-2">
                        <label htmlFor="category" className="text-black text-[15px] font-bold ">Category</label>
                        <select {...register("category", { required: "Category is missing" })} className="outline-none border-[1px] border-[grey] rounded px-2 py-1 w-full">
                            <option value="">Select category</option>
                            {(type === "expense" ? expenseCategories : incomeCategories).map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                        {typeof errors.category?.message === "string" && (
                            <span className="text-red-500 text-sm">{errors.category.message}</span>
                        )}
                    </div>
                </div>
                <label htmlFor="description" className="text-black text-[15px] font-bold ">Description</label>
                <textarea className="outline-none border-[1px] border-[grey] rounded h-[100px] px-2 py-1 mb-8" id="description"  {...register("description")} />
                <input type="submit" className="w-full p-3 text-[18px] font-medium bg-[#3d1697] text-[white] hover:bg-[#2E0D7E] transition-all rounded-lg cursor-pointer" value="Add new Transaction" />
            </form>
        </div>
    )
}

export default Transactionform
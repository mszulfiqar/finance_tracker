import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "motion/react"
import {useForm } from "react-hook-form";
import { RxCross1 } from "react-icons/rx"
import { Input } from "@/components/ui/input"
import { Button } from "../ui/button";
import { useEffect } from "react";
import { updateBudget } from "@/services/transactions";
import { toast } from "sonner";

type EDITBUDGET_TYPE_PROPS = {
    openEdit: boolean,
    data: any
    setIsEditOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

const EditBudget = ({ openEdit, setIsEditOpen, data }: EDITBUDGET_TYPE_PROPS) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            category: '',
            budget: 0
        }
    });
    const queryClient = useQueryClient();
    const upadteMutaion = useMutation({
    mutationFn: updateBudget,
    onSuccess:(data) => {
       queryClient.invalidateQueries({ queryKey: ['budgets'] });
       queryClient.invalidateQueries({ queryKey: ['budget-stats'] });
      toast(data.message)
    },
    onError:(error:any) => {
        toast.error(error?.response?.data.errorMessage)
  }})
  const handelSubmit = (data:any) => {
    upadteMutaion.mutate(data)
    setIsEditOpen(false)
  }
    useEffect(()=>{
        data &&
        reset({
            category:data.category,
            budget: data.budgeted
        })
    },[data,reset])
    return (
        <AnimatePresence>
            {
                openEdit && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: "-3%" }}
                        transition={{ duration: 0.3 }}
                        exit={{ x: "100%" }}
                        className='w-[470px]  fixed top-0 right-0 h-screen  bg-white border border-gray-200 rounded-2xl shadow'>
                        <div className="font-nunito px-5 overflow-auto">
                            <div className="  pt-8 flex items-center justify-between">
                                <div>
                                    <h2 className="font-bold text-xl ">Edit the Budget</h2>
                                    <h2 className="font-nunito font-medium text-[14px] text-[grey]">Edit details of Bufget</h2>
                                </div>
                                <RxCross1 onClick={() => setIsEditOpen(false)} className="text-[#3d1697] text-[30px] cursor-pointer p-1  bg-white border border-gray-200 rounded-2xl shadow " />
                            </div>
                        </div>
                        <form className="mt-14 px-5" onSubmit={handleSubmit(handelSubmit)}>
                            <div>
                                <label htmlFor="category" className="bo">Category</label>
                                <Input {...register("category")} disabled/>
                                {typeof errors.category?.message === "string" && (
                                    <span className="text-red-500 text-sm">{errors.category.message}</span>
                                )}
                            </div>
                            <div className="my-7">
                                <label htmlFor="budgeted" >Budget</label>
                                <Input type="number" {...register("budget", { required: "Please fill the fied" })} />
                                {typeof errors.budget?.message === "string" && (
                                    <span className="text-red-500 text-sm">{errors.budget.message}</span>
                                )}
                            </div>
                            <Button className="w-full py-6 bg-[#3d1697] text-[white] hover:bg-[#2E0D7E] transition-all rounded-lg cursor-pointer">Save the details</Button>
                        </form>
                    </motion.div>
                )
            }
        </AnimatePresence>
    )
}

export default EditBudget
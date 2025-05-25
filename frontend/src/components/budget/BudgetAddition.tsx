import { AnimatePresence, motion } from "motion/react"
import { RxCross1 } from "react-icons/rx"
import { Input } from "@/components/ui/input"
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue} from "@/components/ui/select"
import { expenseCategories } from "@/utils/utils"
import { Controller, useForm } from "react-hook-form"
import { Button } from "../ui/button"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createBudget } from "@/services/transactions"
import { toast } from "sonner"

type BudgetAddition_PROPS = {
    open: boolean,
    handle: () => void
}

const BudgetAddition = ({ open, handle }: BudgetAddition_PROPS) => {
    const { register, handleSubmit, formState: { errors }, control} = useForm();
     const queryClient = useQueryClient();
    const create_budget_mutation = useMutation({
        mutationFn: createBudget,
        onSuccess:(data)=>{
            queryClient.invalidateQueries({ queryKey: ['budgets'] });
            queryClient.invalidateQueries({ queryKey: ['budget-stats'] });
            toast.success(data.message)
        },
        onError:(error:any)=>{
            toast.error(error?.response?.data.errorMessage)
        }
    })
    const handleForm = (data: any) => {
        create_budget_mutation.mutate(data)
        handle()
    }
    return (
        <AnimatePresence>
            {
                open && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: "-3%" }}
                        transition={{ duration: 0.3 }}
                        exit={{ x: "100%" }}
                        className='w-[470px]  fixed top-0 right-0 h-screen  bg-white border border-gray-200 rounded-2xl shadow'>
                        <div className="font-nunito px-5 overflow-auto">
                            <div className="  pt-8 flex items-center justify-between">
                                <div>
                                    <h2 className="font-bold text-xl ">Specify Budget</h2>
                                    <h2 className="font-nunito font-medium text-[14px] text-[grey]">Edit details of Budget</h2>
                                </div>
                                <RxCross1
                                    onClick={handle}
                                    className="text-[#3d1697] text-[30px] cursor-pointer p-1  bg-white border border-gray-200 rounded-2xl shadow " />
                            </div>
                            <form onSubmit={handleSubmit(handleForm)} className="mt-14">
                                <div>
                                    <label htmlFor="category" className="bo">Category</label>
                                    <Controller
                                        name="category"
                                        control={control}
                                        rules={{required:"Please provide the category"}}
                                        render={({ field }) => (
                                            <Select value={field.value} onValueChange={field.onChange}>
                                                <SelectTrigger className="w-full mt-1">
                                                    <SelectValue placeholder="Category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {
                                                        expenseCategories.map((item: string) => (
                                                            <SelectItem key={item} value={item}>{item}</SelectItem>
                                                        ))
                                                    }
                                                </SelectContent>
                                            </Select>
                                        )} />
                                    {typeof errors.category?.message === "string" && (
                                        <span className="text-red-500 text-sm">{errors.category.message}</span>
                                    )}
                                </div>

                                <div className="my-7">
                                    <label htmlFor="budgeted" >Budgeted</label>
                                    <Input type="number" {...register("budget", { required: "Please fill the fied" })} />
                                    {typeof errors.budget?.message === "string" && (
                                        <span className="text-red-500 text-sm">{errors.budget.message}</span>
                                    )}
                                </div>
                                <Button className="w-full py-6 bg-[#3d1697] text-[white] hover:bg-[#2E0D7E] transition-all rounded-lg cursor-pointer">Submit</Button>
                            </form>
                        </div>
                    </motion.div>
                )
            }

        </AnimatePresence>
    )
}

export default BudgetAddition
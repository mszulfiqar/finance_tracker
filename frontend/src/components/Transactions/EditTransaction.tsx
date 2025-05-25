import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { Controller, useForm} from 'react-hook-form'
import { RxCross1 } from 'react-icons/rx'
import { DatePickerDemo } from './DatePicker'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { upadteTranscation } from '@/services/transactions'
import { toast } from 'sonner'

type EDIT_TRANSACTION_PROPS = {
  isEditOpen: boolean,
  setIsEditOpen: React.Dispatch<React.SetStateAction<boolean>>,
  data: any
}


const expenseCategories = ["Rent","Groceries","Utilities","Transport","Healthcare","Entertainment","Other"];
const incomeCategories = [  "Salary","Freelance","Business","Investments","Rental Income","Dividends","Gifts","Interest","Other"];

const EditTransaction = ({ isEditOpen, setIsEditOpen, data }: EDIT_TRANSACTION_PROPS) => {
  const { register, handleSubmit, formState: { errors }, control, reset ,watch} = useForm(
    {
      defaultValues: data
    }
  );
  const [editId,setEditId] = useState(null)
  const type = watch("type");
   const queryClient = useQueryClient();
  useEffect(() => {
    reset(data);
    setEditId(data?.id)
  }, [data,type]);
  const upadteMutaion = useMutation({
    mutationFn: upadteTranscation,
    onSuccess:(data) => {
       queryClient.invalidateQueries({ queryKey: ['transactions-table'] });
       queryClient.invalidateQueries({ queryKey: ['budget-stats'] });
      toast(data.message)
    },
    onError:(error) => {
      toast(error.message)
    }
  })
  const handleSubmitform = (data:any) => {
    setIsEditOpen(false)
    // console.log("Submitted edited data",data)
    upadteMutaion.mutate({id:editId,data})
  }
// console.log(editId)
  return (
    <AnimatePresence>
      {
        isEditOpen &&
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: "-3%" }}
          transition={{ duration: 0.3 }}
          exit={{ x: "100%" }}
          className='w-[470px]  fixed top-0 right-0 h-screen  bg-white border border-gray-200 rounded-2xl shadow'>
          <div className="font-nunito px-5 overflow-auto">
            <div className="  pt-8 flex items-center justify-between">
              <div>
                <h2 className="font-bold text-xl ">Edit the Transaction</h2>
                <h2 className="font-nunito font-medium text-[14px] text-[grey]">Edit details of transaction</h2>
              </div>
              <RxCross1 onClick={() => setIsEditOpen(false)} className="text-[#3d1697] text-[30px] cursor-pointer p-1  bg-white border border-gray-200 rounded-2xl shadow " />
            </div>
             <form onSubmit={handleSubmit(handleSubmitform)}  className="flex flex-col mt-8  ">
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
                        <input type="number" {...register("amount", { required: "Amount is missing" })} className="outline-none border-[1px] border-[grey] rounded px-2 py-1.5" />
                        {typeof errors.amount?.message === "string" && (
                            <span className="text-red-500 text-sm">{errors.amount.message}</span>
                        )}
                    </div>
                    <div className="flex-1 ml-2">
                        <label htmlFor="date" className="text-black text-[15px] font-bold " >Date</label>
                        <div className="flex items-center border-[1px] border-[grey] rounded ">

                            <Controller
                                name="date"
                                control={control}
                                rules={{ required: "Date is missing" }}
                                render={({ field }) => (
                                    <DatePickerDemo
                                    
                                        date={field.value}
                                        setDate={field.onChange} />
                                )} />
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
                <input type="submit" className="w-full p-3 text-[18px] font-medium bg-[#3d1697] text-[white] hover:bg-[#2E0D7E] transition-all rounded-lg cursor-pointer" value="Edit details" />
            </form>
          </div>

        </motion.div>

      }
    </AnimatePresence>
  )
}

export default EditTransaction
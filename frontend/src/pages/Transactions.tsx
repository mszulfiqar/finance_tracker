import { useState } from "react";
import SlideinModel from "../components/Transactions/SlideinModel";
import Table from "../components/Transactions/table";



const Transactions = () => {
  const [isOpen, setisOpen] = useState<boolean>(false)
  const setIsOpen = () => {
    setisOpen(!isOpen)
  }
  return (
    <div className=" w-full bg-white shadow rounded-2xl border border-gray-100 px-2 py-4">
      <Table setIsOpen={setIsOpen} />
      <SlideinModel isOpen={isOpen} setIsOpen={setIsOpen} state={setisOpen}/>
    </div>
  )
}

export default Transactions
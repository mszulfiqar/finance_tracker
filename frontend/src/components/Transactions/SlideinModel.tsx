import { motion, AnimatePresence } from "motion/react"
import Transactionform from "./Transactionform";
import type { Dispatch, SetStateAction } from "react";

type PROPS_TYPE = {
    isOpen?: boolean,
    setIsOpen: () => void,
    setEdit?:Dispatch<SetStateAction<boolean>>;
    // state:React.Dispatch<React.SetStateAction<boolean>>
    data?:any
}

const SlideinModel = ({ isOpen, setIsOpen,data }: PROPS_TYPE) => {
    return (
        <AnimatePresence>
            {
                isOpen && (
                    <>
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: "-3%" }}
                            transition={{ duration: 0.3 }}
                            exit={{ x: "100%" }}
                            className='w-[470px]  fixed top-0 right-0 h-screen  bg-white border border-gray-200 rounded-2xl shadow  '>
                            
                            
                            <Transactionform setIsOpen={setIsOpen}  />
                        </motion.div>
                    </>
                )
            }
        </AnimatePresence>
    )
}

export default SlideinModel
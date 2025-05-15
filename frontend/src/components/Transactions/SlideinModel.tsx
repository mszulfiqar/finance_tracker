import { motion, AnimatePresence } from "motion/react"
import Transactionform from "./Transactionform";

type PROPS_TYPE = {
    isOpen: boolean,
    setIsOpen: () => void,
    state:React.Dispatch<React.SetStateAction<boolean>>
}

const SlideinModel = ({ isOpen, setIsOpen,state }: PROPS_TYPE) => {
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
                            
                            
                            <Transactionform setIsOpen={setIsOpen} state={state} />
                        </motion.div>
                    </>
                )
            }
        </AnimatePresence>
    )
}

export default SlideinModel
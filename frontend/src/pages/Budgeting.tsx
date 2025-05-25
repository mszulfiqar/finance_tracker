import CountUp from 'react-countup';
import TableBudget from '@/components/budget/TableBudget';
import { cards } from '@/utils/utils';
import { getBudgetStats } from '@/services/transactions';
import { useQuery } from '@tanstack/react-query';
import { BsCashStack } from "react-icons/bs";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

const Budgeting = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["budget-stats"],
        queryFn: getBudgetStats
    });
    if (isLoading) return <p>Loading...........</p>
    // if(error) console.log(error.message)
    console.log(data)
    // const merged = cards.map((item:any)=>{
    //     const staticData = data?.find((i:any)=>i.id==data.id);
    //     return{
    //         staticData
    //     }
    // })
    // console.log(merged)
    const cards = [
        {
            title: 'Total Budget',
            amount: data?.totalBudgeted,
            icon: <BsCashStack className="text-green-600" />,
            bgColor: 'bg-green-100',
            textColor: 'text-green-600',

        },
        {
            title: 'Total Spent',
            amount: data?.totalSpent,
            icon: <FaArrowUp className="text-red-500" />,
            bgColor: 'bg-blue-100',
            textColor: 'text-blue-600',
        },
        {
            title: 'Remaining Budget',
            amount: data?.totalRemaining,
            icon: <FaArrowDown className="text-blue-600" />,
            bgColor: 'bg-red-100',
            textColor: 'text-red-500',
        },
    ];
    return (
        <div >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                {cards.map((card: any, index) => (

                    <div
                        key={index}
                        className="flex items-center justify-between p-5 bg-white shadow rounded-2xl border border-gray-100"
                    >
                        <div>
                            <h2 className="text-sm text-gray-500 font-nunito">{card.title}</h2>
                            <p className={`text-2xl font-medium `}>
                                {/* {
                                    card.title === "Remaining Budget" && card.amount > 0 ? <><span className="text-red-500 font-bold">Over Spent Rs.({-1 * card.amount})</span></>:<><span className="font-bold">Rs.</span><span>{card.amount}</span></>
                                } */}
                                {
                                    card.title === "Remaining Budget" && card.amount < 0 ? (
                                        <>
                                            <span className="text-red-500 font-bold">Over Spent Rs. (<CountUp end={-1*card.amount}/>)</span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="font-bold">Rs.</span><span><CountUp end={card.amount} /></span>
                                        </>
                                    )
                                }

                                {/* Rs.<CountUp end={card.amount} /> */}
                            </p>
                        </div>
                        <div className={`text-3xl p-2 rounded-full flex flex-col`}>
                            <span className='pl-4'>{card.icon}</span>
                            <span className='text-[13px] text-[#9b9a9a9a] font-bold mt-4'>This month</span>
                        </div>
                    </div>



                ))}
            </div>
            <div className=" w-full bg-white shadow rounded-2xl border border-gray-100 px-2 py-4">
                <TableBudget />
            </div>

        </div>
    )
}

export default Budgeting
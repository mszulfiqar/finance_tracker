import { FaArrowDown, FaArrowUp, FaUniversity } from 'react-icons/fa';
import { BsCashStack } from "react-icons/bs";
import Linechart from '../components/Overview/Linechart';
import CountUp from 'react-countup';
import PieChart from '../components/Overview/PieChart';

const cards = [
    {
      title: 'Total Balance',
      amount: 2500,
      icon: <BsCashStack  className="text-green-600" />,
      bgColor: 'bg-green-100',
      textColor: 'text-green-600',
    },
    {
      title: 'In',
      amount: 5000,
      icon: <FaArrowDown className="text-blue-600" />,
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600',
    },
    {
      title: 'Out',
      amount: 3200,
      icon: <FaArrowUp className="text-red-500" />,
      bgColor: 'bg-red-100',
      textColor: 'text-red-500',
    },
    {
      title: 'Loan',
      amount: 700,
      icon: <FaUniversity className="text-yellow-500" />,
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-500',
    },
  ];
  

const Overview = () => {
  return (
    <div className=''>
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-5 bg-white shadow rounded-2xl border border-gray-100"
        >
          <div>
            <h2 className="text-sm text-gray-500 font-nunito">{card.title}</h2>
            <p className={`text-2xl font-bold `}>
              {/* ${card.amount} */}
              Rs.<CountUp end={card.amount}/>
            </p>
          </div>
          <div className={`text-3xl p-2 rounded-full `}>
            {card.icon}
          </div>
        </div>
      ))}
    </div>

    <div className='flex items-center flex-wrap   h-[340px] '>
      <div className='h-full  flex-1 max-lg:min-w-[100%]  bg-white shadow rounded-2xl border border-gray-100  flex flex-col p-4 py-8 max-lg:mb-4' >
        <div className='mb-8 px-2 flex items-center justify-between text-[12px] font-medium '>
          <h1 className=' font-nunito font-bold text-xl '>Area Chart <br /> Income & Expense</h1>
          <span className='text-[grey]'>Last 3 months</span>
          </div>
        <div className='w-full h-full'>
        <Linechart />
        </div>
      </div>
      <div className='h-full max-lg:ml-0 flex-1   bg-white shadow rounded-2xl border border-gray-100  flex flex-col p-4 py-8 ml-7'>
        <div className='mb-8 px-2 flex items-center justify-between text-[12px] font-medium '>
          <h1 className=' font-nunito font-bold text-xl '>Expenses This Month</h1>
          </div>
        <div className='w-full h-full mt-[-40px]'>
          <PieChart />
        </div>
      </div>
    </div>
    </div>
  )
}

export default Overview
// import { div } from 'motion/react-client';
// import React from 'react'
// import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend } from 'recharts';

// export const data = [
//   { name: "Rent", value: 1200, color: "#f56565" },
//   { name: "Groceries", value: 450, color: "#48bb78" },
//   { name: "Utilities", value: 200, color: "#4299e1" },
//   { name: "Transport", value: 150, color: "#ed8936" },
//   { name: "Healthcare", value: 100, color: "#9f7aea" },
//   { name: "Entertainment", value: 80, color: "#ecc94b" },
// //   { name: "Shopping", value: 120, color: "#f6ad55" },
// //   { name: "Dining Out", value: 90, color: "#e53e3e" },
// //   { name: "Education", value: 60, color: "#38b2ac" },
// //   { name: "Other", value: 50, color: "#a0aec0" },
// ];



// const totalExpense = data.reduce((prev,next)=>prev+next.value,0);
// const Customlegend = (props:any) => {
//     const { payload } = props;
//     return (
//         <div className='ml-[20px]'>
//               {payload.map((entry:any, index:any) => {
//         const percentage = ((entry.value / totalExpense) * 100).toFixed(1);
//         return (
//           <div key={index} style={{marginLeft:"300px" }}>
//             <div
//               style={{
//                 width: "5px",
//                 height: "5px",
//                 backgroundColor: entry.color,
//                 // marginRight: "8px",
//               }}
//             />
//             <span>{entry.name}</span>
//             <span style={{ color: "#888" }}>({percentage}%)</span>
//           </div>
//         );
//       })}
//     </div>
//     )
    
// }


// const PieCharts = () => {
    
//   return (
//     <ResponsiveContainer width="100%" height="100%">
//         <PieChart >
//           <Pie
          
//             data={data}
//             cx="20%"
//             // cy="20%"
//             labelLine={false}
//             // label={renderCustomizedLabel}
//             outerRadius={90}
//             fill="#8884d8"
//             dataKey="value"
//             stroke='none'
//             // label
//           >
//             {data.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={entry.color} />
//             ))}
//           </Pie>
//         {/* <Legend content={<Customlegend/>}/> */}
//         </PieChart>
//       </ResponsiveContainer>
//   )
// }

// export default PieCharts



// import React from 'react';
// import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

// export const data = [
//   { name: "Rent", value: 1200, color: "#f56565" },
//   { name: "Groceries", value: 450, color: "#48bb78" },
//   { name: "Utilities", value: 200, color: "#4299e1" },
//   { name: "Transport", value: 150, color: "#ed8936" },
//   { name: "Healthcare", value: 100, color: "#9f7aea" },
//   { name: "Entertainment", value: 80, color: "#ecc94b" },
// ];

// const totalExpense = data.reduce((prev, next) => prev + next.value, 0);

// // ✅ Capital L
// const CustomLegend = ({ payload }: any) => {
//   return (
//     <div className="ml-[300px] mt-[-300px]">
//       {payload.map((entry: any, index: number) => {
//         const percentage = ((entry.payload.value / totalExpense) * 100).toFixed(1);
//         return (
//           <div key={index} className="flex items-center mb-2">
//             <div
//               className="w-4 h-4 rounded-full mr-2"
//               style={{ backgroundColor: entry.payload.color }}
//             ></div>
//             <span className="mr-2">{entry.value}</span>
//             <span className="text-gray-500">({percentage}%)</span>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// const PieCharts = () => {
//   return (
//     <ResponsiveContainer width="100%" height={400}>
//       <PieChart >
//         <Pie
//         // className='mt-[100px]'
//           data={data}
//           cx="30%"
//           cy="50%"
//           outerRadius={90}
//           dataKey="value"
//           stroke="none"
//         >
//           {data.map((entry, index) => (
//             <Cell key={`cell-${index}`} fill={entry.color} />
//           ))}
//         </Pie>
//         <Legend content={CustomLegend} />
//       </PieChart>
//     </ResponsiveContainer>
//   );
// };

// export default PieCharts;



import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export const data = [
  { name: "Rent", value: 1200, color: "#f56565" },
  { name: "Groceries", value: 450, color: "#48bb78" },
  { name: "Utilities", value: 200, color: "#4299e1" },
  { name: "Transport", value: 150, color: "#ed8936" },
  { name: "Healthcare", value: 100, color: "#9f7aea" },
  { name: "Entertainment", value: 80, color: "#ecc94b" },
];

const totalExpense = data.reduce((prev, next) => prev + next.value, 0);

const CustomLegend = ({ data }:any) => {
  return (
    <div className="flex flex-col gap-2 p-4">
      {data.map((entry:any, index:any) => {
        const percentage = ((entry.value / totalExpense) * 100).toFixed(1);
        return (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm">{entry.name}</span>
            <span className="text-xs text-gray-500">({percentage}%)</span>
          </div>
        );
      })}
    </div>
  );
};

const PieCharts = () => {
  return (
    <div className="flex flex-col md:flex-row w-full h-[300px]">
      {/* Pie Chart */}
      <div className="w-full md:w-1/2 h-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={90}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <CustomLegend data={data} />
      </div>
    </div>
  );
};

export default PieCharts;


import { getExpensenOverview } from '@/services/transactions';
import { useQuery } from '@tanstack/react-query';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';


const COLORS = [
  "#f56565", "#48bb78", "#4299e1", "#ed8936",
  "#9f7aea", "#ecc94b", "#38b2ac", "#dd6b20"
]
const CustomLegend = ({ data }: any) => {
  const totalExpense = data.reduce((sum: number, entry: any) => sum + entry.amount, 0);
  console.log(totalExpense)
  return (
    <div className="flex flex-col gap-2 p-4">
     {data.map((entry: any, index: number) => {
        const percentage = totalExpense > 0
          ? ((entry.amount / totalExpense) * 100).toFixed(1)
          : "0";
        return (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm">{entry.category}</span>
            <span className="text-xs text-gray-500">({percentage}%)</span>
          </div>
        );
      })}
    </div>
  );
};

const PieCharts = () => {
    const { data, isLoading} = useQuery({
    queryKey: ["expense-stats"],
    queryFn: getExpensenOverview,
  });
  if (isLoading) return <p>Loading...</p>;
   const dataWithColors = data.map((item: any, index: number) => ({
    ...item,
    color: COLORS[index % COLORS.length],
  }));
  console.log(dataWithColors)
  return (
    <div className="flex flex-col md:flex-row w-full h-[300px]">
      {/* Pie Chart */}
      <div className="w-full md:w-1/2 h-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={dataWithColors}
              cx="50%"
              cy="50%"
              outerRadius={90}
              dataKey="amount"
              stroke="none"
            >
              {dataWithColors?.map((entry:any, index:number) => (
                <Cell key={`cell-${index}`} fill={entry.color}/>
              ))}    
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <CustomLegend data={dataWithColors} />
      </div>
    </div>
  );
};

export default PieCharts;
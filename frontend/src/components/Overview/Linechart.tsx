import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
    { month: 'Jan', income: 2000, expense: 1500 },
    { month: 'Feb', income: 3000, expense: 1800 },
    { month: 'March', income: 2100, expense: 6000 },

];

const Linechart = () => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart
                data={data}
                margin={{
                    top: 10,
                    right: 30,
                    left: -10,
                    bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[0, 1000]} tickCount={6}/>
                <Tooltip />
                <Area type="linear" dataKey="income" stroke="#2563EB" fill="#2563EB" />
                <Area type="linear" dataKey="expense" stroke="#ffb88c" fill="#ffb88c"  />
            </AreaChart>
        </ResponsiveContainer>
    )
}

export default Linechart
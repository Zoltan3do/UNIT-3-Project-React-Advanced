/* eslint-disable react/prop-types */
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div style={{ backgroundColor: 'transparent', color: '#fff', padding: 5 }}>
                <p>{`${label}: ${payload[0].value}`}</p>
            </div>
        );
    }
    return null;
};


const RainChart = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#ccc" vertical={false} />
                <XAxis dataKey="name" stroke="white" />
                <YAxis stroke="white" />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
                <Bar dataKey="value" fill="white" barSize={12} radius={[10, 10, 0, 0]} isAnimationActive={false} onMouseEnter={() => { }} onMouseLeave={() => { }} />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default RainChart;

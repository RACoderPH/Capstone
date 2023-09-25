import './chart.scss'

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Depression',
    uv: 50,
 
  },
  {
    name: 'Anxiety',
    uv: 60,
  
  },
  {
    name: 'Stress',
    uv: 10,
    
  },
  {
    name: 'Normal',
    uv: 20,
    
  },
];


const Chart = () => {
  return (
  
    <ResponsiveContainer width="100%" aspect={3}>
    <AreaChart
      width={500}
      height={400}
      data={data}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
    </AreaChart>
  </ResponsiveContainer>
  )
}

export default Chart
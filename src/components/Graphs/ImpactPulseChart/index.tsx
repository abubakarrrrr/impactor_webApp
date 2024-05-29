import React, { useRef, useState, useEffect } from 'react';
import {
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Area,
  Bar,
  Cell,
} from 'recharts';

const ImpactPulseChart = () => {
  const chartContainerRef = useRef(null);
  const [chartWidth, setChartWidth] = useState(0);

  useEffect(() => {
    const updateChartWidth = () => {
      if (chartContainerRef.current) {
        setChartWidth(chartContainerRef.current.offsetWidth);
      }
    };

    updateChartWidth();
    window.addEventListener('resize', updateChartWidth);

    return () => {
      window.removeEventListener('resize', updateChartWidth);
    };
  });

  const data = [
    { name: "Jan", uv: 4000, pv: 2400, amt: 2400 },
    { name: "Feb", uv: 3000, pv: 1398, amt: 2210 },
    { name: "Mar", uv: 2000, pv: 9800, amt: 2290 },
    { name: "Apr", uv: 2780, pv: 3908, amt: 2000 },
    { name: "May", uv: 1890, pv: 4800, amt: 2181 },
    { name: "Jun", uv: 2390, pv: 3800, amt: 2500 },
    { name: "Jul", uv: 3490, pv: 4300, amt: 2100 },
    { name: "Aug", uv: 3490, pv: 4300, amt: 2100 },
    { name: "Sep", uv: 3490, pv: 4300, amt: 2100 },
    { name: "Oct", uv: 3490, pv: 4300, amt: 2100 },
    { name: "Nov", uv: 3490, pv: 4300, amt: 2100 },
    { name: "Dec", uv: 3490, pv: 4300, amt: 2100 },
  ];

  return (
    <div ref={chartContainerRef} className='w-[100%]'>
      <ComposedChart width={chartWidth} height={300} data={data}>
        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip />
        <Legend />
        <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
        <Bar dataKey="pv" barSize={10} radius={[10, 10, 0, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#365494' : '#D83564'} />
          ))}
        </Bar>
      </ComposedChart>
    </div>
  );
};

export default ImpactPulseChart;

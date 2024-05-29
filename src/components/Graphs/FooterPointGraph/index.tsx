import ImageComponent from "@/components/ImageComponent";
import React from "react";
import { PieChart, Pie, Legend, Cell, ResponsiveContainer } from 'recharts';

const FooterPointGraph = ({data}: any) => {
    const COLORS = [
        "#73CF31", //grocery
        "#D0432B", //education
        "#1487A4", //flood relief
        "#D83764", //Direct Giving
        "#345698", //Impactech
        "#01CAFE", //earntech
    ];

    const newData = data.map((item, i) => {
        return {
            name: item.name,
            value: item.value
        }
    });

    return (
        <div className="w-full h-full">
            <div className="relative">
                <ResponsiveContainer width="100%" height={150}>
                    <PieChart>
                        <Pie
                            data={newData}
                            cx="50%"
                            cy="50%"
                            innerRadius="70%"
                            outerRadius="90%"
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {newData.map((entry: any, index: any) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>

                <div className="w-[80px] h-[80px] rounded-full bg-white shadow-lg absolute left-[50%] -translate-y-1/2 -translate-x-1/2 top-1/2 flex flex-col justify-center items-center ">
                    <p className="text-sm font-bold text-primary">My Impact</p>
                    <p className="text-xs font-bold">160,40 PKR</p>
                </div>
            </div>
        </div>
    );
};

export default FooterPointGraph;

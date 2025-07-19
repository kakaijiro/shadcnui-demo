"use client";
import { data } from "@/lib/data-pie";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

export default function TeamDistributionChart() {
  return (
    <ResponsiveContainer width="100%" height={150}>
      <PieChart>
        <Tooltip
          labelClassName="font-bold"
          wrapperClassName="[&_.recharts-tooltip-item]:!text-black dark:[&_.recharts-tooltip-item]:!text-white dark:!bg-black rounded-md dark:!border-border !text-sm "
        />
        <Pie data={data} dataKey="value" name="name">
          {data.map((item, i) => (
            <Cell key={i} fill={item.color} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

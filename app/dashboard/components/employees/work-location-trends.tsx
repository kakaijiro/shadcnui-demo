"use client";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { data } from "@/lib/data";

export default function WorkLocationTrend() {
  return (
    <ResponsiveContainer height={350} width="100%">
      <BarChart
        data={data}
        className="[&_.recharts-tooltip-cursor]:fill-zinc-200 dark:[&_.recharts-tooltip-cursor]:fill-zinc-800"
      >
        <XAxis dataKey="name" stroke="#adb5bd" fontSize={12} />
        <YAxis stroke="#adb5bd" fontSize={12} />
        <Tooltip
          separator=": "
          formatter={(value, name) =>
            name === "wfh"
              ? [value, "Work from home"]
              : name === "office"
              ? [value, "Work from office"]
              : [null, "unknown"]
          }
          labelClassName="font-bold"
          wrapperClassName="dark:!bg-black rounded-md dark:!border-border !text-sm"
        />
        <Legend
          iconType="circle"
          formatter={(value) =>
            value === "wfh" ? (
              <div className="text-sm">Work from home</div>
            ) : value === "office" ? (
              <div className="text-sm">Work from office</div>
            ) : (
              ""
            )
          }
        />
        <Bar dataKey="office" stackId={1} fill="#d6336c" />
        <Bar dataKey="wfh" stackId={1} fill="#495057" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

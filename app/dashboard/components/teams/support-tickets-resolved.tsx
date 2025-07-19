"use client";
import { data } from "@/lib/support-tickets-data";
import {
  Line,
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
} from "recharts";

export default function SupportTicketsResolved() {
  return (
    <ResponsiveContainer height={350} width="100%">
      <LineChart data={data}>
        <Tooltip
          labelClassName="font-bold"
          wrapperClassName="dark:!bg-black rounded-md dark:!border-border !text-sm"
        />
        <XAxis fontSize={12} dataKey="name" stroke="#ced4da" />
        <YAxis fontSize={12} stroke="#ced4da" />
        <CartesianGrid strokeDasharray="3" />
        <Line dataKey="delta" type="monotone" stroke="#51cf66" />
        <Line dataKey="alpha" type="monotone" stroke="#339af0" />
        <Line dataKey="canary" type="monotone" stroke="#ff922b" />
        <Legend
          formatter={(value) => <span className="capitalize">{value}</span>}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';
import { DistributionBucket } from '../types';

interface Props {
  data: DistributionBucket[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black text-white p-3 shadow-2xl border border-gray-800">
        <div className="flex justify-between items-center gap-4 mb-2">
          <span className="font-sans text-[9px] uppercase tracking-widest text-gray-400">Range</span>
          <span className="font-mono text-xs">{label}</span>
        </div>
        <div className="flex justify-between items-center gap-4">
          <span className="font-sans text-[9px] uppercase tracking-widest text-gray-400">Count</span>
          <span className="font-mono text-xs">{payload[0].value}</span>
        </div>
      </div>
    );
  }
  return null;
};

export const DistributionChart: React.FC<Props> = ({ data }) => {
  return (
    <div className="w-full h-64 mt-8 select-none">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 0,
            left: 0,
            bottom: 0,
          }}
          barCategoryGap={1} 
        >
          <XAxis 
            dataKey="min" 
            tick={{ fontSize: 9, fontFamily: 'Inter', fill: '#9ca3af' }} 
            axisLine={false} 
            tickLine={false}
            interval={2} 
            tickFormatter={(value) => value.toFixed(0)}
            dy={10}
          />
          <YAxis 
            hide={true} 
          />
          <Tooltip 
            content={<CustomTooltip />} 
            cursor={{ fill: '#000000', opacity: 0.05 }} 
            isAnimationActive={false}
          />
          <Bar dataKey="count" animationDuration={1000} animationEasing="ease-out">
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.isUserBucket ? '#000000' : '#e5e5e5'} 
                className={entry.isUserBucket ? "" : "hover:fill-gray-400 transition-colors duration-200"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="flex justify-between items-center px-1 mt-4 border-t border-gray-100 pt-3">
        <p className="text-[9px] uppercase tracking-widest text-gray-400 font-medium">0.0</p>
        <p className="text-[9px] uppercase tracking-widest text-gray-400 font-medium">Score Frequency Distribution</p>
        <p className="text-[9px] uppercase tracking-widest text-gray-400 font-medium">25.0</p>
      </div>
    </div>
  );
};
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
} from "recharts";

const CoinAreaChart = ({ data, color,content }) => {
  if(!data) return <div> no coin found</div>
  return (
    <ResponsiveContainer width="100%" height={130}>
    <AreaChart data={data}>
      <defs>
        <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.08} />
          <stop offset="75%" stopColor={color} stopOpacity={0.01} />
        </linearGradient>
      </defs>
      <Area
        connectNulls
        type="natural"
        dataKey="value"
        strokeWidth={2}
        stroke={color}
        fill="url(#color)"
        margin={{
          top: 10,
          right: 0,
          left: 0,
          bottom: 2,
        }}
      />
      <XAxis
        dataKey="date"
        axisLine={false}
        tickLine={false}
        tickFormatter={() => ""}
        hide
      />
      <YAxis
        dataKey="value"
        axisLine={false}
        tickLine={false}
        tickCount={10}
        hide
      />
      <Tooltip content={content} position={{ y: -40,  }} />
      <CartesianGrid
        strokeDasharray="8 4"
        strokeWidth='0.4'
        opacity="0.3"
        
        vertical={false}
      />
    </AreaChart>
  </ResponsiveContainer>
  )
}

export default CoinAreaChart

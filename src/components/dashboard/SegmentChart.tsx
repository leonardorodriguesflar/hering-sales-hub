import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SegmentData {
  name: string;
  value: number;
  receita: number;
  color: string;
}

const data: SegmentData[] = [
  { name: 'Ouro', value: 52, receita: 765000, color: 'hsl(var(--warning))' },
  { name: 'Prata', value: 33, receita: 485000, color: 'hsl(var(--primary))' },
  { name: 'Bronze', value: 15, receita: 228000, color: 'hsl(var(--muted-foreground))' }
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

export function SegmentChart() {
  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={14}
        fontWeight="700"
        className="drop-shadow-sm"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card className="bg-gradient-card border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-xl">
          <div className="h-10 w-10 bg-gradient-warning rounded-xl flex items-center justify-center shadow-md">
            <PieChart className="h-5 w-5 text-white" />
          </div>
          Receita por Segmentação
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomLabel}
              outerRadius={90}
              innerRadius={30}
              fill="#8884d8"
              dataKey="value"
              className="drop-shadow-lg"
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  className="hover:opacity-80 transition-opacity duration-200"
                />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-card/95 backdrop-blur-sm border border-border/20 rounded-xl p-4 shadow-xl">
                      <p className="font-semibold text-foreground mb-2">{data.name}</p>
                      <p className="text-sm font-medium text-primary">Receita: {formatCurrency(data.receita)}</p>
                      <p className="text-sm font-medium text-muted-foreground">Participação: {data.value}%</p>
                    </div>
                  );
                }
                return null;
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        
        <div className="mt-6 space-y-3">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gradient-primary-soft/30 rounded-xl border border-border/20 hover:bg-gradient-primary-soft/50 transition-all duration-200">
              <div className="flex items-center gap-3">
                <div 
                  className="w-4 h-4 rounded-full shadow-sm border border-white/50"
                  style={{ backgroundColor: item.color }}
                />
                <span className="font-semibold text-foreground">{item.name}</span>
              </div>
              <div className="text-right">
                <p className="font-bold text-foreground">{formatCurrency(item.receita)}</p>
                <p className="text-sm font-medium text-muted-foreground">{item.value}%</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
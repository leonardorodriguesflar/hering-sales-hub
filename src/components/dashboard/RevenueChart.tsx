import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RevenueData {
  month: string;
  atual: number;
  anterior: number;
  meta: number;
}

const data: RevenueData[] = [
  { month: 'Jan', atual: 245000, anterior: 218000, meta: 250000 },
  { month: 'Fev', atual: 285000, anterior: 245000, meta: 280000 },
  { month: 'Mar', atual: 315000, anterior: 285000, meta: 320000 },
  { month: 'Abr', atual: 298000, anterior: 275000, meta: 310000 },
  { month: 'Mai', atual: 345000, anterior: 298000, meta: 340000 },
  { month: 'Jun', atual: 378000, anterior: 325000, meta: 370000 },
  { month: 'Jul', atual: 395000, anterior: 345000, meta: 380000 },
  { month: 'Ago', atual: 415000, anterior: 378000, meta: 400000 },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

export function RevenueChart() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Evolução da Receita</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              tickFormatter={formatCurrency}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
                      <p className="font-medium mb-2">{label}</p>
                      {payload.map((entry, index) => (
                        <p key={index} style={{ color: entry.color }}>
                          {entry.name}: {formatCurrency(Number(entry.value))}
                        </p>
                      ))}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend />
            <Bar 
              dataKey="anterior" 
              name="Ano Anterior"
              fill="hsl(var(--muted))"
              radius={[2, 2, 0, 0]}
            />
            <Bar 
              dataKey="atual" 
              name="Atual"
              fill="hsl(var(--primary))"
              radius={[2, 2, 0, 0]}
            />
            <Bar 
              dataKey="meta" 
              name="Meta"
              fill="hsl(var(--success))"
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
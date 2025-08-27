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
    <Card className="bg-gradient-card border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-xl">
          <div className="h-10 w-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-md">
            <BarChart className="h-5 w-5 text-white" />
          </div>
          Evolução da Receita
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-20" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              tickFormatter={formatCurrency}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-card/95 backdrop-blur-sm border border-border/20 rounded-xl p-4 shadow-xl">
                      <p className="font-semibold mb-3 text-foreground">{label}</p>
                      {payload.map((entry, index) => (
                        <p key={index} className="text-sm font-medium mb-1" style={{ color: entry.color }}>
                          {entry.name}: {formatCurrency(Number(entry.value))}
                        </p>
                      ))}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend 
              wrapperStyle={{ 
                paddingTop: '20px',
                fontSize: '14px',
                fontWeight: '500'
              }}
            />
            <Bar 
              dataKey="anterior" 
              name="Ano Anterior"
              fill="hsl(var(--muted-foreground))"
              radius={[4, 4, 0, 0]}
              className="hover:opacity-80"
            />
            <Bar 
              dataKey="atual" 
              name="Atual"
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
              className="hover:opacity-80"
            />
            <Bar 
              dataKey="meta" 
              name="Meta"
              fill="hsl(var(--success))"
              radius={[4, 4, 0, 0]}
              className="hover:opacity-80"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
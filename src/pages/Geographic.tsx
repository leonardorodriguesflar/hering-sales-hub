import { 
  MapPin, 
  TrendingUp, 
  Users, 
  DollarSign 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { mockMetricasPorRegiao } from '@/data/mockData';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export default function Geographic() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const totalReceita = mockMetricasPorRegiao.reduce((acc, item) => acc + item.receita, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Análise Geográfica</h1>
        <p className="text-muted-foreground mt-1">
          Performance de vendas por região e estado
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Estados</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockMetricasPorRegiao.length}</div>
            <p className="text-xs text-muted-foreground">Regiões ativas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalReceita)}</div>
            <p className="text-xs text-muted-foreground">Todas as regiões</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Melhor Performance</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">MG</div>
            <p className="text-xs text-muted-foreground">124.4% de atingimento</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockMetricasPorRegiao.reduce((acc, item) => acc + item.clientes, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Clientes ativos</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Receita por Estado</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockMetricasPorRegiao}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="uf" />
                <YAxis tickFormatter={formatCurrency} />
                <Tooltip
                  formatter={(value) => [formatCurrency(Number(value)), 'Receita']}
                />
                <Bar 
                  dataKey="receita" 
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Atingimento por Estado</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockMetricasPorRegiao}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="uf" />
                <YAxis tickFormatter={(value) => `${value}%`} />
                <Tooltip
                  formatter={(value) => [`${value}%`, 'Atingimento']}
                />
                <Bar 
                  dataKey="atingimento" 
                  fill="hsl(var(--success))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Table */}
      <Card>
        <CardHeader>
          <CardTitle>Detalhamento por Estado</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockMetricasPorRegiao
              .sort((a, b) => b.receita - a.receita)
              .map((regiao) => (
                <div key={regiao.uf} className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <span className="font-bold text-primary text-sm">
                          {regiao.uf}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold">{regiao.uf}</h3>
                        <p className="text-sm text-muted-foreground">
                          {regiao.clientes} clientes
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{formatCurrency(regiao.receita)}</p>
                      <Badge 
                        variant={regiao.atingimento >= 100 ? "default" : "secondary"}
                        className={regiao.atingimento >= 100 ? "bg-success" : ""}
                      >
                        {regiao.atingimento}% atingimento
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progresso da meta</span>
                      <span>{regiao.atingimento}%</span>
                    </div>
                    <Progress 
                      value={Math.min(regiao.atingimento, 100)} 
                      className="h-2"
                    />
                  </div>
                  
                  <div className="mt-3 grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Receita média</p>
                      <p className="font-medium">
                        {formatCurrency(regiao.receita / regiao.clientes)}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Participação</p>
                      <p className="font-medium">
                        {((regiao.receita / totalReceita) * 100).toFixed(1)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Status</p>
                      <p className={`font-medium ${
                        regiao.atingimento >= 110 ? 'text-success' :
                        regiao.atingimento >= 90 ? 'text-warning' : 'text-destructive'
                      }`}>
                        {regiao.atingimento >= 110 ? 'Excelente' :
                         regiao.atingimento >= 90 ? 'Bom' : 'Atenção'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
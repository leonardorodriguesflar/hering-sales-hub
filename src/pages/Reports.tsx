import { 
  BarChart3, 
  TrendingUp, 
  Download, 
  Calendar,
  PieChart,
  FileText
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from 'recharts';

const trendsData = [
  { mes: 'Jan', vendas: 245000, meta: 250000 },
  { mes: 'Fev', vendas: 285000, meta: 280000 },
  { mes: 'Mar', vendas: 315000, meta: 320000 },
  { mes: 'Abr', vendas: 298000, meta: 310000 },
  { mes: 'Mai', vendas: 345000, meta: 340000 },
  { mes: 'Jun', vendas: 378000, meta: 370000 },
  { mes: 'Jul', vendas: 395000, meta: 380000 },
  { mes: 'Ago', vendas: 415000, meta: 400000 },
];

const canalData = [
  { canal: 'Multimarca', receita: 485000, participacao: 45 },
  { canal: 'Boutique', receita: 325000, participacao: 30 },
  { canal: 'Departamental', receita: 185000, participacao: 17 },
  { canal: 'Grande Superfície', receita: 85000, participacao: 8 }
];

const performanceData = [
  { vendedor: 'João Silva', receita: 485000, atingimento: 118.5, clientes: 28 },
  { vendedor: 'Maria Santos', receita: 425000, atingimento: 108.2, clientes: 32 },
  { vendedor: 'Carlos Lima', receita: 395000, atingimento: 95.8, clientes: 24 },
  { vendedor: 'Ana Costa', receita: 365000, atingimento: 87.5, clientes: 26 },
];

const COLORS = ['hsl(var(--primary))', 'hsl(var(--success))', 'hsl(var(--warning))', 'hsl(var(--muted))'];

export default function Reports() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Relatórios</h1>
          <p className="text-muted-foreground mt-1">
            Analytics avançados e insights de vendas
          </p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="agosto">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="agosto">Agosto 2024</SelectItem>
              <SelectItem value="julho">Julho 2024</SelectItem>
              <SelectItem value="junho">Junho 2024</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Report Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Relatório de Vendas</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Performance mensal detalhada</p>
            <Button variant="outline" size="sm" className="mt-2">
              Gerar Relatório
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Análise de Tendências</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Projeções e análises</p>
            <Button variant="outline" size="sm" className="mt-2">
              Ver Tendências
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Relatório por Canal</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Performance por canal</p>
            <Button variant="outline" size="sm" className="mt-2">
              Analisar Canais
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Relatório Executivo</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Resumo executivo completo</p>
            <Button variant="outline" size="sm" className="mt-2">
              Baixar PDF
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Tendência de Vendas vs Meta</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendsData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="mes" />
                <YAxis tickFormatter={formatCurrency} />
                <Tooltip
                  formatter={(value, name) => [
                    formatCurrency(Number(value)), 
                    name === 'vendas' ? 'Vendas' : 'Meta'
                  ]}
                />
                <Line 
                  type="monotone" 
                  dataKey="vendas" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="meta" 
                  stroke="hsl(var(--success))" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: 'hsl(var(--success))', strokeWidth: 2, r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Receita por Canal</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={canalData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="receita"
                  label={({ name, participacao }) => `${name} (${participacao}%)`}
                >
                  {canalData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Ranking de Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {performanceData.map((vendedor, index) => (
              <div key={vendedor.vendedor} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="font-bold text-primary text-sm">
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold">{vendedor.vendedor}</p>
                    <p className="text-sm text-muted-foreground">
                      {vendedor.clientes} clientes
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="font-semibold">{formatCurrency(vendedor.receita)}</p>
                    <p className="text-sm text-muted-foreground">Receita</p>
                  </div>
                  
                  <Badge 
                    variant={vendedor.atingimento >= 100 ? "default" : "secondary"}
                    className={vendedor.atingimento >= 100 ? "bg-success" : ""}
                  >
                    {vendedor.atingimento}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Relatórios Programados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 border border-border rounded-lg">
              <h4 className="font-medium mb-2">Relatório Semanal</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Enviado toda segunda-feira às 8h
              </p>
              <Badge variant="outline">Ativo</Badge>
            </div>
            
            <div className="p-4 border border-border rounded-lg">
              <h4 className="font-medium mb-2">Relatório Mensal</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Enviado no primeiro dia útil do mês
              </p>
              <Badge variant="outline">Ativo</Badge>
            </div>
            
            <div className="p-4 border border-border rounded-lg">
              <h4 className="font-medium mb-2">Relatório Trimestral</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Análise completa por trimestre
              </p>
              <Badge variant="secondary">Configurar</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
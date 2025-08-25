import { 
  Target, 
  TrendingUp, 
  TrendingDown, 
  Calendar,
  Award,
  AlertTriangle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';

const metasData = [
  { 
    nome: 'Meta Mensal - Agosto',
    valor: 1650000,
    atual: 1478000,
    progresso: 89.6,
    status: 'em_andamento',
    prazo: '2024-08-31'
  },
  {
    nome: 'Meta Trimestral - Q3',
    valor: 4800000,
    atual: 4250000,
    progresso: 88.5,
    status: 'em_andamento',
    prazo: '2024-09-30'
  },
  {
    nome: 'Meta Anual - 2024',
    valor: 18000000,
    atual: 14500000,
    progresso: 80.6,
    status: 'em_andamento',
    prazo: '2024-12-31'
  }
];

const progressoMensal = [
  { semana: 'Sem 1', meta: 412500, realizado: 385000 },
  { semana: 'Sem 2', meta: 825000, realizado: 795000 },
  { semana: 'Sem 3', meta: 1237500, realizado: 1180000 },
  { semana: 'Sem 4', meta: 1650000, realizado: 1478000 }
];

const metasPorSegmento = [
  { segmento: 'Ouro', meta: 850000, atual: 765000, progresso: 90.0 },
  { segmento: 'Prata', meta: 550000, atual: 485000, progresso: 88.2 },
  { segmento: 'Bronze', meta: 250000, atual: 228000, progresso: 91.2 }
];

export default function Goals() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const getStatusBadge = (status: string, progresso: number) => {
    if (progresso >= 100) {
      return <Badge className="bg-success text-success-foreground">Concluída</Badge>;
    } else if (progresso >= 90) {
      return <Badge className="bg-warning text-warning-foreground">Perto da Meta</Badge>;
    } else if (progresso >= 70) {
      return <Badge variant="secondary">Em Andamento</Badge>;
    } else {
      return <Badge variant="destructive">Atenção</Badge>;
    }
  };

  const getIcon = (progresso: number) => {
    if (progresso >= 100) return Award;
    if (progresso >= 90) return TrendingUp;
    if (progresso >= 70) return Target;
    return AlertTriangle;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Metas</h1>
        <p className="text-muted-foreground mt-1">
          Acompanhamento de objetivos e performance
        </p>
      </div>

      {/* Metas Principais */}
      <div className="grid gap-4 md:grid-cols-3">
        {metasData.map((meta, index) => {
          const Icon = getIcon(meta.progresso);
          const gap = meta.valor - meta.atual;
          
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{meta.nome}</CardTitle>
                <Icon className={`h-4 w-4 ${
                  meta.progresso >= 100 ? 'text-success' :
                  meta.progresso >= 90 ? 'text-warning' :
                  meta.progresso >= 70 ? 'text-primary' : 'text-destructive'
                }`} />
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Progresso</span>
                    <span className="text-sm font-medium">{meta.progresso.toFixed(1)}%</span>
                  </div>
                  <Progress value={Math.min(meta.progresso, 100)} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Atual:</span>
                    <span className="font-medium">{formatCurrency(meta.atual)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Meta:</span>
                    <span className="font-medium">{formatCurrency(meta.valor)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Gap:</span>
                    <span className={`font-medium ${gap > 0 ? 'text-destructive' : 'text-success'}`}>
                      {gap > 0 ? `-${formatCurrency(gap)}` : `+${formatCurrency(Math.abs(gap))}`}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t">
                  {getStatusBadge(meta.status, meta.progresso)}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Gráficos */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Progresso Semanal - Agosto</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={progressoMensal}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="semana" />
                <YAxis tickFormatter={formatCurrency} />
                <Tooltip
                  formatter={(value, name) => [
                    formatCurrency(Number(value)), 
                    name === 'meta' ? 'Meta' : 'Realizado'
                  ]}
                />
                <Line 
                  type="monotone" 
                  dataKey="meta" 
                  stroke="hsl(var(--muted-foreground))" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: 'hsl(var(--muted-foreground))', strokeWidth: 2, r: 3 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="realizado" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Metas por Segmento</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={metasPorSegmento}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="segmento" />
                <YAxis tickFormatter={formatCurrency} />
                <Tooltip
                  formatter={(value, name) => [
                    formatCurrency(Number(value)), 
                    name === 'meta' ? 'Meta' : 'Atual'
                  ]}
                />
                <Bar dataKey="meta" fill="hsl(var(--muted))" radius={[2, 2, 0, 0]} />
                <Bar dataKey="atual" fill="hsl(var(--primary))" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detalhes das Metas */}
      <Card>
        <CardHeader>
          <CardTitle>Detalhamento por Segmento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {metasPorSegmento.map((meta, index) => (
              <div key={index} className="p-4 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <span className="font-bold text-primary text-sm">
                        {meta.segmento.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold">Segmento {meta.segmento}</h3>
                      <p className="text-sm text-muted-foreground">
                        {meta.progresso.toFixed(1)}% da meta
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{formatCurrency(meta.atual)}</p>
                    <p className="text-sm text-muted-foreground">
                      de {formatCurrency(meta.meta)}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progresso</span>
                    <span>{meta.progresso.toFixed(1)}%</span>
                  </div>
                  <Progress value={Math.min(meta.progresso, 100)} className="h-2" />
                </div>
                
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Faltam: {formatCurrency(meta.meta - meta.atual)}
                  </span>
                  {getStatusBadge('', meta.progresso)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ações Rápidas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Ações Recomendadas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
                <div>
                  <h4 className="font-medium text-warning">Meta Mensal em Risco</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Faltam apenas 5 dias e R$ 172.000 para atingir a meta mensal.
                  </p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Ver Plano de Ação
                  </Button>
                </div>
              </div>
            </div>

            <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
              <div className="flex items-start gap-3">
                <Target className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium text-primary">Oportunidades</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    2 clientes grandes com potencial de fechamento esta semana.
                  </p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Ver Clientes
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
import { 
  TrendingUp, 
  Users, 
  Target,
  Award,
  Calendar,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

const performanceMetrics = [
  { nome: 'Taxa de Conversão', valor: 85.2, meta: 80, max: 100, unidade: '%' },
  { nome: 'Ticket Médio', valor: 15750, meta: 14000, max: 20000, unidade: 'R$' },
  { nome: 'Clientes Ativos', valor: 126, meta: 120, max: 150, unidade: '' },
  { nome: 'Follow-up Rate', valor: 92.5, meta: 90, max: 100, unidade: '%' },
];

const vendedorPerformance = [
  {
    periodo: 'Jan',
    conversao: 78,
    followUp: 85,
    satisfacao: 92,
    receita: 88,
    clientes: 82
  },
  {
    periodo: 'Fev',
    conversao: 82,
    followUp: 88,
    satisfacao: 94,
    receita: 91,
    clientes: 85
  },
  {
    periodo: 'Mar',
    conversao: 85,
    followUp: 90,
    satisfacao: 96,
    receita: 94,
    clientes: 88
  },
  {
    periodo: 'Abr',
    conversao: 83,
    followUp: 92,
    satisfacao: 95,
    receita: 89,
    clientes: 87
  },
  {
    periodo: 'Mai',
    conversao: 87,
    followUp: 94,
    satisfacao: 97,
    receita: 96,
    clientes: 92
  },
  {
    periodo: 'Jun',
    conversao: 89,
    followUp: 96,
    satisfacao: 98,
    receita: 98,
    clientes: 94
  },
  {
    periodo: 'Jul',
    conversao: 86,
    followUp: 93,
    satisfacao: 96,
    receita: 95,
    clientes: 91
  },
  {
    periodo: 'Ago',
    conversao: 85,
    followUp: 93,
    satisfacao: 94,
    receita: 90,
    clientes: 89
  }
];

const atividades = [
  { tipo: 'Visitas Realizadas', quantidade: 48, meta: 50, periodo: 'Este mês' },
  { tipo: 'Ligações Feitas', quantidade: 156, meta: 150, periodo: 'Esta semana' },
  { tipo: 'E-mails Enviados', quantidade: 89, meta: 80, periodo: 'Esta semana' },
  { tipo: 'Propostas Enviadas', quantidade: 23, meta: 25, periodo: 'Este mês' },
];

const rankings = [
  { posicao: 1, nome: 'João Silva', receita: 485000, conversao: 92.3, badge: 'gold' },
  { posicao: 2, nome: 'Você', receita: 415000, conversao: 85.2, badge: 'silver', isCurrentUser: true },
  { posicao: 3, nome: 'Maria Santos', receita: 395000, conversao: 81.7, badge: 'bronze' },
  { posicao: 4, nome: 'Carlos Lima', receita: 365000, conversao: 78.9, badge: null },
];

export default function Performance() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const getBadgeIcon = (badge: string | null) => {
    if (badge === 'gold') return '🥇';
    if (badge === 'silver') return '🥈';
    if (badge === 'bronze') return '🥉';
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Performance</h1>
        <p className="text-muted-foreground mt-1">
          Indicadores de vendas e produtividade pessoal
        </p>
      </div>

      {/* Métricas Principais */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {performanceMetrics.map((metric, index) => {
          const percentage = (metric.valor / metric.max) * 100;
          const isAboveTarget = metric.valor >= metric.meta;
          
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.nome}</CardTitle>
                <Target className={`h-4 w-4 ${isAboveTarget ? 'text-success' : 'text-warning'}`} />
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-2xl font-bold">
                    {metric.unidade === 'R$' ? formatCurrency(metric.valor) : 
                     metric.unidade === '%' ? `${metric.valor}%` : metric.valor}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Meta: {metric.unidade === 'R$' ? formatCurrency(metric.meta) : 
                                  metric.unidade === '%' ? `${metric.meta}%` : metric.meta}</span>
                      <span className={isAboveTarget ? 'text-success' : 'text-destructive'}>
                        {isAboveTarget ? '✓' : '!'}
                      </span>
                    </div>
                    <Progress value={Math.min(percentage, 100)} className="h-2" />
                  </div>
                  
                  <Badge variant={isAboveTarget ? "default" : "secondary"} className={isAboveTarget ? "bg-success" : ""}>
                    {isAboveTarget ? 'Meta Atingida' : 'Abaixo da Meta'}
                  </Badge>
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
            <CardTitle>Evolução da Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={vendedorPerformance}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="periodo" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="conversao" name="Taxa Conversão" fill="hsl(var(--primary))" />
                <Bar dataKey="receita" name="Receita %" fill="hsl(var(--success))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Radar de Competências</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={[vendedorPerformance[vendedorPerformance.length - 1]]}>
                <PolarGrid />
                <PolarAngleAxis dataKey="periodo" tick={false} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} />
                <Radar
                  name="Conversão"
                  dataKey="conversao"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
                <Radar
                  name="Follow-up"
                  dataKey="followUp"
                  stroke="hsl(var(--success))"
                  fill="hsl(var(--success))"
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
                <Radar
                  name="Satisfação"
                  dataKey="satisfacao"
                  stroke="hsl(var(--warning))"
                  fill="hsl(var(--warning))"
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Atividades e Ranking */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Atividades Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {atividades.map((atividade, index) => {
                const percentage = (atividade.quantidade / atividade.meta) * 100;
                const isAboveTarget = atividade.quantidade >= atividade.meta;
                
                return (
                  <div key={index} className="p-3 border border-border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">{atividade.tipo}</h4>
                      <span className="text-sm text-muted-foreground">{atividade.periodo}</span>
                    </div>
                    
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-2xl font-bold">{atividade.quantidade}</span>
                      <Badge variant={isAboveTarget ? "default" : "secondary"} className={isAboveTarget ? "bg-success" : ""}>
                        Meta: {atividade.meta}
                      </Badge>
                    </div>
                    
                    <Progress value={Math.min(percentage, 100)} className="h-1" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Ranking Regional
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {rankings.map((vendedor, index) => (
                <div 
                  key={index} 
                  className={`p-3 border rounded-lg ${
                    vendedor.isCurrentUser ? 'bg-primary/5 border-primary' : 'border-border'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                          <span className="font-bold text-sm">{vendedor.posicao}</span>
                        </div>
                        {getBadgeIcon(vendedor.badge) && (
                          <span className="text-lg">{getBadgeIcon(vendedor.badge)}</span>
                        )}
                      </div>
                      <div>
                        <p className={`font-medium ${vendedor.isCurrentUser ? 'text-primary' : ''}`}>
                          {vendedor.nome}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Conversão: {vendedor.conversao}%
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{formatCurrency(vendedor.receita)}</p>
                      {vendedor.isCurrentUser && (
                        <Badge variant="outline">Você</Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Insights e Recomendações */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Insights de Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
              <h4 className="font-medium text-success mb-2">🎯 Pontos Fortes</h4>
              <ul className="text-sm space-y-1">
                <li>• Taxa de follow-up acima da média (93%)</li>
                <li>• Conversão consistente nos últimos 3 meses</li>
                <li>• Superou meta de e-mails esta semana</li>
              </ul>
            </div>
            
            <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
              <h4 className="font-medium text-warning mb-2">⚡ Oportunidades</h4>
              <ul className="text-sm space-y-1">
                <li>• Aumentar número de visitas (48/50)</li>
                <li>• Foco em clientes de alto valor</li>
                <li>• Melhorar ticket médio por venda</li>
              </ul>
            </div>
            
            <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
              <h4 className="font-medium text-primary mb-2">📈 Próximos Passos</h4>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full">
                  Ver Plano de Ação
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  Agendar Reunião 1:1
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
import { 
  TrendingUp, 
  Target, 
  Users, 
  DollarSign,
  Calendar,
  AlertTriangle 
} from 'lucide-react';
import { KPICard } from '@/components/dashboard/KPICard';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { SegmentChart } from '@/components/dashboard/SegmentChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockMetricas } from '@/data/mockData';

export default function Dashboard() {
  const { 
    receitaTotal,
    receitaMeta,
    atingimentoPercentual,
    gapObjetivo,
    clientesAtendidos,
    clientesAtendidosLY
  } = mockMetricas;

  const clientesChange = ((clientesAtendidos - clientesAtendidosLY) / clientesAtendidosLY) * 100;
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Visão geral da performance comercial - Agosto 2024
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Receita Total"
          value={receitaTotal}
          previousValue={1245000}
          change={18.7}
          icon={DollarSign}
          trend="up"
          format="currency"
        />
        
        <KPICard
          title="Atingimento da Meta"
          value={atingimentoPercentual}
          change={-10.4}
          icon={Target}
          trend="down"
          format="percentage"
        />
        
        <KPICard
          title="Clientes Atendidos"
          value={clientesAtendidos}
          previousValue={clientesAtendidosLY}
          change={clientesChange}
          icon={Users}
          trend="up"
          format="number"
        />
        
        <KPICard
          title="GAP do Objetivo"
          value={Math.abs(gapObjetivo)}
          icon={AlertTriangle}
          trend="down"
          format="currency"
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 md:grid-cols-6">
        <RevenueChart />
        <SegmentChart />
      </div>

      {/* Recent Activities and Alerts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Próximos Follow-ups
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div>
                <p className="font-medium">Loja Fashion Center SP</p>
                <p className="text-sm text-muted-foreground">Reunião de planejamento</p>
              </div>
              <Badge variant="outline">Hoje</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div>
                <p className="font-medium">Elite Fashion GO</p>
                <p className="text-sm text-muted-foreground">Primeira visita</p>
              </div>
              <Badge variant="secondary">Amanhã</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div>
                <p className="font-medium">Fashion World PR</p>
                <p className="text-sm text-muted-foreground">Revisão de pedidos</p>
              </div>
              <Badge variant="outline">03/09</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Alertas de Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
              <AlertTriangle className="h-4 w-4 text-destructive mt-0.5" />
              <div>
                <p className="font-medium text-destructive">Meta em Risco</p>
                <p className="text-sm text-muted-foreground">
                  Faltam R$ 172.000 para atingir o objetivo mensal
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-warning/10 border border-warning/20 rounded-lg">
              <AlertTriangle className="h-4 w-4 text-warning mt-0.5" />
              <div>
                <p className="font-medium text-warning">Clientes Sem Atendimento</p>
                <p className="text-sm text-muted-foreground">
                  2 clientes importantes ainda não foram visitados
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-success/10 border border-success/20 rounded-lg">
              <TrendingUp className="h-4 w-4 text-success mt-0.5" />
              <div>
                <p className="font-medium text-success">Performance Positiva</p>
                <p className="text-sm text-muted-foreground">
                  Crescimento de 18.7% vs ano anterior
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
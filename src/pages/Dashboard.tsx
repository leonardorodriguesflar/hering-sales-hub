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
    <div className="space-y-8 p-2">
      {/* Header with Gradient Background */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary-soft rounded-2xl opacity-50" />
        <div className="relative p-8">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">Dashboard</h1>
          <p className="text-lg text-muted-foreground">
            Visão geral da performance comercial • <span className="font-semibold text-primary">Agosto 2024</span>
          </p>
        </div>
      </div>

      {/* Enhanced KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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

      {/* Enhanced Charts Row */}
      <div className="grid gap-6 md:grid-cols-6">
        <div className="md:col-span-4">
          <RevenueChart />
        </div>
        <div className="md:col-span-2">
          <SegmentChart />
        </div>
      </div>

      {/* Enhanced Activities and Alerts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-gradient-card border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="h-10 w-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-md">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              Próximos Follow-ups
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gradient-primary-soft rounded-xl border border-primary/20 shadow-sm hover:shadow-md transition-all duration-300">
              <div>
                <p className="font-semibold text-foreground">Loja Fashion Center SP</p>
                <p className="text-sm text-muted-foreground">Reunião de planejamento</p>
              </div>
              <Badge variant="outline" className="bg-gradient-primary text-white border-0 font-semibold shadow-sm">
                Hoje
              </Badge>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-white/50 rounded-xl border border-border/50 shadow-sm hover:shadow-md transition-all duration-300">
              <div>
                <p className="font-semibold text-foreground">Elite Fashion GO</p>
                <p className="text-sm text-muted-foreground">Primeira visita</p>
              </div>
              <Badge variant="secondary" className="font-semibold">Amanhã</Badge>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-white/50 rounded-xl border border-border/50 shadow-sm hover:shadow-md transition-all duration-300">
              <div>
                <p className="font-semibold text-foreground">Fashion World PR</p>
                <p className="text-sm text-muted-foreground">Revisão de pedidos</p>
              </div>
              <Badge variant="outline" className="font-semibold">03/09</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="h-10 w-10 bg-gradient-warning rounded-xl flex items-center justify-center shadow-md">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              Alertas de Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-destructive/10 to-destructive/5 border border-destructive/30 rounded-xl shadow-sm">
              <div className="h-8 w-8 bg-destructive/20 rounded-lg flex items-center justify-center mt-0.5">
                <AlertTriangle className="h-4 w-4 text-destructive" />
              </div>
              <div>
                <p className="font-semibold text-destructive">Meta em Risco</p>
                <p className="text-sm text-muted-foreground">
                  Faltam R$ 172.000 para atingir o objetivo mensal
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-warning/10 to-warning/5 border border-warning/30 rounded-xl shadow-sm">
              <div className="h-8 w-8 bg-warning/20 rounded-lg flex items-center justify-center mt-0.5">
                <AlertTriangle className="h-4 w-4 text-warning" />
              </div>
              <div>
                <p className="font-semibold text-warning">Clientes Sem Atendimento</p>
                <p className="text-sm text-muted-foreground">
                  2 clientes importantes ainda não foram visitados
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-success/10 to-success/5 border border-success/30 rounded-xl shadow-sm">
              <div className="h-8 w-8 bg-success/20 rounded-lg flex items-center justify-center mt-0.5">
                <TrendingUp className="h-4 w-4 text-success" />
              </div>
              <div>
                <p className="font-semibold text-success">Performance Positiva</p>
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
import { 
  TrendingUp, 
  Target, 
  Users, 
  DollarSign,
  Calendar,
  AlertTriangle,
  MapPin,
  Phone
} from 'lucide-react';
import { KPICard } from '@/components/dashboard/KPICard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';

// Mock data específico para o vendedor
const vendedorMetrics = {
  receitaTotal: 125000,
  receitaMeta: 150000,
  atingimentoPercentual: 83.3,
  clientesAtendidos: 28,
  clientesAtendidosLY: 24,
  proximasVisitas: 5,
  propostas: 8
};

const minhasPropostas = [
  { id: 1, cliente: 'Loja Fashion Center SP', valor: 45000, status: 'aprovada', vencimento: '2024-09-15' },
  { id: 2, cliente: 'Elite Fashion GO', valor: 32000, status: 'pendente', vencimento: '2024-09-20' },
  { id: 3, cliente: 'Fashion World PR', valor: 28000, status: 'em_analise', vencimento: '2024-09-18' }
];

const proximasVisitas = [
  { cliente: 'Loja Fashion Center SP', data: 'Hoje', horario: '14:00', telefone: '(11) 99999-9999', endereco: 'Shopping Center Norte - SP' },
  { cliente: 'Elite Fashion GO', data: 'Amanhã', horario: '09:30', telefone: '(62) 88888-8888', endereco: 'Av. Goiás, 1234 - Goiânia' },
  { cliente: 'Fashion World PR', data: '03/09', horario: '16:00', telefone: '(41) 77777-7777', endereco: 'Rua XV de Novembro - Curitiba' }
];

export default function VendedorDashboard() {
  const { user } = useAuth();
  const clientesChange = ((vendedorMetrics.clientesAtendidos - vendedorMetrics.clientesAtendidosLY) / vendedorMetrics.clientesAtendidosLY) * 100;
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'aprovada': return 'bg-success text-success-foreground';
      case 'pendente': return 'bg-warning text-warning-foreground';
      case 'em_analise': return 'bg-primary text-primary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'aprovada': return 'Aprovada';
      case 'pendente': return 'Pendente';
      case 'em_analise': return 'Em Análise';
      default: return 'Rascunho';
    }
  };

  return (
    <div className="space-y-8 p-2">
      {/* Header personalizado para vendedor */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary-soft rounded-2xl opacity-50" />
        <div className="relative p-8">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">Meu Dashboard</h1>
          <p className="text-lg text-muted-foreground">
            Olá, <span className="font-semibold text-primary">{user?.name}</span> • {user?.region} • <span className="font-semibold text-primary">Agosto 2024</span>
          </p>
        </div>
      </div>

      {/* KPIs do Vendedor */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Minha Receita"
          value={vendedorMetrics.receitaTotal}
          previousValue={95000}
          change={31.6}
          icon={DollarSign}
          trend="up"
          format="currency"
        />
        
        <KPICard
          title="Atingimento Meta"
          value={vendedorMetrics.atingimentoPercentual}
          change={8.3}
          icon={Target}
          trend="up"
          format="percentage"
        />
        
        <KPICard
          title="Clientes Atendidos"
          value={vendedorMetrics.clientesAtendidos}
          previousValue={vendedorMetrics.clientesAtendidosLY}
          change={clientesChange}
          icon={Users}
          trend="up"
          format="number"
        />
        
        <KPICard
          title="Próximas Visitas"
          value={vendedorMetrics.proximasVisitas}
          icon={Calendar}
          trend="neutral"
          format="number"
        />
      </div>

      {/* Conteúdo específico do vendedor */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Minhas Propostas */}
        <Card className="bg-gradient-card border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="h-10 w-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-md">
                <DollarSign className="h-5 w-5 text-white" />
              </div>
              Minhas Propostas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {minhasPropostas.map((proposta) => (
              <div key={proposta.id} className="flex items-center justify-between p-4 bg-gradient-primary-soft/30 rounded-xl border border-border/20 hover:bg-gradient-primary-soft/50 transition-all duration-200">
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{proposta.cliente}</p>
                  <p className="text-sm text-muted-foreground">Venc: {proposta.vencimento}</p>
                  <p className="text-lg font-bold text-primary">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(proposta.valor)}
                  </p>
                </div>
                <Badge className={getStatusColor(proposta.status)}>
                  {getStatusText(proposta.status)}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Próximas Visitas Detalhadas */}
        <Card className="bg-gradient-card border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="h-10 w-10 bg-gradient-success rounded-xl flex items-center justify-center shadow-md">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              Agenda de Visitas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {proximasVisitas.map((visita, index) => (
              <div key={index} className="p-4 bg-gradient-primary-soft/30 rounded-xl border border-border/20 hover:bg-gradient-primary-soft/50 transition-all duration-200">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold text-foreground">{visita.cliente}</p>
                    <p className="text-sm font-medium text-primary">{visita.data} às {visita.horario}</p>
                  </div>
                  <Badge variant="outline" className="bg-gradient-primary text-white border-0 font-semibold shadow-sm">
                    {visita.data}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-3 w-3" />
                    {visita.telefone}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {visita.endereco}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Alertas pessoais */}
      <Card className="bg-gradient-card border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="h-10 w-10 bg-gradient-warning rounded-xl flex items-center justify-center shadow-md">
              <AlertTriangle className="h-5 w-5 text-white" />
            </div>
            Meus Alertas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-warning/10 to-warning/5 border border-warning/30 rounded-xl shadow-sm">
            <div className="h-8 w-8 bg-warning/20 rounded-lg flex items-center justify-center mt-0.5">
              <Target className="h-4 w-4 text-warning" />
            </div>
            <div>
              <p className="font-semibold text-warning">Faltam R$ 25.000 para bater a meta</p>
              <p className="text-sm text-muted-foreground">
                Você está a 83% da sua meta mensal. Continue assim!
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-success/10 to-success/5 border border-success/30 rounded-xl shadow-sm">
            <div className="h-8 w-8 bg-success/20 rounded-lg flex items-center justify-center mt-0.5">
              <TrendingUp className="h-4 w-4 text-success" />
            </div>
            <div>
              <p className="font-semibold text-success">Excelente Performance!</p>
              <p className="text-sm text-muted-foreground">
                Crescimento de 31.6% vs mesmo período do ano passado
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
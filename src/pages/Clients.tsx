import { useState } from 'react';
import { Search, Filter, Download, Eye, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mockClientes } from '@/data/mockData';
import { Cliente } from '@/types';

export default function Clients() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSegmento, setFilterSegmento] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterTipo, setFilterTipo] = useState<string>('all');

  const filteredClients = mockClientes.filter(cliente => {
    const matchesSearch = cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cliente.cnpj.includes(searchTerm) ||
                         cliente.cidade.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSegmento = filterSegmento === 'all' || cliente.segmentacao === filterSegmento;
    const matchesStatus = filterStatus === 'all' || cliente.statusAtendimento === filterStatus;
    const matchesTipo = filterTipo === 'all' || cliente.tipoEvento === filterTipo;

    return matchesSearch && matchesSegmento && matchesStatus && matchesTipo;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Atendido':
        return <Badge className="bg-success text-success-foreground">Atendido</Badge>;
      case 'Em Andamento':
        return <Badge variant="secondary">Em Andamento</Badge>;
      case 'Não Atendido':
        return <Badge variant="destructive">Não Atendido</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getFarolColor = (farol: string) => {
    switch (farol) {
      case 'Verde':
        return 'bg-success';
      case 'Amarelo':
        return 'bg-warning';
      case 'Vermelho':
        return 'bg-destructive';
      default:
        return 'bg-muted';
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
          <p className="text-muted-foreground mt-1">
            Gestão completa da carteira de clientes
          </p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Exportar
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar por nome, CNPJ, cidade..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filterTipo} onValueChange={setFilterTipo}>
              <SelectTrigger>
                <SelectValue placeholder="Tipo de Evento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="SHOWROOM">Showroom</SelectItem>
                <SelectItem value="PRONTA_ENTREGA">Pronta Entrega</SelectItem>
                <SelectItem value="CARTEIRA">Carteira</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterSegmento} onValueChange={setFilterSegmento}>
              <SelectTrigger>
                <SelectValue placeholder="Segmentação" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="Ouro">Ouro</SelectItem>
                <SelectItem value="Prata">Prata</SelectItem>
                <SelectItem value="Bronze">Bronze</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="Atendido">Atendido</SelectItem>
                <SelectItem value="Em Andamento">Em Andamento</SelectItem>
                <SelectItem value="Não Atendido">Não Atendido</SelectItem>
              </SelectContent>
            </Select>

            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setFilterSegmento('all');
                setFilterStatus('all');
                setFilterTipo('all');
              }}
            >
              Limpar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <Card>
        <CardHeader>
          <CardTitle>
            Resultados ({filteredClients.length} clientes)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Localização</TableHead>
                  <TableHead>Segmento</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Farol</TableHead>
                  <TableHead className="text-right">Receita Atual</TableHead>
                  <TableHead className="text-right">Atingimento</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((cliente) => (
                  <TableRow key={cliente.chave}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{cliente.nome}</p>
                        <p className="text-sm text-muted-foreground">{cliente.cnpj}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{cliente.cidade}</p>
                        <p className="text-sm text-muted-foreground">{cliente.uf}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={cliente.segmentacao === 'Ouro' ? 'default' : 'secondary'}>
                        {cliente.segmentacao}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {cliente.tipoEvento.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(cliente.statusAtendimento)}
                    </TableCell>
                    <TableCell>
                      <div className={`w-3 h-3 rounded-full ${getFarolColor(cliente.farol)}`} />
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(cliente.receitaAtual)}
                    </TableCell>
                    <TableCell className="text-right">
                      <span className={cliente.atingimento >= 100 ? 'text-success' : 'text-destructive'}>
                        {cliente.atingimento.toFixed(1)}%
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Mail className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
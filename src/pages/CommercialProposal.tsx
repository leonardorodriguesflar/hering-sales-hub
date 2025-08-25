import { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Download, 
  Send,
  Clock,
  CheckCircle,
  XCircle,
  Edit,
  Eye,
  Calculator
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';

interface Proposta {
  id: string;
  cliente: string;
  valor: number;
  status: 'rascunho' | 'enviada' | 'aprovada' | 'rejeitada';
  dataEnvio?: string;
  dataVencimento: string;
  descricao: string;
  itens: PropostaItem[];
}

interface PropostaItem {
  produto: string;
  quantidade: number;
  valorUnitario: number;
  desconto: number;
}

const propostas: Proposta[] = [
  {
    id: 'PROP001',
    cliente: 'Loja Fashion Center SP',
    valor: 45000,
    status: 'enviada',
    dataEnvio: '2024-08-20',
    dataVencimento: '2024-09-05',
    descricao: 'Proposta para coleção outono/inverno',
    itens: [
      { produto: 'Camiseta Básica', quantidade: 100, valorUnitario: 45, desconto: 10 },
      { produto: 'Calça Jeans', quantidade: 50, valorUnitario: 120, desconto: 15 },
    ]
  },
  {
    id: 'PROP002',
    cliente: 'Boutique Elegante RJ',
    valor: 32000,
    status: 'aprovada',
    dataEnvio: '2024-08-15',
    dataVencimento: '2024-08-30',
    descricao: 'Coleção premium feminina',
    itens: [
      { produto: 'Blusa Social', quantidade: 80, valorUnitario: 85, desconto: 5 },
      { produto: 'Saia Midi', quantidade: 60, valorUnitario: 95, desconto: 8 },
    ]
  },
  {
    id: 'PROP003',
    cliente: 'Style Store RS',
    valor: 28500,
    status: 'rascunho',
    dataVencimento: '2024-09-10',
    descricao: 'Proposta básica masculina',
    itens: [
      { produto: 'Polo Masculina', quantidade: 120, valorUnitario: 65, desconto: 12 },
      { produto: 'Bermuda Sarja', quantidade: 80, valorUnitario: 75, desconto: 10 },
    ]
  }
];

export default function CommercialProposal() {
  const [selectedProposal, setSelectedProposal] = useState<Proposta | null>(null);
  const [isNewProposalOpen, setIsNewProposalOpen] = useState(false);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'rascunho':
        return <Badge variant="secondary">Rascunho</Badge>;
      case 'enviada':
        return <Badge className="bg-warning text-warning-foreground">Enviada</Badge>;
      case 'aprovada':
        return <Badge className="bg-success text-success-foreground">Aprovada</Badge>;
      case 'rejeitada':
        return <Badge variant="destructive">Rejeitada</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'rascunho':
        return <Edit className="h-4 w-4" />;
      case 'enviada':
        return <Clock className="h-4 w-4" />;
      case 'aprovada':
        return <CheckCircle className="h-4 w-4" />;
      case 'rejeitada':
        return <XCircle className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const calcularTotalProposta = (proposta: Proposta) => {
    return proposta.itens.reduce((total, item) => {
      const valorComDesconto = item.valorUnitario * (1 - item.desconto / 100);
      return total + (item.quantidade * valorComDesconto);
    }, 0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Propostas Comerciais</h1>
          <p className="text-muted-foreground mt-1">
            Criação e gestão de propostas comerciais
          </p>
        </div>
        
        <Dialog open={isNewProposalOpen} onOpenChange={setIsNewProposalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nova Proposta
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Nova Proposta Comercial</DialogTitle>
              <DialogDescription>
                Crie uma nova proposta para enviar ao cliente
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cliente">Cliente</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar cliente" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fashion-center">Loja Fashion Center SP</SelectItem>
                      <SelectItem value="boutique-elegante">Boutique Elegante RJ</SelectItem>
                      <SelectItem value="style-store">Style Store RS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="vencimento">Data de Vencimento</Label>
                  <Input type="date" />
                </div>
              </div>
              <div>
                <Label htmlFor="descricao">Descrição</Label>
                <Textarea placeholder="Descrição da proposta" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsNewProposalOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setIsNewProposalOpen(false)}>
                Criar Proposta
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Resumo */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Propostas</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{propostas.length}</div>
            <p className="text-xs text-muted-foreground">Este mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
            <Calculator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(propostas.reduce((sum, p) => sum + calcularTotalProposta(p), 0))}
            </div>
            <p className="text-xs text-muted-foreground">Todas as propostas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Aprovação</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">67%</div>
            <p className="text-xs text-muted-foreground">Últimos 30 dias</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aguardando Resposta</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {propostas.filter(p => p.status === 'enviada').length}
            </div>
            <p className="text-xs text-muted-foreground">Propostas pendentes</p>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Propostas */}
      <Card>
        <CardHeader>
          <CardTitle>Propostas Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Proposta</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                  <TableHead>Vencimento</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {propostas.map((proposta) => (
                  <TableRow key={proposta.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(proposta.status)}
                        <div>
                          <p className="font-medium">{proposta.id}</p>
                          <p className="text-sm text-muted-foreground">{proposta.descricao}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium">{proposta.cliente}</p>
                      {proposta.dataEnvio && (
                        <p className="text-sm text-muted-foreground">
                          Enviada em {new Date(proposta.dataEnvio).toLocaleDateString('pt-BR')}
                        </p>
                      )}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(proposta.status)}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(calcularTotalProposta(proposta))}
                    </TableCell>
                    <TableCell>
                      <p>{new Date(proposta.dataVencimento).toLocaleDateString('pt-BR')}</p>
                      <p className="text-sm text-muted-foreground">
                        {Math.ceil((new Date(proposta.dataVencimento).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} dias
                      </p>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => setSelectedProposal(proposta)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl">
                            <DialogHeader>
                              <DialogTitle>Proposta {selectedProposal?.id}</DialogTitle>
                              <DialogDescription>
                                {selectedProposal?.descricao}
                              </DialogDescription>
                            </DialogHeader>
                            {selectedProposal && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label>Cliente</Label>
                                    <p className="font-medium">{selectedProposal.cliente}</p>
                                  </div>
                                  <div>
                                    <Label>Status</Label>
                                    <div className="mt-1">
                                      {getStatusBadge(selectedProposal.status)}
                                    </div>
                                  </div>
                                </div>
                                
                                <div>
                                  <Label>Itens da Proposta</Label>
                                  <Table className="mt-2">
                                    <TableHeader>
                                      <TableRow>
                                        <TableHead>Produto</TableHead>
                                        <TableHead>Qtd</TableHead>
                                        <TableHead>Valor Unit.</TableHead>
                                        <TableHead>Desconto</TableHead>
                                        <TableHead className="text-right">Total</TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      {selectedProposal.itens.map((item, index) => {
                                        const valorComDesconto = item.valorUnitario * (1 - item.desconto / 100);
                                        const total = item.quantidade * valorComDesconto;
                                        
                                        return (
                                          <TableRow key={index}>
                                            <TableCell>{item.produto}</TableCell>
                                            <TableCell>{item.quantidade}</TableCell>
                                            <TableCell>{formatCurrency(item.valorUnitario)}</TableCell>
                                            <TableCell>{item.desconto}%</TableCell>
                                            <TableCell className="text-right">{formatCurrency(total)}</TableCell>
                                          </TableRow>
                                        );
                                      })}
                                    </TableBody>
                                  </Table>
                                  
                                  <div className="mt-4 p-4 bg-muted rounded-lg">
                                    <div className="flex justify-between items-center">
                                      <span className="font-semibold">Total da Proposta:</span>
                                      <span className="text-xl font-bold">
                                        {formatCurrency(calcularTotalProposta(selectedProposal))}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                            <DialogFooter>
                              <Button variant="outline">
                                <Download className="h-4 w-4 mr-2" />
                                Baixar PDF
                              </Button>
                              {selectedProposal?.status === 'rascunho' && (
                                <Button>
                                  <Send className="h-4 w-4 mr-2" />
                                  Enviar
                                </Button>
                              )}
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        
                        {proposta.status === 'rascunho' && (
                          <Button variant="ghost" size="icon">
                            <Send className="h-4 w-4" />
                          </Button>
                        )}
                        
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
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
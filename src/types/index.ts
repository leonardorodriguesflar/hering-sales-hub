export interface Cliente {
  chave: string;
  cnpj: string;
  nome: string;
  uf: string;
  cidade: string;
  subcanal: string;
  segmentacao: 'Bronze' | 'Prata' | 'Ouro';
  statusAtendimento: 'Atendido' | 'Não Atendido' | 'Em Andamento';
  statusCliente: 'Ativo' | 'Inativo' | 'Novo';
  farol: 'Verde' | 'Amarelo' | 'Vermelho';
  receitaLY: number;
  receitaAtual: number;
  atingimento: number;
  gap: number;
  tipoEvento: 'SHOWROOM' | 'PRONTA_ENTREGA' | 'CARTEIRA';
  dataUltimoContato?: string;
  proximoFollowUp?: string;
}

export interface MetricasGerais {
  receitaTotal: number;
  receitaMeta: number;
  atingimentoPercentual: number;
  gapObjetivo: number;
  clientesAtendidos: number;
  clientesAtendidosLY: number;
  receitaShowroom: number;
  receitaProntaEntrega: number;
  receitaCarteira: number;
}

export interface MetricasPorRegiao {
  uf: string;
  receita: number;
  atingimento: number;
  clientes: number;
}

export interface MetricasPorSegmento {
  segmento: string;
  receita: number;
  atingimento: number;
  clientes: number;
  percentualTotal: number;
}

export interface FiltrosCliente {
  tipoEvento?: string;
  uf?: string;
  cidade?: string;
  segmentacao?: string;
  statusAtendimento?: string;
  farol?: string;
  receitaMin?: number;
  receitaMax?: number;
  busca?: string;
}
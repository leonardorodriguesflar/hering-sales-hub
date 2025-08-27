import { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface KPICardProps {
  title: string;
  value: string | number;
  previousValue?: string | number;
  change?: number;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  format?: 'currency' | 'percentage' | 'number';
  className?: string;
}

export function KPICard({
  title,
  value,
  previousValue,
  change,
  icon: Icon,
  trend = 'neutral',
  format = 'number',
  className
}: KPICardProps) {
  const formatValue = (val: string | number) => {
    if (format === 'currency') {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(Number(val));
    }
    
    if (format === 'percentage') {
      return `${val}%`;
    }
    
    return val.toLocaleString('pt-BR');
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'text-success';
    if (trend === 'down') return 'text-destructive';
    return 'text-muted-foreground';
  };

  const getIconBackground = () => {
    if (trend === 'up') return 'bg-gradient-success';
    if (trend === 'down') return 'bg-gradient-warning';
    return 'bg-gradient-primary';
  };

  const getTrendIcon = () => {
    if (change === undefined) return null;
    
    return (
      <div className={cn(
        "flex items-center gap-1 text-sm font-bold px-2 py-1 rounded-full",
        trend === 'up' && "bg-success/10 text-success",
        trend === 'down' && "bg-destructive/10 text-destructive",
        trend === 'neutral' && "bg-muted/20 text-muted-foreground"
      )}>
        {change > 0 && '+'}
        {change}
        {format === 'percentage' ? 'pp' : '%'}
      </div>
    );
  };

  return (
    <Card className={cn(
      "hover:shadow-glow transition-all duration-300 bg-gradient-card border-0 group hover:scale-[1.02] cursor-pointer",
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          {title}
        </CardTitle>
        <div className={cn(
          "h-12 w-12 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300",
          getIconBackground()
        )}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between">
          <div>
            <div className="text-3xl font-bold text-foreground mb-1 tracking-tight">
              {formatValue(value)}
            </div>
            {previousValue && (
              <p className="text-xs text-muted-foreground font-medium">
                Anterior: {formatValue(previousValue)}
              </p>
            )}
          </div>
          {getTrendIcon()}
        </div>
      </CardContent>
    </Card>
  );
}
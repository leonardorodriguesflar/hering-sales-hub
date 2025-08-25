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

  const getTrendIcon = () => {
    if (change === undefined) return null;
    
    return (
      <div className={cn(
        "flex items-center gap-1 text-sm font-medium",
        getTrendColor()
      )}>
        {change > 0 && '+'}
        {change}
        {format === 'percentage' ? 'pp' : '%'}
      </div>
    );
  };

  return (
    <Card className={cn("hover:shadow-lg transition-all duration-300", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between">
          <div>
            <div className="text-2xl font-bold">
              {formatValue(value)}
            </div>
            {previousValue && (
              <p className="text-xs text-muted-foreground mt-1">
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
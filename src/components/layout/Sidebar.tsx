import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  BarChart3, 
  Target, 
  FileText,
  Settings,
  ChevronLeft,
  TrendingUp,
  MapPin
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigationItems = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/',
    description: 'Visão geral dos KPIs'
  },
  {
    title: 'Clientes',
    icon: Users,
    href: '/clients',
    description: 'Gestão da carteira'
  },
  {
    title: 'Análise Geográfica',
    icon: MapPin,
    href: '/geographic',
    description: 'Performance por região'
  },
  {
    title: 'Relatórios',
    icon: BarChart3,
    href: '/reports',
    description: 'Analytics avançados'
  },
  {
    title: 'Metas',
    icon: Target,
    href: '/goals',
    description: 'Acompanhamento de objetivos'
  },
  {
    title: 'Performance',
    icon: TrendingUp,
    href: '/performance',
    description: 'Indicadores de vendas'
  },
  {
    title: 'Propostas Comerciais',
    icon: FileText,
    href: '/proposals',
    description: 'Gestão de propostas'
  }
];

const bottomItems = [
  {
    title: 'Configurações',
    icon: Settings,
    href: '/settings'
  }
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (path: string) => {
    return path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed left-0 top-0 h-full bg-card border-r border-border z-50 transition-all duration-300",
          "lg:relative lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          collapsed ? "w-16" : "w-64"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-border">
            {!collapsed && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">H</span>
                </div>
                <span className="font-semibold text-sm">Sales Hub</span>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex"
            >
              <ChevronLeft className={cn(
                "h-4 w-4 transition-transform",
                collapsed && "rotate-180"
              )} />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigationItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                  "hover:bg-accent hover:text-accent-foreground",
                  isActive(item.href) && "bg-primary text-primary-foreground shadow-md"
                )}
                onClick={() => {
                  if (window.innerWidth < 1024) onClose();
                }}
              >
                <item.icon className={cn("h-5 w-5 flex-shrink-0")} />
                {!collapsed && (
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{item.title}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {item.description}
                    </p>
                  </div>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Bottom items */}
          <div className="p-4 border-t border-border">
            {bottomItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                  "hover:bg-accent hover:text-accent-foreground",
                  isActive(item.href) && "bg-primary text-primary-foreground"
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && (
                  <span className="text-sm font-medium">{item.title}</span>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
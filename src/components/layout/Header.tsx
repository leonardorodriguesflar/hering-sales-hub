import { Bell, Search, User, Menu, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { user, logout } = useAuth();

  return (
    <header className="h-16 bg-gradient-hero border-b border-border/20 flex items-center justify-between px-6 shadow-lg backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="lg:hidden text-white hover:bg-white/10"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-glow border border-white/30">
            <span className="text-white font-bold text-lg">H</span>
          </div>
          <div>
            <h1 className="font-bold text-xl text-white tracking-tight">Hering Sales Hub</h1>
            <div className="flex items-center gap-2">
              <p className="text-xs text-white/80 font-medium">Sistema Premium de Gestão de Vendas</p>
              {user && (
                <Badge variant="secondary" className="bg-white/20 text-white border-0 text-xs">
                  {user.role === 'vendedor' ? 'Vendedor' : 'Planejamento'}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-4 flex-1 max-w-md ml-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
          <Input 
            placeholder="Buscar clientes, CNPJ..."
            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 backdrop-blur-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/10">
          <Bell className="h-5 w-5" />
          <div className="absolute -top-1 -right-1 h-3 w-3 bg-gradient-warning rounded-full shadow-glow animate-pulse" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 text-white hover:bg-white/10">
              <div className="w-8 h-8 bg-gradient-primary-soft rounded-full flex items-center justify-center border border-white/30">
                <User className="h-4 w-4 text-primary" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold text-white">{user?.name}</p>
                <p className="text-xs text-white/80">{user?.region || 'Gestão'}</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-card/95 backdrop-blur-sm border-border/20">
            <DropdownMenuItem>Perfil</DropdownMenuItem>
            <DropdownMenuItem>Configurações</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
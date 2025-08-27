import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const success = await login(email, password);
      if (!success) {
        setError('Credenciais inválidas. Tente novamente.');
      }
    } catch (err) {
      setError('Erro ao fazer login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemoCredentials = (role: 'vendedor' | 'planejamento') => {
    if (role === 'vendedor') {
      setEmail('vendedor@hering.com');
    } else {
      setEmail('planejamento@hering.com');
    }
    setPassword('demo123');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary-light to-primary-glow flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-glow border border-white/30 mx-auto mb-4">
            <span className="text-white font-bold text-2xl">H</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Hering Sales Hub</h1>
          <p className="text-white/80 font-medium">Sistema de Gestão de Vendas</p>
        </div>

        {/* Login Form */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-white">Login</CardTitle>
            <CardDescription className="text-white/70">
              Acesse sua conta para continuar
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <Alert className="bg-destructive/20 border-destructive/30 text-white">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white font-medium">
                  Senha
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-white/70 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-white text-primary hover:bg-white/90 font-bold py-3"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  'Entrar'
                )}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="space-y-3">
              <div className="text-center">
                <p className="text-white/70 text-sm font-medium mb-3">Contas de demonstração:</p>
              </div>
              
              <div className="grid gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fillDemoCredentials('vendedor')}
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 text-sm"
                >
                  👤 Acesso Vendedor
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fillDemoCredentials('planejamento')}
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 text-sm"
                >
                  📊 Acesso Planejamento
                </Button>
              </div>
              
              <p className="text-white/60 text-xs text-center">
                Clique em uma das opções acima para preencher as credenciais automaticamente
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
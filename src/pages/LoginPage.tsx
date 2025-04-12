import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { login } from "@/services/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import logoEva from "@/assets/logo-eva.png";
import { formatUsername } from "@/helpers/formatUsername";
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await login(formatUsername(username), password);
      localStorage.setItem("token", data.access);
      navigate("/tasks");
    } catch {
      toast({
        title: "Erro no Login",
        description: "Credenciais inválidas. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center flex-col justify-center h-screen bg-primary/10">
      <div className="flex flex-col items-center mb-6">
        <img src={logoEva} alt="EVA Logo" className="h-20 mb-2" />
        <h1 className="text-2xl font-bold text-primary">
          Estratégia Visual Ágil
        </h1>
      </div>
      <Card className="w-4/5 mx-auto max-w-lg border-primary/20 shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-center text-2xl font-bold text-primary">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="space-y-4 flex flex-col w-full"
          >
            <Input
              type="text"
              placeholder="Usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border-primary/30 focus-visible:ring-primary"
            />
            <Input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-primary/30 focus-visible:ring-primary"
            />
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90"
            >
              Entrar
            </Button>
          </form>
        </CardContent>
      </Card>
      <div className="mt-4 text-primary/80">
        <span>Não possui uma conta? </span>
        <a href="/signup" className="text-accent hover:underline font-semibold">
          Cadastre-se
        </a>
      </div>
    </div>
  );
};

export default LoginPage;

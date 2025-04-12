import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { login } from "@/services/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await login(username, password);
      localStorage.setItem("token", data.access);
      navigate("/tasks");
    } catch (error) {
      console.log(error);
      toast({
        title: "Erro no Login",
        description: "Credenciais inválidas. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center flex-col justify-center h-screen bg-gray-100">
      <Card className="w-4/5 mx-auto max-w-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
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
            />
            <Input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" className="w-full">
              Entrar
            </Button>
          </form>
        </CardContent>
      </Card>
      <div className="mt-4 text-gray-500">
        <span>Não possui uma conta? </span>
        <a
          href="/signup"
          className="text-blue-500 hover:underline font-semibold"
        >
          Cadastre-se
        </a>
      </div>
    </div>
  );
};

export default LoginPage;

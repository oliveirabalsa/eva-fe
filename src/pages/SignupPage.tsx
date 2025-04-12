import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { register } from "@/services/axios";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(username, email, password);
      toast({
        title: "Cadastro Realizado",
        description:
          "Sua conta foi criada com sucesso. Faça login para continuar.",
        variant: "default",
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      toast({
        title: "Erro no Cadastro",
        description: "Não foi possível criar sua conta. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center flex-col justify-center h-screen bg-gray-100">
      <Card className="w-4/5 mx-auto max-w-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Cadastro
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
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" className="w-full">
              Cadastrar
            </Button>
          </form>
        </CardContent>
      </Card>
      <div className="mt-4 text-gray-500">
        <span>Já possui uma conta? </span>
        <a href="/" className="text-blue-500 hover:underline font-semibold">
          Faça login
        </a>
      </div>
    </div>
  );
};

export default SignupPage;

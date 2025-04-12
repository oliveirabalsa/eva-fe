import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { register } from "@/services/axios";
import logoEva from "@/assets/logo-eva.png";

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
      navigate("/");
    } catch {
      toast({
        title: "Erro no Cadastro",
        description: "Não foi possível criar sua conta. Tente novamente.",
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
              className="border-primary/30 focus-visible:ring-primary"
            />
            <Input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              Cadastrar
            </Button>
          </form>
        </CardContent>
      </Card>
      <div className="mt-4 text-primary/80">
        <span>Já possui uma conta? </span>
        <a href="/" className="text-accent hover:underline font-semibold">
          Faça login
        </a>
      </div>
    </div>
  );
};

export default SignupPage;

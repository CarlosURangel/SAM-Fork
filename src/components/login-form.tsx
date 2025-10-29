"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();

  const [nombre, setNombre] = useState("");
  const [cve, setCve] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] =
    useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, cve }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Credenciales inválidas");
      }

      toast.success("Inicio de sesión exitoso", {
        description: "Serás redirigido en un momento.",
      });

      if (data.rol === "admin") {
        router.push("/dashboard/gestion-de-usuarios");
      } else if (data.rol === "teacher") {
        router.push("/user-dashboard/registro");
      } else {
        router.push("/");
      }
    } catch (err: any) {
      setError(err.message);
      toast.error("Error al iniciar sesión", {
        description: err.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="py-8 rounded-sm">
        <CardHeader className="text-center pb-8">
          <CardTitle className="text-3xl font-normal">
            Control de Asesorías y Mentorías (SAM)
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-18">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="nombre">Usuario</Label>
                <Input
                  id="nombre"
                  type="text"
                  placeholder="Usuario"
                  required
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cve">Contraseña</Label>
                <Input
                  id="cve"
                  type="password"
                  placeholder="•••••••"
                  required
                  value={cve}
                  onChange={(e) => setCve(e.target.value)}
                  disabled={isLoading}
                />
                <Dialog
                  open={isForgotPasswordModalOpen}
                  onOpenChange={setIsForgotPasswordModalOpen}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="link"
                      className="ml-auto inline-block h-auto p-0 text-sm text-blue-900 hover:underline"
                      tabIndex={-1}
                    >
                      Olvidé mi contraseña
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Recuperar contraseña</DialogTitle>
                      <DialogDescription>
                        Por favor, acude con el encargado o administrador para
                        restablecer tu contraseña.
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>

              {error && (
                <p className="text-sm font-normal text-red-700 text-center">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
                style={{ backgroundColor: "#083C6E" }}
              >
                {isLoading ? "Ingresando..." : "Ingresar"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DateTimeInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  className?: string;
}

export const DateTimeInput = ({
  value,
  onChange,
  label = "Fecha:",
  className,
}: DateTimeInputProps) => {
  return (
    <div className={`grid w-full items-center gap-2 ${className}`}>
      <Label htmlFor={label}>{label}</Label>
      <Input
        type="datetime-local"
        id={label}
        value={value} // 3. Usamos el valor que nos pasan por props
        onChange={(e) => onChange(e.target.value)} // 4. Notificamos al padre cuando el valor cambia
        className="h-11"
      />
    </div>
  );
};

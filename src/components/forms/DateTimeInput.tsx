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
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11"
      />
    </div>
  );
};

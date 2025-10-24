import { PasswordInputProps } from "@/types/forms";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

export const PasswordInput = ({
  label,
  value,
  onChange,
  placeholder,
  error,
  className,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const name = label.toLowerCase();

  return (
    <div className={`grid w-full items-center gap-2 relative ${className}`}>
      <Label htmlFor={name}>{label}</Label>
      <div className="relative">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          type={showPassword ? "text" : "password"}
          id={name}
          placeholder={placeholder}
          className="w-full h-11 pr-10"
        />
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-transparent"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

import React from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TextInputProps } from '@/types/forms';

export function TextInput({ label, value, onChange, placeholder, error }: TextInputProps) {
    const name = label.toLowerCase()
    return (
        <div className="grid w-full max-w-sm items-center gap-3">
            <Label htmlFor={name}>{label}</Label>
            <Input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                type={name}
                id={name}
                placeholder={placeholder}
            />
            {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
    );
}
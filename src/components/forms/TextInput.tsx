import React from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TextInputProps } from '@/types/forms'

export function TextInput<T extends string | number = string>({
    label,
    value,
    onChange,
    placeholder,
    error,
    type,
    max,
    min,
    disabled,
    className
}: TextInputProps<T>) {
    const typeCategory = type?.toLowerCase() || "text"

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newValue: string | number = e.target.value
        if (typeCategory === "number") {
            // Si está vacío, dejamos string vacío para no romper el input
            newValue = e.target.value === "" ? "" : Number(e.target.value)
        }
        onChange(newValue as T)
    }

    return (
        <div className={`grid w-full items-center gap-2 ${className}`}>
            <Label htmlFor={label}>{label}</Label>
            <Input
                value={value}
                onChange={handleChange}
                type={typeCategory}
                id={label}
                placeholder={placeholder}
                className='w-full h-11'
                max={max}
                min={min}
                disabled={disabled}
            />
            {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
    );
}
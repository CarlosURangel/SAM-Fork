import React from 'react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { SelectFormProps } from '@/types/forms'

export const SelectForm = ({
  label,
  selectLabel,
  options,
  value,
  onChange,
  placeholder,
  error,
  disabled,
  className,
}: SelectFormProps) => {
  return (
    <div className={`grid w-full items-center gap-2 ${className}`}>
      <Label htmlFor={label}>{label}</Label>
      <Select
        onValueChange={(val) => onChange(val)}
        value={value}
        disabled={disabled}
      >
        <SelectTrigger className="w-full h-11">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {selectLabel && <SelectLabel>{selectLabel}</SelectLabel>}
            {options.map((option, idx) => (
              <SelectItem key={idx} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}

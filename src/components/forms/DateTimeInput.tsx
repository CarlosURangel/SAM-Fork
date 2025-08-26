import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from '@/components/ui/label'

interface DateTimeInputProps{
    className?:string;
}

export const DateTimeInput = ({className}:DateTimeInputProps) => {
    const getLocalDateTime = () => {
        const now = new Date()
        const year = now.getFullYear()
        const month = String(now.getMonth() + 1).padStart(2, "0")
        const day = String(now.getDate()).padStart(2, "0")
        const hours = String(now.getHours()).padStart(2, "0")
        const minutes = String(now.getMinutes()).padStart(2, "0")
        return `${year}-${month}-${day}T${hours}:${minutes}`
    }
    const [dateTime, setDateTime] = useState(getLocalDateTime)

    return (
        <div className={`grid w-full items-center gap-2 ${className}`}>
            <Label htmlFor={"Fecha"}>{"Fecha:"}</Label>
            <Input
                type="datetime-local"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                className="h-11"
            />
        </div>
    )
}

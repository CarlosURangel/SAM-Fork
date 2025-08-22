import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusIcon } from 'lucide-react'
import { TextInput } from './TextInput'
import { SelectForm } from './SelectForm'
import { DateTimeInput } from './DateTimeInput'
import { PasswordInput } from './PasswordInput'
import { Textarea } from "@/components/ui/textarea"

export const AddStudentDialog = () => {
    const [studentName, setStudentName] = useState<string>("")
    const [studentExp, setStudentExp] = useState<string>("")
    const [semester, setSemester] = useState<string>("")
    const [career, setCareer] = useState<string>("")
    const [subject, setSubject] = useState<string>("")
    const [password, setPassword] = useState("")
    const [topic, setTopic] = useState<string>("")

    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button variant="outline" className='h-10'>
                        <PlusIcon />
                        <p>Añadir alumno</p>
                    </Button>
                </DialogTrigger>
                <DialogContent className="w-full grid items-center gap-16 max-w-[40vw] p-10 overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-center font-medium text-2xl">Añadir alumno</DialogTitle>
                    </DialogHeader>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                        <TextInput label="Nombre:" placeholder="Nombre" onChange={setStudentName} value={studentName} className="col-span-2" />
                        <TextInput label="Expediente:" placeholder="Expediente" onChange={setStudentExp} value={studentExp} className='col-span-1'/>
                        <TextInput label="Semestre:" placeholder="Semestre" onChange={setSemester} value={semester} max={2} className='col-span-1'/>
                        <SelectForm label="Carrera:" selectLabel="Carreras" placeholder="Seleccione una opción..." onChange={setCareer} value={career} options={["Carrera1", "Carrera2", "Carrera3"]} className="col-span-2" />
                    </div>

                    <DialogFooter className='h-11 justify-center'>
                        <Button type="submit" className='h-full w-80 bg-[#083C6E]'>Añadir</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}

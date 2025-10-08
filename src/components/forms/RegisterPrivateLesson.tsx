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
import { Label } from "@/components/ui/label"
import { PlusIcon } from 'lucide-react'
import { TextInput } from './TextInput'
import { SelectForm } from './SelectForm'
import { DateTimeInput } from './DateTimeInput'
import { PasswordInput } from './PasswordInput'
import { Textarea } from "@/components/ui/textarea"

export const RegisterPrivateLesson = () => {
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
                    <button className='underline underline-offset-4 text-[#083C6E]'>Registrar</button>
                </DialogTrigger>
                <DialogContent className="w-full grid items-center gap-16 max-w-[60vw] h-[80vh] p-10 overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-center font-medium text-2xl">Registro de asesoría</DialogTitle>
                    </DialogHeader>

                    <div className="grid grid-cols-1 md:grid-cols-6 gap-7">
                        <TextInput label="Nombre:" placeholder="Nombre" onChange={setStudentName} value={studentName} className="col-span-4" />
                        <TextInput label="Expediente:" placeholder="Expediente" onChange={setStudentExp} value={studentExp} className='col-span-2'/>
                        <TextInput label="Semestre:" placeholder="Semestre" onChange={setSemester} value={semester} max={2} className='col-span-2'/>
                        <SelectForm label="Carrera:" selectLabel="Carreras" placeholder="Seleccione una opción..." onChange={setCareer} value={career} options={["Carrera1", "Carrera2", "Carrera3"]} className="col-span-4" />
                        <DateTimeInput className="col-span-4" />
                        <PasswordInput label="Contraseña" placeholder="******" onChange={setPassword} value={password} className='col-span-2'/>
                        <div className='grid grid-cols-1 md:grid-cols-4 gap-4 col-span-6 items-start'>
                            {/* Select con label alineado */}

                            <SelectForm
                                label="Materia:"
                                selectLabel="Materias"
                                placeholder="Seleccione una opción..."
                                onChange={setSubject}
                                value={subject}
                                options={["Materia1", "Materia2", "Materia3"]}
                                className="w-full col-span-2"
                            />


                            {/* Textarea con label alineado */}
                            <div className="grid w-full gap-2 col-span-2">
                                <Label htmlFor="tema" className="block">Tema visto en la sesión:</Label>
                                <Textarea
                                    id="tema"
                                    placeholder="Tema"
                                    className="w-full resize-y"
                                />
                            </div>
                        </div>


                    </div>

                    <DialogFooter className='h-11 justify-center'>
                        <Button type="submit" className='h-full w-80 bg-[#083C6E]'>Añadir</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}

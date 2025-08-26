"use client";
import React from 'react'
import { TextInput } from "@/components/forms/TextInput";
import { PasswordInput } from "@/components/forms/PasswordInput";
import { useState } from "react";
import { AddStudentDialog } from '@/components/forms/AddStudentDialog';
import { RegisterPrivateLesson } from '@/components/forms/RegisterPrivateLesson';

const Dashboard = () => {
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    return (
        <div className='gap-4 grid'>
            <div className="w-40 p-4">
                <TextInput label="Usuario" placeholder="Usuario" onChange={setEmail} value={email}/>
            </div>
            <div className="w-40 p-4">
                <PasswordInput label="Contraseña" placeholder="******" onChange={setPassword} value={password} />
            </div>
            <div>
                <AddStudentDialog/>
            </div>
            
            <div>
                <RegisterPrivateLesson/>
            </div>
        </div>
    )
}

export default Dashboard

"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export default function Home() {
//Pagina provicional para probar el funcionamiento de la API con la base de datos 

  const [users, setUsers] = useState<any[]>([])
  const [form, setForm] = useState({ nombre: "", expediente: "" })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch("http://localhost:3000/api/users")
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault()
  //   setLoading(true)
  //   const res = await fetch("http://localhost:3000/api/users", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(form),
  //   })
  //   if (res.ok) {
  //     const newUser = await res.json()
  //     setUsers(prev => [...prev, newUser])
  //     setForm({ nombre: "", correo: "", expediente: "" })
  //   }
  //   setLoading(false)
  // }
  console.log(process.env.JWT_SECRET);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      const newUser = await res.json()
      setUsers(prev => [...prev, newUser])
      setForm({nombre: "", expediente: "" })
      alert("Usuario logueado")
    }
    setLoading(false)
  }

  return (
    <div className="mt-6 ml-4 flex flex-row gap-8 min-h-[80vh]">
      {/* Cards de usuarios */}
      <div className="flex-1">
        <h1 className="text-2xl text-center font-bold mb-4">Usuarios</h1>
        <div className="flex flex-wrap gap-4">
          {users.map((user: any) => (
            <div
              key={user.id}
              className="border border-gray-300 rounded-lg p-4 min-w-[200px] bg-gray-50 shadow"
            >
              <h2 className="text-lg font-semibold">{user.nombre}</h2>
              <p>
                <b>Correo:</b> {user.correo}
              </p>
              <p>
                <b>Expediente:</b> {user.expediente}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Formulario para crear usuario */}
      <div className="flex-1 flex flex-col justify-center items-center border-l border-gray-200 pl-8">
        <h2 className="text-xl font-bold mb-4">Inicia sesion</h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full max-w-[350px]"
        >
          {/* <input
            name="nombre"
            type="text"
            placeholder="Nombre"
            required
            value={form.nombre}
            onChange={handleChange}
            className="p-2 rounded border border-gray-300"
          /> */}
          <input
            name="nombre"
            type="text"
            placeholder="nombre"
            required
            value={form.nombre}
            onChange={handleChange}
            className="p-2 rounded border border-gray-300"
          />
          <input
            name="expediente"
            type="text"
            placeholder="Expediente"
            required
            value={form.expediente}
            onChange={handleChange}
            className="p-2 rounded border border-gray-300"
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Creando..." : "Inicia Sesión"}
          </Button>
        </form>
      </div>
    </div>
  )
}
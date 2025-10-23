
export const getStudents = async () => {
    try {
          const response = await fetch("/api/students");
          if (!response.ok) throw new Error("Error al cargar alumnos");
          return await response.json()
        } catch (error) {
          console.error(error);
          return []
        }
}
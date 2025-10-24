export const getHistory = async () => {
    try {
        const response = await fetch("/api/advisories/teacher");
        if (!response.ok) throw new Error("Error al cargar el historial");
        return await response.json()
    } catch (error) {
        console.error(error);
        return []
    }
}
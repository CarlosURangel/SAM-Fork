
export const getStatisticsByTeacher = async (cve:string) => {
    try {
        const response = await fetch(`/api/statistics/teacher/${cve}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        });
        return await response.json();     
    } catch (error) {
        console.error('Error al obtener los profesores:', error);
        return {}
    }
}
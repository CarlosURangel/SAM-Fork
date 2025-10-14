
export type teachersApi = {
    TotalAdvisories: number,
    cveMaestro: string,
    fullName: string,
    idMaestro: string,
    rol: string,
}

export type studentsApi = {
    cveMaestro: string,
    fullName: string,
    idMaestro: string,
    rol: string,
    students: {
        idStudent: string,
        rol:string,
        expedient: string,
        fullName: string,
        semester: string,
        cveMaestro?: string,
        career: {name:string},
    }[]
}
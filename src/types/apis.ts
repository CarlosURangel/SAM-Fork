
export type teachersApi = {
    TotalAdvisories: number,
    cveMaestro: string,
    fullName: string,
    idMaestro: string,
    total: number,
    rol: string,
}

export type studentsApi = {
    cveMaestro: string,
    fullName: string,
    idMaestro: string,
    rol: string,
    students: {
        idStudent: string,
        rol: string,
        expedient: string,
        fullName: string,
        semester: string,
        cveMaestro?: string,
        career: { name: string },
    }[]
}

export type historyAdminApi = {
    idAdvisory: string,
    expStudent: string,
    cveMaestro: string,
    idSubject: string,
    advisoryDate: Date,
    topic: string,
    creation_date: Date,
    status: string
}[]

export type advisoriesApi = {
    idAdvisory: string,
    expStudent: string,
    advisoryDate: string,
    topic: string,
    teacher: {
        fullName: string
    },
    student: {
        fullName: string,
        semester: number
    },
    subject: {
        name: string
    }
}

export type subjectsApi = {
    name: string,
    total: number,
}
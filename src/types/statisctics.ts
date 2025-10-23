
export type Statistics = {
    name: string,
    totalAdvisories: number
    advisories: Advisory[]
}

export type Advisory = {
    idSubjetc: string,
    name: string,
    total: number
}
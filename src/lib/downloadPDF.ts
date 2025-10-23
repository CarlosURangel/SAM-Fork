export const downloadPDF = async (idAdvisory: string, exp: string) => {
    try {
        const response = await fetch(`/api/pdf/${idAdvisory}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        });
        if (!response.ok) throw new Error("Error al cargar el pdf");
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${exp}_asesoria`;
        document.body.appendChild(a);
        a.click();
        a.remove();

    } catch (error) {
        console.error(error);
    }
};

export type FullAdvisoryData = {
  idAdvisory: string;
  advisoryDate: string | null;
  topic: string | null;
  status: string;
  student: FullStudentData; 
  subject: {
    idSubject: string;
    name: string;
  };
};

export type FullStudentData = {
  idStudent: string;
  expedient: string;
  fullName: string;
  semester: number;
  idCareer: string;
  career: { name: string };
};
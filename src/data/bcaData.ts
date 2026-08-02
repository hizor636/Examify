export interface NoteItem {
  id: string;
  unit: string;
  title: string;
  subject: string;
  pages: number;
  readTime: string;
  content: string;
  summary: string;
  verified: boolean;
}

export interface PYQItem {
  id: string;
  year: number;
  subject: string;
  examType: 'University End-Sem' | 'Mid-Sem Model Paper' | 'Department Exam';
  downloadUrl: string;
  solvedKeyAvailable: boolean;
  questionsCount: number;
}

export interface LabProgramItem {
  id: string;
  programNo: number;
  title: string;
  subject: string;
  language: string;
  code: string;
  flowchart: string;
  output: string;
  vivaQuestions: { q: string; a: string }[];
}

export interface AssignmentItem {
  id: string;
  title: string;
  subject: string;
  deadline: string;
  maxMarks: number;
  description: string;
  aiPromptSuggest: string;
}

export interface ImportantQuestionItem {
  id: string;
  question: string;
  subject: string;
  marks: number;
  frequency: string;
  answerSummary: string;
}

export interface RapidFireQuizItem {
  id: string;
  question: string;
  subject: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface SubjectDetails {
  code: string;
  name: string;
  description: string;
  icon: string;
  units: string[];
  notes: NoteItem[];
  pyqs: PYQItem[];
  labs: LabProgramItem[];
  assignments: AssignmentItem[];
  importantQuestions: ImportantQuestionItem[];
  quizzes: RapidFireQuizItem[];
}

export interface SemesterData {
  semester: number;
  title: string;
  subtitle: string;
  subjects: SubjectDetails[];
  notes: NoteItem[];
  pyqs: PYQItem[];
  labs: LabProgramItem[];
  assignments: AssignmentItem[];
  importantQuestions: ImportantQuestionItem[];
  quizzes: RapidFireQuizItem[];
}

// Clean placeholder structure for all 6 BCA semesters (Work in Progress)
export const BCA_SEMESTER_DATA: Record<number, SemesterData> = {
  1: {
    semester: 1,
    title: 'Semester 1 — Foundation & Fundamentals',
    subtitle: 'Core programming, logic building, digital essentials, and mathematics.',
    subjects: [],
    notes: [],
    pyqs: [],
    labs: [],
    assignments: [],
    importantQuestions: [],
    quizzes: [],
  },
  2: {
    semester: 2,
    title: 'Semester 2 — Core Programming & Data Structures',
    subtitle: 'Data structures, object-oriented concepts, operating systems, and accounting.',
    subjects: [],
    notes: [],
    pyqs: [],
    labs: [],
    assignments: [],
    importantQuestions: [],
    quizzes: [],
  },
  3: {
    semester: 3,
    title: 'Semester 3 — Systems & Databases',
    subtitle: 'Database management systems, relational databases, Java programming, and networking.',
    subjects: [],
    notes: [],
    pyqs: [],
    labs: [],
    assignments: [],
    importantQuestions: [],
    quizzes: [],
  },
  4: {
    semester: 4,
    title: 'Semester 4 — Web & Security Systems',
    subtitle: 'Full-stack web development, Python programming, cryptography, and cloud platforms.',
    subjects: [],
    notes: [],
    pyqs: [],
    labs: [],
    assignments: [],
    importantQuestions: [],
    quizzes: [],
  },
  5: {
    semester: 5,
    title: 'Semester 5 — Advanced Engineering & AI',
    subtitle: 'Mobile application development, artificial intelligence algorithms, and data science.',
    subjects: [],
    notes: [],
    pyqs: [],
    labs: [],
    assignments: [],
    importantQuestions: [],
    quizzes: [],
  },
  6: {
    semester: 6,
    title: 'Semester 6 — Specialization & Capstone Project',
    subtitle: 'Machine learning, DevOps automation, information security, and capstone project.',
    subjects: [],
    notes: [],
    pyqs: [],
    labs: [],
    assignments: [],
    importantQuestions: [],
    quizzes: [],
  },
};

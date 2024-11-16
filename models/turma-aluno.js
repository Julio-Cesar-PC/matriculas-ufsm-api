class TurmaAluno {
    ano_turma: number;
    semestre_turma: '1' | '2';
    codigo_disciplina: string;
    Matricula_Aluno: number;
    Matricula_Professor: number;
    situacao_aluno: 'Matricula' | 'Aprovado com nota' | 'Reprovado por Frequência' | 'Reprovado com Nota';
}
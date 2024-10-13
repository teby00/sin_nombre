export interface PreguntaFrecuente {
  id: number;
  pregunta: string;
  respuesta: string;
}

export interface PreguntaEdit extends Omit<PreguntaFrecuente, 'id'> {}

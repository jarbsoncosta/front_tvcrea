import { format } from 'date-fns';

// Função para formatar uma data
export function formatarData(data) {
  const dataFormatada = new Date(data);
  const formato = 'dd/MM/yyyy HH:mm:ss';
  return format(dataFormatada, formato);
}


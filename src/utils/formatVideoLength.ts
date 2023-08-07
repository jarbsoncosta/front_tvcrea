
export function formatarTempoDeExecucao(tempoTotalEmSegundos:number) {
    const horas = Math.floor(tempoTotalEmSegundos / 3600);
    const minutos = Math.floor((tempoTotalEmSegundos % 3600) / 60);
    const segundos = Math.floor(tempoTotalEmSegundos % 60);
  
    const horasFormatadas = horas.toString().padStart(2, '0');
    const minutosFormatados = minutos.toString().padStart(2, '0');
    const segundosFormatados = segundos.toString().padStart(2, '0');
  
    return `${horasFormatadas}:${minutosFormatados}:${segundosFormatados}`;
  }  
  // Exemplo de uso:
  const tempoTotalEmSegundos = 3661; // Exemplo para 1 hora, 1 minuto e 1 segundo
  const tempoFormatado = formatarTempoDeExecucao(tempoTotalEmSegundos);
  console.log(tempoFormatado); // Saída: "01:01:01"


  export function formatarTempoDeExecucao(tempoTotalEmSegundos:any) {
    // Verifica se tempoTotalEmSegundos é indefinido ou nulo
    if (tempoTotalEmSegundos === undefined || tempoTotalEmSegundos === "None") {
        // Retorna uma mensagem de erro ou um valor padrão, como '00:00:00'
        return '00:00:00';
    }

    const horas = Math.floor(tempoTotalEmSegundos / 3600);
    const minutos = Math.floor((tempoTotalEmSegundos % 3600) / 60);
    const segundos = Math.floor(tempoTotalEmSegundos % 60);
  
    const horasFormatadas = horas.toString().padStart(2, '0');
    const minutosFormatados = minutos.toString().padStart(2, '0');
    const segundosFormatados = segundos.toString().padStart(2, '0');
  
    return `${horasFormatadas}:${minutosFormatados}:${segundosFormatados}`;
}

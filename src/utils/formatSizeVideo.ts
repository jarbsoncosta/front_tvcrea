
  
  /* 
  export function formatarTamanhoDoVideo(tamanhoEmBytes:number) {
    const unidades = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    let tamanho = tamanhoEmBytes;
    let indiceUnidade = 0;
  
    while (tamanho >= 1024 && indiceUnidade < unidades.length - 1) {
      tamanho /= 1024;
      indiceUnidade++;
    }
  
    const tamanhoFormatado = tamanho.toFixed(2);
    const unidadeFormatada = unidades[indiceUnidade];
  
    return `${tamanhoFormatado} ${unidadeFormatada}`;
  }
  */

  export function formatarTamanhoDoVideo(tamanhoEmBytes) {
    // Verifica se tamanhoEmBytes é indefinido ou nulo
    if (tamanhoEmBytes === undefined || tamanhoEmBytes === null) {
        // Retorna uma mensagem de erro ou um valor padrão, como '0 Bytes'
        return '0 Bytes';
    }

    const unidades = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    let tamanho = tamanhoEmBytes;
    let indiceUnidade = 0;
  
    while (tamanho >= 1024 && indiceUnidade < unidades.length - 1) {
        tamanho /= 1024;
        indiceUnidade++;
    }
  
    const tamanhoFormatado = tamanho.toFixed(2);
    const unidadeFormatada = unidades[indiceUnidade];
  
    return `${tamanhoFormatado} ${unidadeFormatada}`;
}

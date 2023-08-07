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
  
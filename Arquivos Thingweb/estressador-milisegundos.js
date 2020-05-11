//node examples/scripts/estressador-milisegundos.js como executar o programa a partir da pasta thingewb.nod-wot

var childProcess = require('child_process');

CLI_PATH = 'packages/cli/dist/cli.js';
//MY_PATH = 'examples/scripts/counter-client-milisegundos.js'; //para dispositivos fisicos
MY_PATH = 'examples/scripts/counter-client-milisegundos-virtual.js'; //para dispositivos virtuais
CLI_FLAG = '--clientOnly';

let contador = 0; // Variável auxiliar para contagem de execuções
let milisegundos = 10; // Variável para definir o intervalo de tempo entre execuções em milisegundos
let qtd = 100; // variável para definir a quantidade de execuções a ser realizadas

var d = Date.now() + milisegundos; // Soma ao valor de milisegundos atual com o intervalo definido

console.time('tempo total de execucao'); // Começa a contar o tempo de execução total (pode não corresponder ao tempo real de execução)
console.info('intervalo;' + milisegundos); // Imprime o intervalo executado
console.info('quantidade;'+ qtd); // Imprime a quantidade a ser executada

while(contador < qtd){

    if((Date.now() - d) >= 0){ // Subtrai o valor calculado com o valor de milisegundos atual para verificar se o intervalo definido foi atingido ou passou

        childProcess.fork(CLI_PATH, [CLI_FLAG,MY_PATH]);
        contador++;
        
        d = Date.now() + milisegundos;
    }

}

console.timeEnd('tempo total de execucao'); // Encerra a contagem do tempo total de execução e o imprime
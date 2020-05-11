//node examples/scripts/estressador-milisegundos-aleatorio.js como executar o programa a partir da pasta thingewb.nod-wot

var childProcess = require('child_process');

CLI_PATH = 'packages/cli/dist/cli.js';
MY_PATH = 'examples/scripts/counter-client-milisegundos.js';
CLI_FLAG = '--clientOnly';

let min = Math.ceil(10); // Define o valor minimo de intervalo
let max = Math.floor(500); // Define o valor máximo de intervalo

let contador = 0; // Variável auxiliar para contagem de execuções
let milisegundos = 0; // Variável para definir o intervalo de tempo entre execuções em milisegundos
let qtd = 10000; // variável para definir a quantidade de execuções a ser realizadas

milisegundos = Math.floor(Math.random() * (max - min + 1)) + min; // Gera um valor aleatório entre o minino e máximo definido

var d = Date.now() + milisegundos; // Soma o valor do intervalo com o valor atual em milissegundos

console.time('tempo total de execucao'); // Conta o tempo total de execução do programa (pode não corresponder ao tempo real)
console.info('intervalo; entre 10 e 500ms');
console.info('quantidade;'+ qtd);

while(contador < qtd){

    if((Date.now() - d) >= 0){ // Subtrai o valor calculado com o valor atual para saber se o intervalo foi atingido ou se já passou

        childProcess.fork(CLI_PATH, [CLI_FLAG,MY_PATH]);
        contador++;
        
        milisegundos = Math.floor(Math.random() * (max - min + 1)) + min;// Gera um novo valor aleatório dentro dos limites estabelecidos
        d = Date.now() + milisegundos;
    }

}

console.timeEnd('tempo total de execucao');// Encerra a contagem do tempo total e a imprime
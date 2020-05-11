var childProcess = require('child_process');

CLI_PATH = 'packages/cli/dist/cli.js';
MY_PATH = 'examples/scripts/counter-client-segundos.js';
CLI_FLAG = '--clientOnly';

let contador = 0; // Variável auxiliar para contagem de execuções
let segundos = 1; // Variável para definir o intervalo de tempo entre execuções em segundos
let qtd = 20; // variável para definir a quantidade de execuções a ser realizadas

//node examples/scripts/estressador-segundos.js como executar o programa a partir da pasta thingewb.nod-wot

console.time('tempo total de execucao'); // Inicia a contagem do tempo total de execução (pode não refletir o tempo real)
console.info(segundos); // Imprime o valor em segundos do intervalo entre as execuções

var teste = function (){

    childProcess.fork(CLI_PATH, [CLI_FLAG,MY_PATH]);
    contador++;
    if(contador == qtd){

        clearInterval(intervalo);//interrreompe a repetição da função
        console.timeEnd('tempo total de execucao');// Encerra a contagem do tempo total de execução e o imprime
        console.info(qtd);// Imprime a quantidade de execuções realizadas
    
    }

}

var intervalo = setInterval(teste,(segundos*1000));// Define a execução da função de teste em loop dentro do intervalo programadado
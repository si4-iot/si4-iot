package br.inf.ufes.si4_iot;

import java.io.IOException;
import java.sql.SQLException;

public class Main {
	
	public static void main(String[] args) throws SQLException, IOException {
		
		VirtualThingDBGenerator vtdb = new VirtualThingDBGenerator();
		//gera o virtual thing com uma determinada diversidade de interacoes.
		Timer timer = new Timer();
		vtdb.StorageVT(vtdb.GenerateVT(5),5);
		System.out.println("Tempo para gerar Sensores Virtuais no Banco: ");
		System.out.println( timer );
		System.out.println("\n");
		Timer timer2 = new Timer();
		VirtualThingFileGenerator vtf = new VirtualThingFileGenerator();
		//recebe o diretório onde serão armazenados os arquivos gerados.
		vtf.execute("");
		System.out.println("Tempo para gerar Sensores Virtuais em arquivo: ");
		System.out.println( timer2 );
		System.out.println("\n");
	}
}

package br.inf.ufes.si4_iot;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class VirtualThingDBGenerator {
	
	//armazena no banco de dados uma lista de dispositivos com uma quantidade máxima de interacoes
	public void StorageVT(List<VirtualThing> vts, int qt_interactions) throws SQLException {
		int i,x;
		//DefaultMutableTreeNode nodeProperty;
		for (VirtualThing vt: vts) {
			VirtualThingDAO vtDAO = new VirtualThingDAO();
			
			//adiciona o device ao banco
			vtDAO.adiciona(vt);
			

			
			x = getRandomNumberInRange(1,qt_interactions);
			for(i=0;i<x;i++) {
				
				//adicionando as interacoes ao device
				VirtualThingInteraction vti = new VirtualThingInteraction();
				
				//Obtendo o ultimo id do virtual thing e atribuindo ao objeto vti
				vti.setId_virtualthing(vtDAO.getLastVirtualThing());
				
				PropertyDAO pDAO = new PropertyDAO();

				//associa uma interacao a um dispositivo, por meio de um sorteio entre as interacoes disponíveis  
				vti.setId_interaction(getRandomNumberInRange(pDAO.getFirstId(), pDAO.getLastId()));
				VirtualThingInteractionDAO vtiDAO = new VirtualThingInteractionDAO();
				
				//armazena a associacao no banco de dados
				vtiDAO.adiciona(vti);
					
				
			}
		}
	}
	//retorna uma lista de sensores virtuais conforme a quantidade definida como parâmetro.
	public List<VirtualThing> GenerateVT(int qt_devices) {
		List<VirtualThing> lista_virtualthing = new ArrayList<VirtualThing>();
		int i;
		for (i=0;i<qt_devices;i++) {
			VirtualThing vt = new VirtualThing();
			vt.setNome("device_"+getRandomNumberInRange(1,1000)+"a"+getRandomNumberInRange(1000,10000));
			vt.setDescricao("Description test");
			lista_virtualthing.add(vt);
		}
		return lista_virtualthing;
	}
	private static int getRandomNumberInRange(int min, int max) {

		if (min >= max) {
			throw new IllegalArgumentException("max must be greater than min");
		}

		Random r = new Random();
		return r.nextInt((max - min) + 1) + min;
	}
}

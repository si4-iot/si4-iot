package br.inf.ufes.si4_iot;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class VirtualThingFileGenerator {
	private VirtualThingDAO vtDAO;
	private OntologyDAO ontDAO;
	private List<VirtualThing> lista_vt = new ArrayList<VirtualThing>();
	private List<Property> lista_vti= new ArrayList<Property>();
	private List<Ontology> list_ontology= new ArrayList<Ontology>();

	public void execute(String local) throws SQLException, IOException{
		
		vtDAO = new VirtualThingDAO();
		ontDAO = new OntologyDAO();
		lista_vt = vtDAO.getLista();
		String strAction;
		String strproperties;
		String strContext;
		int i,z;
		ArrayList<String> listStrActions = new ArrayList<String>();
		ArrayList<String> listStrProperties = new ArrayList<String>();
		ArrayList<String> listStrContext = new ArrayList<String>();
		ArrayList<String> listStrUnitMeasurement = new ArrayList<String>();
		for(VirtualThing vt: lista_vt) {
			
			z=0;
			
			VirtualThingInteractionDAO vtiDAO = new VirtualThingInteractionDAO();
			
			//obtendo a lista de interações(propriedades, ações e eventos) associadas ao dispositivo
			lista_vti = vtiDAO.listInteractions(vt.getId());

			//retorna a lista de contextos e unidade de medida
			listStrContext = (ArrayList<String>) vtiDAO.listContext(vt.getId());
			listStrUnitMeasurement = (ArrayList<String>) vtiDAO.listUnitMeasurement(vt.getId());
			
			//obtendo a lista de ontologias associadas aos conceitos existentes nas interações de um determinado virtual thing
			list_ontology = ontDAO.getList(vt.getId());
			//System.out.println(list_ontology.size());
			strContext = "";
			for(Ontology ont: list_ontology) {
				strContext = strContext + "\""+ont.getShortname()+"\": " + "\"" + ont.getUrl() + "\", ";
			}
			
			//System.out.println(listStrContext.toString());
			
			//criando um arquivo js para cada dispositivo gerado
			BufferedWriter buffWrite = new BufferedWriter(new FileWriter(local+vt.getNome()+".js"));
			
	        String strHead = 		"let thing = WoT.produce({ \n"
    				
		        				+	"\ttitle: \"" + vt.getNome()+"\",\n"
		        				+ 	"\tdescription: \""+vt.getDescricao()+"\",\n"
		        				+ "\t\"@context\": [\"https://www.w3.org/2019/wot/td/v1\", {"+strContext+"}],\n"
		        				+"});\n"
	        					+ "console.log(\"Produced \" + thing.title);\n";
	        

	        //para cada interação(propriedade, ação e evento), uma lista (string) de propriedades e ações  é composta e depois armazenada no arquivo js
	        
			for(Property vti: lista_vti) {
				
				strproperties="";
				
				
				strproperties = "\nthing.addProperty( "
						+"\n\t\""+vti.getNome()+"\",\n\t{\n"
        				+"\t\ttype: \""  +listStrContext.get(z)+  "\",\n"
        				+"\t\tdescription: \""+vti.getContext()+"\",\n"
        				+"\t\t\"unit of measurement\": \"" + listStrUnitMeasurement.get(z) + "\",\n"
        				+"\t\tobservable: false,\n"
        				+"\t\treadOnly: true,\n"
        				+"\t},\n"
        				+"\tMath.random()*100\n"
        				+");\n";
				
				strAction = "";
				strAction= "\nthing.addAction("
					+ "\n\t\"change_"+vti.getNome()+"\","
					+ "\n\t{},"
					+"\n\t() => {"
					+"\n\t\tconsole.log(\"Changing "+vti.getNome()+"\");"
					+"\n\t\treturn thing.properties[\""+vti.getNome()+"\"].write(Math.random() * (("+vti.getMaxValue()+ ")-("+ vti.getMinValue()+"))" +"+("+vti.getMinValue()+"));"
					+"\n\t}"
					+"\n);\n";
				listStrActions.add(strAction);
				listStrProperties.add(strproperties);
				//buffWrite.append(linha + "\n");
				
				z++;
				
			}
			listStrActions.add("\n\nthing.expose().then( () => { console.info(thing.title + \" ready\"); } ); ");
			
			//insere o cabeçalho no arquivo
			buffWrite.append(strHead + "\n");
			
			//insere as propriedades no arquivo
			for(i=0;i<listStrProperties.size();i++)
				buffWrite.append(listStrProperties.get(i));
			
			//escrevendo as ações no final do arquivo js
			for(i=0;i<listStrActions.size();i++)
				buffWrite.append(listStrActions.get(i));

			listStrActions.clear();
			listStrProperties.clear();
			
			//fechando o arquivo
			buffWrite.close();
		}
		
	}

}

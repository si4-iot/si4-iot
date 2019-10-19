package br.inf.ufes.si4_iot;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class VirtualThingFileGenerator {
	private VirtualThingDAO vtDAO;
	private List<VirtualThing> lista_vt = new ArrayList<VirtualThing>();
	private List<Property> lista_vti= new ArrayList<Property>();

	public void execute(String local) throws SQLException, IOException{
		
		vtDAO = new VirtualThingDAO();
		lista_vt = vtDAO.getLista();
		String ac;
		int i;
		ArrayList<String> actions = new ArrayList<String>();

		for(VirtualThing vt: lista_vt) {
			
			VirtualThingInteractionDAO vtiDAO = new VirtualThingInteractionDAO();
			
			//obtendo a lista de interações(propriedades, ações e eventos) associadas ao dispositivo
			lista_vti = vtiDAO.listInteractions(vt.getId());
			
			//criando um arquivo js para cada dispositivo gerado
			BufferedWriter buffWrite = new BufferedWriter(new FileWriter(local+vt.getNome()+".js"));
			
	        String linha = 		"let thing = WoT.produce({ \n"
    				
		        				+	"\ttitle: \"" + vt.getNome()+"\",\n"
		        				+ 	"\tdescription: \""+vt.getDescricao()+"\",\n"
		        				+ "\t\"@context\": [\"https://www.w3.org/2019/wot/td/v1\", {\"iot\": \"http://example.org/iot\"}],\n"
		        				+"});\n"
	        					+ "console.log(\"Produced \" + thing.title);\n";
	        buffWrite.append(linha + "\n");

	        //para cada interação(propriedade, ação e evento), uma string é composta e depois armazenada no arquivo js
	        
			for(Property vti: lista_vti) {
				
				linha="";
				
				
				linha = "\nthing.addProperty( "
						+"\n\t\""+vti.getNome()+"\",\n\t{\n"
        				+"\t\ttype: \"float\",\n"
        				+"\t\tdescription: \""+vti.getContext()+"\",\n"
        				+"\t\t\"unit of measurement\": \"\",\n"
        				+"\t\tobservable: false,\n"
        				+"\t\treadOnly: true,\n"
        				+"\t},\n"
        				+"\tMath.random()*100\n"
        				+");\n";
				
				ac = "";
				ac= "\nthing.addAction("
					+ "\n\t\"change_"+vti.getNome()+"\","
					+ "\n\t{},"
					+"\n\t() => {"
					+"\n\t\tconsole.log(\"Changing "+vti.getNome()+"\");"
					+"\n\t\treturn thing.properties[\""+vti.getNome()+"\"].write(Math.random() * (("+vti.getMaxValue()+ ")-("+ vti.getMinValue()+"))" +"+("+vti.getMinValue()+"));"
					+"\n\t}"
					+"\n);\n";
				actions.add(ac);
				buffWrite.append(linha + "\n");
				
				
			}
			actions.add("\n\nthing.expose().then( () => { console.info(thing.title + \" ready\"); } ); ");
			
			//escrevendo as ações no final do arquivo js
			for(i=0;i<actions.size();i++)
				buffWrite.append(actions.get(i));

			actions.clear();
			
			//fechando o arquivo
			buffWrite.close();
		}
		
	}

}

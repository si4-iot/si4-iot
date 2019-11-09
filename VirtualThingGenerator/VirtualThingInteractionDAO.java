package br.inf.ufes.si4_iot;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class VirtualThingInteractionDAO {
	private Connection connection;

	public VirtualThingInteractionDAO() {
	}

	public void adiciona(VirtualThingInteraction vti) throws SQLException {
		int total_registros=0;
		this.connection = new ConnectionFactory().getConnection();
		String sql1 = "SELECT COUNT(*) as total FROM si4iot.vt_interacao WHERE id_vt = ? and id_interacao = ?";
		try {
			PreparedStatement stmt = connection.prepareStatement(sql1);
			stmt.setInt(1, (vti.getId_virtualthing()));
			stmt.setInt(2, (vti.getId_interaction()));
			ResultSet rs = stmt.executeQuery();
			while(rs.next())
				total_registros = rs.getInt(1);
			
				
		} catch (Exception e) {
			// TODO: handle exception
			throw new RuntimeException(e);
		}finally {
			connection.close();
		}
		//Verifica se já houve um registro entre um virtual thing e uma forma de interação
		if(total_registros==0){
			this.connection = new ConnectionFactory().getConnection();
			String sql="INSERT INTO si4iot.vt_interacao (id_vt,id_interacao) values (?,?)";
			try {
				PreparedStatement stmt = connection.prepareStatement(sql);
				stmt.setString(1, String.valueOf(vti.getId_virtualthing()));
				stmt.setString(2, String.valueOf(vti.getId_interaction()));
				stmt.execute();
				stmt.close();
			} catch (Exception e) {
				// TODO: handle exception
				throw new RuntimeException(e);
			}finally {
				connection.close();
			}
		}
	}
	public List<String> listContext(int id_thing) throws SQLException{
		this.connection = new ConnectionFactory().getConnection();
		List<String> listSrtContext= new ArrayList<String>();
		String sql = "SELECT c.concept as contexto FROM si4iot.INTERACAO i, si4iot.concept c, si4iot.vt_interacao"
				+" where i.idconcept_context = c.idconcept"
				+" and vt_interacao.id_interacao = i.idinteracao"
				+" and vt_interacao.id_vt = ?";
		try {
			PreparedStatement stmt = connection.prepareStatement(sql);
			stmt.setString(1, String.valueOf(id_thing));
			ResultSet rs = stmt.executeQuery();
			while(rs.next()) {
				listSrtContext.add(rs.getString(1));
			}
			stmt.close();
			return listSrtContext;
		} catch (Exception e) {
			// TODO: handle exception
			throw new RuntimeException(e);
		}finally {
			connection.close();
		}
		
	}
	
	public List<String> listUnitMeasurement(int id_thing) throws SQLException{
		this.connection = new ConnectionFactory().getConnection();
		List<String> listSrtContext= new ArrayList<String>();
		String sql = "SELECT c.concept as unit_measurement FROM si4iot.INTERACAO i, si4iot.concept c, si4iot.vt_interacao"
				+" where i.idconcept_unit_measurement = c.idconcept"
				+" and vt_interacao.id_interacao = i.idinteracao"
				+" and vt_interacao.id_vt = ?";
		try {
			PreparedStatement stmt = connection.prepareStatement(sql);
			stmt.setString(1, String.valueOf(id_thing));
			ResultSet rs = stmt.executeQuery();
			while(rs.next()) {
				listSrtContext.add(rs.getString(1));
			}
			stmt.close();
			return listSrtContext;
		} catch (Exception e) {
			// TODO: handle exception
			throw new RuntimeException(e);
		}finally {
			connection.close();
		}
		
	}
	
	public List<Property> listInteractions(int id_thing) throws SQLException {
		this.connection = new ConnectionFactory().getConnection();
		List<Property> list_property = new ArrayList<Property>();
		
		String sql =    "SELECT 	vt_interacao.idvt_interacao,"
				+ " virtual_thing.idvirtual_thing,"
				+ " interacao.nome_interacao,"
				+ " interacao.min_valor,"
				+ " interacao.max_valor,"
				+ " interacao.context"
				+ " FROM si4iot.vt_interacao, si4iot.interacao, si4iot.virtual_thing"
				+ " where 	si4iot.vt_interacao.id_interacao = si4iot.interacao.idinteracao"
				+ " and si4iot.virtual_thing.idvirtual_thing = si4iot.vt_interacao.id_vt"
				+ " and si4iot.virtual_thing.idvirtual_thing = ?";
		try {
			PreparedStatement stmt = connection.prepareStatement(sql);
			stmt.setString(1, String.valueOf(id_thing));
			ResultSet rs = stmt.executeQuery();
			while(rs.next()) {
				Property p = new Property();
				p.setNome(rs.getString(3));
				p.setMinValue(Float.valueOf(rs.getString(4)));
				p.setMaxValue(Float.valueOf(rs.getString(5)));
				p.setContext(rs.getString(6));
				list_property.add(p);
			}
			stmt.close();
			return list_property;
		} catch (Exception e) {
			// TODO: handle exception
			throw new RuntimeException(e);
		}finally {
			connection.close();
		}
	}
}

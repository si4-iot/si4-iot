package br.inf.ufes.si4_iot;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class OntologyDAO {
	private Connection connection;

	public OntologyDAO() {
		this.connection = new ConnectionFactory().getConnection();
	}
	public void adiciona(Ontology ont) {
		String sql="INSERT INTO si4iot.ontology (url,shortname) values (?,?)";
		try {
			PreparedStatement stmt = connection.prepareStatement(sql);
			stmt.setString(1, ont.getUrl());
			stmt.setString(2, ont.getShortname());
			stmt.execute();
			stmt.close();
		} catch (Exception e) {
			// TODO: handle exception
			throw new RuntimeException(e);
		}
	}
	
	public List<Ontology> getList(int id_thing) throws SQLException {
		this.connection = new ConnectionFactory().getConnection();
		List<Ontology> lista_ontology = new ArrayList<Ontology>();
		String sql = "SELECT * FROM si4iot.ontology"
					+ " where idontology in ("
					+ " select c.idontology from si4iot.concept c, si4iot.interacao i, si4iot.vt_interacao vt_i"
					+ " where i.idconcept_unit_measurement = c.idconcept"
					+ " and vt_i.id_interacao = i.idinteracao"
					+ " and vt_i.id_vt = ?)"
					+ " union"
					+ " SELECT * FROM si4iot.ontology"
					+ " where idontology in ("
					+ " select c.idontology from si4iot.concept c, si4iot.interacao i, si4iot.vt_interacao vt_i"
					+ " where i.idconcept_context = c.idconcept"
					+ " and vt_i.id_interacao = i.idinteracao"
					+ " and vt_i.id_vt = ?)";
		try {
			PreparedStatement stmt = connection.prepareStatement(sql);
			stmt.setString(1, String.valueOf(id_thing));
			stmt.setString(2, String.valueOf(id_thing));
			ResultSet rs = stmt.executeQuery();
			while(rs.next()) {
				Ontology ont = new Ontology();
				ont.setShortname(rs.getString("shortname"));
				ont.setUrl(rs.getString("url"));
				lista_ontology.add(ont);
			}
			stmt.close();
			return lista_ontology;
			
		} catch (Exception e) {
			return null;
			// TODO: handle exception
		}finally {
			connection.close();
		}
	}
	
	
}

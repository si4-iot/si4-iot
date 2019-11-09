package br.inf.ufes.si4_iot;

import java.sql.Connection;
import java.sql.PreparedStatement;

public class ConceptDAO {
	private Connection connection;

	public ConceptDAO() {
		this.connection = new ConnectionFactory().getConnection();
	}
	public void adiciona(Concept concept) {
		String sql="INSERT INTO si4iot.concept (idontology,concept) values (?,?)";
		try {
			PreparedStatement stmt = connection.prepareStatement(sql);
			stmt.setInt(1, concept.getIdontology());
			stmt.setString(2, concept.getConcept());
			stmt.execute();
			stmt.close();
		} catch (Exception e) {
			// TODO: handle exception
			throw new RuntimeException(e);
		}
	}
}

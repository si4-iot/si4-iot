package br.inf.ufes.si4_iot;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class PropertyDAO {
	private Connection connection;

	public PropertyDAO() {
		
	}
	public void adiciona(Property p) throws SQLException {
		this.connection = new ConnectionFactory().getConnection();
		String sql="INSERT INTO si4iot.interacao (nome_interacao,min_valor, max_valor, context) values (?,?,?,?)";
		try {
			PreparedStatement stmt = connection.prepareStatement(sql);
			stmt.setString(1, p.getNome());
			stmt.setString(2, String.valueOf(p.getMinValue()));
			stmt.setString(3, String.valueOf(p.getMaxValue()));
			stmt.setString(4, p.getContext());
			stmt.execute();
			stmt.close();
		} catch (Exception e) {
			// TODO: handle exception
			throw new RuntimeException(e);
		}finally {
			connection.close();
		}
	}
	public int getLastId() throws SQLException {
		int x=-1;
		this.connection = new ConnectionFactory().getConnection();
		String sql = "select MAX(idinteracao) as id from si4iot.interacao";
		try {
			PreparedStatement stmt = connection.prepareStatement(sql);
			ResultSet rs = stmt.executeQuery();
			while(rs.next()) {
				x = rs.getInt("id");				
			}
			stmt.close();
			return x;
			
		} catch (Exception e) {
			return -1;
			// TODO: handle exception
		}finally {
			connection.close();
		}
	}
	public int getFirstId() throws SQLException {
		int x=-1;
		this.connection = new ConnectionFactory().getConnection();
		String sql = "select MIN(idinteracao) as id from si4iot.interacao";
		try {
			PreparedStatement stmt = connection.prepareStatement(sql);
			ResultSet rs = stmt.executeQuery();
			while(rs.next()) {
				x = rs.getInt("id");				
			}
			stmt.close();
			return x;
			
		} catch (Exception e) {
			return -1;
			// TODO: handle exception
		}finally {
			connection.close();
		}
	}
}

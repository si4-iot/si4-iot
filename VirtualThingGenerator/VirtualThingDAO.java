package br.inf.ufes.si4_iot;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class VirtualThingDAO {
	private Connection connection;

	public VirtualThingDAO() {
		this.connection = new ConnectionFactory().getConnection();
	}
	public void adiciona(VirtualThing vt) {
		String sql="INSERT INTO si4iot.virtual_thing (nome,descricao) values (?,?)";
		try {
			PreparedStatement stmt = connection.prepareStatement(sql);
			stmt.setString(1, vt.getNome());
			stmt.setString(2, vt.getDescricao());
			stmt.execute();
			stmt.close();
		} catch (Exception e) {
			// TODO: handle exception
			throw new RuntimeException(e);
		}
	}
	public int getLastVirtualThing() throws SQLException {
		int x=-1;
		this.connection = new ConnectionFactory().getConnection();
		String sql = "select MAX(idvirtual_thing) as id from si4iot.virtual_thing";
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
	public List<VirtualThing> getLista() throws SQLException {
		this.connection = new ConnectionFactory().getConnection();
		List<VirtualThing> lista_vt = new ArrayList<VirtualThing>();
		String sql = "select * from si4iot.virtual_thing";
		try {
			PreparedStatement stmt = connection.prepareStatement(sql);
			ResultSet rs = stmt.executeQuery();
			while(rs.next()) {
				VirtualThing vt = new VirtualThing();
				vt.setId(Integer.valueOf(rs.getString("idvirtual_thing")));
				vt.setNome(rs.getString("nome"));
				vt.setDescricao(rs.getString("descricao"));
				lista_vt.add(vt);
			}
			stmt.close();
			return lista_vt;
			
		} catch (Exception e) {
			return null;
			// TODO: handle exception
		}finally {
			connection.close();
		}
	}
}

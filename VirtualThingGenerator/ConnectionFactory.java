package br.inf.ufes.si4_iot;

import java.sql.Connection;
import java.sql.DriverManager;

public class ConnectionFactory {
	private String servidor="jdbc:mysql://localhost:3306/si4iot";
	private String usuario ="";
	private String senha = "";
	private String driver = "com.mysql.cj.jdbc.Driver";
	
	public Connection getConnection() {
		try {
			Class.forName(driver);
			return DriverManager.getConnection(servidor, usuario, senha);
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println("Erro: "+e.getMessage());
		}
		return null;
	}

}

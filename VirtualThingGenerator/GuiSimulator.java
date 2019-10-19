package br.inf.ufes.si4_iot;

import java.awt.EventQueue;

import javax.swing.JFrame;
import javax.swing.JButton;
import javax.swing.JTextField;
import javax.swing.JLabel;
import java.awt.event.ActionListener;
import java.io.IOException;
import java.sql.SQLException;
import java.awt.event.ActionEvent;
import javax.swing.JSpinner;
//import javax.swing.JTree;
//import javax.swing.tree.DefaultMutableTreeNode;
//import java.awt.event.MouseAdapter;
//import java.awt.event.MouseEvent;

public class GuiSimulator {

	private JFrame frame;
	private JTextField path;
	//private JTree tree;
	private JSpinner qt_virtualThing;
	private JSpinner qt_interactions;
	private JLabel tempo_VTDB;
	private JLabel tempoVTFile;
	//private DefaultMutableTreeNode theRoot;
	/**
	 * Launch the application.
	 */
	public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					GuiSimulator window = new GuiSimulator();
					window.frame.setVisible(true);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
	}

	/**
	 * Create the application.
	 */
	public GuiSimulator() {
		initialize();
	}

	/**
	 * Initialize the contents of the frame.
	 */
	private void initialize() {
		frame = new JFrame();
		frame.setBounds(100, 100, 576, 209);
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frame.getContentPane().setLayout(null);
		

		
		
		path = new JTextField();
		path.setBounds(6, 23, 553, 26);
		frame.getContentPane().add(path);
		path.setColumns(10);
		
		JLabel lblLocal = new JLabel("Local:");
		lblLocal.setBounds(9, 6, 61, 16);
		frame.getContentPane().add(lblLocal);
		
		JLabel lblQuantidadeDeDispositivos = new JLabel("Qtde de Dispositivos:");
		lblQuantidadeDeDispositivos.setBounds(9, 63, 148, 16);
		frame.getContentPane().add(lblQuantidadeDeDispositivos);
		
		JLabel lblQuantidadeDeInteraes = new JLabel("Qtde de Interações máxima por dispositivo:");
		lblQuantidadeDeInteraes.setBounds(171, 63, 286, 16);
		frame.getContentPane().add(lblQuantidadeDeInteraes);
		
		qt_virtualThing = new JSpinner();
		qt_virtualThing.setBounds(6, 80, 90, 26);
		frame.getContentPane().add(qt_virtualThing);
		
		qt_interactions = new JSpinner();
		qt_interactions.setBounds(169, 80, 90, 26);
		frame.getContentPane().add(qt_interactions);
		
		//tree....
		//DefaultMutableTreeNode theRoot = new DefaultMutableTreeNode("Virtual Thing");

        //DefaultMutableTreeNode theFirstExample = new DefaultMutableTreeNode("Device_12a2334");
        //DefaultMutableTreeNode firstExampleChild = new DefaultMutableTreeNode("Luminosidade");
        //theFirstExample.add(firstExampleChild);

        //DefaultMutableTreeNode theSecondExample = new DefaultMutableTreeNode("Device_13a354656");
        //DefaultMutableTreeNode secondExampleChild = new DefaultMutableTreeNode("Temperatura");
        //theSecondExample.add(secondExampleChild);

        //theRoot.add(theFirstExample);
        //theRoot.add(theSecondExample);
        
        //tree...

		
		JLabel lblTempo = new JLabel("Tempo para gerar Sensores Virtuais no Banco:");
		lblTempo.setBounds(171, 119, 294, 16);
		frame.getContentPane().add(lblTempo);
		
		JLabel lblNewLabel = new JLabel("Tempo para gerar Sensores Virtuais em arquivo: ");
		lblNewLabel.setBounds(172, 139, 304, 16);
		frame.getContentPane().add(lblNewLabel);
		
		tempo_VTDB = new JLabel("...");
		tempo_VTDB.setBounds(463, 119, 96, 16);
		frame.getContentPane().add(tempo_VTDB);
		
		tempoVTFile = new JLabel("...");
		tempoVTFile.setBounds(476, 139, 83, 16);
		frame.getContentPane().add(tempoVTFile);
		
		
		JButton btnGerarVT = new JButton("Gerar");

		btnGerarVT.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				
				VirtualThingDBGenerator vtdb = new VirtualThingDBGenerator();
				//gera o virtual thing com uma determinada diversidade de interacoes.
				//System.out.println(qt_virtualThing.getValue());
				Timer timer = new Timer();
				try {
					vtdb.StorageVT(vtdb.GenerateVT(((int)(qt_virtualThing.getValue()))),(int)(qt_interactions.getValue()));

				} catch (SQLException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
				//System.out.println("Tempo para gerar Sensores Virtuais no Banco: ");
				//System.out.println( timer );
				tempo_VTDB.setText(timer.toString());
				//System.out.println("\n");
				Timer timer2 = new Timer();
				VirtualThingFileGenerator vtf = new VirtualThingFileGenerator();
				//recebe o diretório onde serão armazenados os arquivos gerados.
				try {
					vtf.execute(path.getText());
				} catch (SQLException | IOException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
				//System.out.println("Tempo para gerar Sensores Virtuais em arquivo: ");
				//System.out.println( timer2 );
				//System.out.println("\n");
				tempoVTFile.setText(timer2.toString());
				
				
				//theRoot = new DefaultMutableTreeNode("Virtual Thing");

		        //DefaultMutableTreeNode theFirstExample = new DefaultMutableTreeNode("Device_12a2334");
		        //DefaultMutableTreeNode firstExampleChild = new DefaultMutableTreeNode("Luminosidade");
		        //theFirstExample.add(firstExampleChild);

		        //DefaultMutableTreeNode theSecondExample = new DefaultMutableTreeNode("Device_13a354656");
		        //DefaultMutableTreeNode secondExampleChild = new DefaultMutableTreeNode("Temperatura");
		        //theSecondExample.add(secondExampleChild);

		        //theRoot.add(theFirstExample);
		        //theRoot.add(theSecondExample);
		        
		        //tree.
				
			}
		});
		btnGerarVT.setBounds(8, 118, 148, 43);
		frame.getContentPane().add(btnGerarVT);
		
		
		

		

		
	}
}

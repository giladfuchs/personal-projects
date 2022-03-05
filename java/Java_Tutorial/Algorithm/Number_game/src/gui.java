import java.awt.BorderLayout;
import java.awt.EventQueue;

import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.border.EmptyBorder;
import java.awt.CardLayout;
import javax.swing.JButton;
import java.awt.event.ActionListener;
import java.awt.event.WindowEvent;
import java.awt.event.WindowListener;
import java.util.Arrays;
import java.util.List;
import java.awt.event.ActionEvent;
import javax.swing.JTextField;
import java.awt.Font;

public class gui extends JFrame  implements WindowListener,ActionListener{

	private JTextField txtListGame;
	private JTextField textField_1;
	private JTextField textField_2;
	private JTextField txtListA;
	private JTextField txtListB;
	private JTextField textField_5;
	private JTextField textField_6;
	private JTextField txtTotalA;
	private JTextField txtTotalB;

	private JTextField textplayercur;
	private JTextField textWin;
	private JTextField textField;
	
	private  JButton  btncomputer ,btnregular ,btnleft,btnright;
	 type playerCur =type.A; 
	
	private boolean computer=false;
	private JTextField textField_3;
	/**
	 * Launch the application.
	 */
	public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					gui frame = new gui();
					frame.setVisible(true);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
	}

	/**
	 * Create the frame.
	 */
	public gui() {
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		setBounds(100, 100, 887, 542);
		getContentPane().setLayout(null);

		/**
		 * defaine all the press on the button
		 */
		
		btncomputer = new JButton("מחשב");
		btncomputer.setBounds(741, 190, 97, 25);
		getContentPane().add(btncomputer);
		btncomputer.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				game.init();
				textWin.setText("המשחק התחיל מענין מי ינצח");
				computer=true;
				game.compPlat();
				playerCur=type.B;
				update();
				btnright.setEnabled(true);
				btnleft.setEnabled(true);

			}
		});


		btnregular = new JButton("רגיל");
		btnregular.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				game.init();
				update();
				textWin.setText("המשחק התחיל מענין מי ינצח");
				computer=false;
				btnright.setEnabled(true);
				btnleft.setEnabled(true);

			}
		});
		btnregular.setBounds(617, 190, 97, 25);
		getContentPane().add(btnregular);

		btnleft = new JButton("שמאלה");
		btnleft.setBounds(631, 295, 97, 25);
		getContentPane().add(btnleft);
		btnleft.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				if(game.listgame.isEmpty()) 
					txtListGame.setText("בחר איך תרצה לשחק");
				else {
					game.play(type.left, playerCur);
					
			turn();


				}}
		});



		btnright = new JButton("ימינה");
		btnright.setBounds(741, 295, 97, 25);
		getContentPane().add(btnright);
		btnright.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				if(game.listgame.isEmpty()) 
					txtListGame.setText("בחר איך תרצה לשחק");
				else {
					game.play(type.right, playerCur);
					turn();
				}
			}
		});

makeview();
	}


	/**
	 * make a turn after prees on button
	 */
	private void turn() {
		if(game.listgame.isEmpty()) 
			winner();
		else 	if(computer)
			game.compPlat();
		else
		playerCur=(playerCur == type.A ? type.B : type.A);

		update();

		
	}

	/**
	 * Update on the screen that change
	 */

	private void update() {
		txtListA.setText(game.listPlayerA.toString());
		txtListB.setText(game.listPlayerB.toString());
		txtListGame.setText(game.listgame.toString());
		txtTotalA.setText(""+game.totalA);
		txtTotalB.setText(""+game.totalB);
		textplayercur.setText(playerCur+ "  כרגע תורו של ");

	}
	/**
	 * update about who win
	 */
	private void winner() {
		playerCur=(game.totalA > game.totalB? type.A : type.B);

		textWin.setText(playerCur+ "  והמנצח הוא ");
		btnright.setEnabled(false);
		btnleft.setEnabled(false);

	}
	/**
	 * define text and button
	 */
	private void makeview() {
		txtListGame = new JTextField();
		txtListGame.setBounds(181, 296, 402, 22);
		getContentPane().add(txtListGame);
		txtListGame.setColumns(10);

		textField_1 = new JTextField();
		textField_1.setText("\u05E9\u05D7\u05E7\u05DF \u05D0");
		textField_1.setBounds(766, 408, 61, 22);
		getContentPane().add(textField_1);
		textField_1.setColumns(10);

		textField_2 = new JTextField();
		textField_2.setText("\u05E9\u05D7\u05E7\u05DF \u05D1");
		textField_2.setBounds(766, 460, 61, 22);
		getContentPane().add(textField_2);
		textField_2.setColumns(10);

		txtListA = new JTextField();
		txtListA.setColumns(10);
		txtListA.setBounds(163, 408, 480, 22);
		getContentPane().add(txtListA);


		txtListB = new JTextField();
		txtListB.setColumns(10);
		txtListB.setBounds(163, 460, 480, 22);
		getContentPane().add(txtListB);

		textField_5 = new JTextField();
		textField_5.setText("סהכ נקודות");
		textField_5.setColumns(10);
		textField_5.setBounds(668, 356, 79, 22);
		getContentPane().add(textField_5);

		textField_6 = new JTextField();
		textField_6.setText(" מה שנלקח");
		textField_6.setColumns(10);
		textField_6.setBounds(564, 356, 79, 22);
		getContentPane().add(textField_6);

		txtTotalA = new JTextField();
		txtTotalA.setText("\u05E9\u05D7\u05E7\u05DF \u05D0");
		txtTotalA.setColumns(10);
		txtTotalA.setBounds(683, 408, 61, 22);
		getContentPane().add(txtTotalA);

		txtTotalB = new JTextField();
		txtTotalB.setText("\u05E9\u05D7\u05E7\u05DF \u05D0");
		txtTotalB.setColumns(10);
		txtTotalB.setBounds(683, 460, 61, 22);
		getContentPane().add(txtTotalB);

		textplayercur = new JTextField();

		textplayercur.setColumns(10);
		textplayercur.setBounds(436, 233, 116, 22);
		getContentPane().add(textplayercur);

		textWin = new JTextField();
		textWin.setColumns(10);
		textWin.setBounds(263, 356, 211, 22);
		getContentPane().add(textWin);

		textField = new JTextField();
		textField.setText("להתחלת משחק בחר איך תרצה לשחק  ");
		textField.setColumns(10);
		textField.setBounds(642, 155, 185, 22);
		getContentPane().add(textField);
		
		textField_3 = new JTextField();
		textField_3.setFont(new Font("Tahoma", Font.PLAIN, 32));
		textField_3.setText(" \u05D1\u05E8\u05D5\u05DB\u05D9\u05DD \u05D4\u05D1\u05D0\u05D9\u05DD \u05DE\u05E9\u05D7\u05E7 \u05D4\u05DE\u05E1\u05E4\u05E8\u05D9\u05DD");
		textField_3.setBounds(111, 96, 480, 103);
		getContentPane().add(textField_3);
		textField_3.setColumns(20);
		
	}

	@Override
	public void actionPerformed(ActionEvent e) {
		// TODO Auto-generated method stub

	}

	@Override
	public void windowActivated(WindowEvent e) {
		// TODO Auto-generated method stub

	}

	@Override
	public void windowClosed(WindowEvent e) {
		// TODO Auto-generated method stub

	}

	@Override
	public void windowClosing(WindowEvent e) {
		// TODO Auto-generated method stub

	}

	@Override
	public void windowDeactivated(WindowEvent e) {
		// TODO Auto-generated method stub

	}

	@Override
	public void windowDeiconified(WindowEvent e) {
		// TODO Auto-generated method stub

	}

	@Override
	public void windowIconified(WindowEvent e) {
		// TODO Auto-generated method stub

	}

	@Override
	public void windowOpened(WindowEvent e) {
		// TODO Auto-generated method stub

	}
}

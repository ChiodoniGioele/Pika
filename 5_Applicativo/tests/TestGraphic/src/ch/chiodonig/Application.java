/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package ch.chiodonig;

import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Graphics2D;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import javax.imageio.ImageIO;
import javax.swing.ImageIcon;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.SwingUtilities;

/**
 *
 * @author gioele.chiodoni
 */
public class Application {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) throws IOException {
        
        String imagePath = "D:/Scuola/SAMT 3/Progetti/Pika/TestGraphic/immagine.png"; // path dell'immagine
        BufferedImage myPicture = ImageIO.read(new File(imagePath)); // "apro" l'immagine
        Graphics2D g = (Graphics2D) myPicture.getGraphics(); // per disegnare
        g.setStroke(new BasicStroke(15)); // spessore del margine
        g.setColor(Color.BLUE); // colore del margine
        g.drawRect(10, 10, myPicture.getWidth() - 20, myPicture.getHeight() - 20); // disegna rettangolo

        
        JLabel picLabel = new JLabel(new ImageIcon(myPicture)); 
        JPanel pa = new JPanel();
        pa.add(picLabel);
        pa.setBackground(Color.red);
        JFrame f = new JFrame();
        f.setSize(new Dimension(myPicture.getWidth(), myPicture.getHeight()));
        f.add(pa);
        f.setVisible(true);
        
        // get coordinat mouse click
        pa.addMouseListener(new MouseAdapter() {// provides empty implementation of all
                                                   // MouseListener`s methods, allowing us to
                                                   // override only those which interests us
            @Override //I override only one method for presentation
            public void mousePressed(MouseEvent e) {
                System.out.println(e.getX() + "," + e.getY());
                        g.setStroke(new BasicStroke(2)); // spessore del margine
                        g.setColor(Color.BLUE); // colore del margine
                g.drawRect(e.getX() + 7, e.getY()- 7 , 2, 2);
                SwingUtilities.updateComponentTreeUI(f);
            }
        });
    }
}


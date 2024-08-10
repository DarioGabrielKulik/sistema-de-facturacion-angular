import { Component } from '@angular/core';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  constructor(){}

  descargarPDF(){
    const content = document.getElementById('content');
  if (content) {
    html2canvas(content).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');

      const doc = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 180; // Ajusta el ancho de la imagen
      const pageHeight = 297; // Altura del PDF en mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      // Centrar horizontalmente
      const centerX = (doc.internal.pageSize.getWidth() - imgWidth) / 2;
      // Centrar verticalmente
      const centerY = (doc.internal.pageSize.getHeight() - imgHeight) / 15;

      doc.addImage(imgData, 'PNG', centerX, centerY, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        doc.addPage();
        doc.addImage(imgData, 'PNG', centerX, centerY, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      doc.save('archivo.pdf');
    });
  } else {
    console.error('No se encontró el elemento con el ID "content".');
  }
}
 
}


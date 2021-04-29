import { Component, ViewChild, ElementRef } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AJXPDFmake';
  USERS = [
    {
      "id": 1,
      "name": "Leanne Graham",
      "email": "sincere@april.biz",
      "phone": "1-770-736-8031 x56442"
    },
    {
      "id": 2,
      "name": "Ervin Howell",
      "email": "shanna@melissa.tv",
      "phone": "010-692-6593 x09125"
    },
    {
      "id": 3,
      "name": "Clementine Bauch",
      "email": "nathan@yesenia.net",
      "phone": "1-463-123-4447",
    },
    {
      "id": 4,
      "name": "Patricia Lebsack",
      "email": "julianne@kory.org",
      "phone": "493-170-9623 x156"
    },
    {
      "id": 5,
      "name": "Chelsey Dietrich",
      "email": "lucio@annie.ca",
      "phone": "(254)954-1289"
    },
    {
      "id": 6,
      "name": "Mrs. Dennis",
      "email": "karley@jasper.info",
      "phone": "1-477-935-8478 x6430"
    }
  ];

  @ViewChild('htmlData') htmlData:ElementRef;
constructor(private domSanitizer:DomSanitizer){

  console.log(this.inWords(105999))

}
  public openPDF():void {
    let DATA = document.getElementById('htmlData');
        
    html2canvas(DATA).then(canvas => {
        let fileWidth = 208;
        let fileHeight = canvas.height * fileWidth / canvas.width;       
        const FILEURI = canvas.toDataURL('image/png')
        let PDF = new jsPDF('p', 'mm', 'a4');
        let position = 0;
        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)
        PDF.save('angular-demo.pdf');
    });     
    }

print() {
          let DATA = document.getElementById('htmlData');
          const fileName = String(new Date().valueOf());
          const element: HTMLElement = document.querySelector('.print-area');
          const regionCanvas = element.getBoundingClientRect();

        html2canvas(DATA).then(async canvas => {
          let fileWidth = 208;
          let fileHeight = canvas.height * fileWidth / canvas.width;
          const FILEURI = canvas.toDataURL('image/png')
            const pdf = new jsPDF('p', 'mm', 'a4');
            let position = 0;
            pdf.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)
           // await pdf.save(fileName, { returnPromise: true });
               pdf.autoPrint();             
              let dataSrc =  pdf.output("bloburl")
              var iframe:any = window.document.getElementById('iFramePdf');
              iframe.src = pdf.output('datauristring');
           
        });
    }


    
     inWords (num) {

      var a:any = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
      var b:any = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];
  

        if ((num = num.toString()).length > 9) return 'overflow';
       var n:any = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
        if (!n) return; var str = '';
        str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
        str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
        str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
        str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
        str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'only ' : '';
        return str;
    }

    
}

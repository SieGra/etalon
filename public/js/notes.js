// // NOTES
// !(function(){
// let counter = 0;
//     if(document.title === "Etalon - Notes"){
//         function xhrRequest () {
//             const xhr = new XMLHttpRequest();
//             xhr.open('POST', '/notes');
//             xhr.send();
//             xhr.onreadystatechange = ()=>{
//                 if(xhr.readyState === 4 && xhr.status === 200) {
//                     if(!JSON.parse(xhr.response)[0]){
//                         xhrRequest();
//                     }
//                     if(JSON.parse(xhr.response)[0].length >= 1) {
//                         let body = JSON.parse(xhr.response)[0];
//                         console.log(JSON.parse(xhr.response)[0])
//                         for(let i = 0; i < body.length; i++ ) {
//                             makeFigure(body[i]);
//                         }
//                     } else {
//                         counter += 1;
//                         xhrRequest();
//                         if(counter === 10) {
//                            document.write('We failed to fetch the articles, please refresh the page') 
//                         }
//                     }
//                 }
//             }
//         }

//         xhrRequest();


//         function makeFigure (obj) {

//             const parent = document.getElementById('articles');
//             const figure = document.createElement('figure');
//             const articleContainerOuter = document.createElement('article');
//             const articleContainer = document.createElement('article');
//             const h3 = document.createElement('h3');
//             const h5 = document.createElement('h5');
//             const h4 = document.createElement('h4');
//             const a = document.createElement('a');
//             const img = document.createElement('img');
            
//             figure.className = 'notesFigure';
//             articleContainerOuter.className = 'articleContainerOuter';
//             articleContainer.className = 'container';
//             h3.className = 'notesFigureH3';
//             h5.className = 'notesFigureH5';
//             h4.className = 'notesFigureH4';
//             a.className = 'notesA';
//             img.className = 'notesFigureImg';

//             h3.textContent = obj.title;
//             // h5.textContent = obj.date;
//             h4.textContent = obj.body.substr(0, 100) +  "....";
//             a.href = '/article';
//             a.textContent = 'Read more...';
//             img.src = "img/susan-yin-647448-unsplash.jpg";
//             img.alt = 'Image alt';
            
            
            
//             articleContainerOuter.appendChild(articleContainer);
//             articleContainer.appendChild(h3);
//             articleContainer.appendChild(h5);
//             articleContainer.appendChild(h4);
//             articleContainer.appendChild(a);
//             articleContainerOuter.appendChild(img);
//             figure.appendChild(articleContainerOuter);
            
//             parent.appendChild(figure);
            
            
            
//         }
//     }
        
//     })();
// NOTES
!(function(){

    if(document.title === "Etalon - Notes"){

        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/notes');
        xhr.send();
        xhr.onloadend = function  () {

            console.log(xhr.response)
        };

        const parent = document.getElementById('articles');
        const figure = document.createElement('figure');
        const articleContainerOuter = document.createElement('article');
        const articleContainer = document.createElement('article');
        const h3 = document.createElement('h3');
        const h5 = document.createElement('h5');
        const h4 = document.createElement('h4');
        const a = document.createElement('a');
        const img = document.createElement('img');
        
        figure.className = 'notesFigure';
        articleContainerOuter.className = 'articleContainerOuter';
        articleContainer.className = 'container';
        
        h3.className = 'notesFigureH3';
        h5.className = 'notesFigureH5';
        h4.className = 'notesFigureH4';
        a.className = 'notesA';
        img.className = 'notesFigureImg';
        h3.textContent = 'Title goes here';
        h5.textContent = new Date().toDateString();
        h4.textContent = "description loremIpsum lorem lard coffe maker jokes aside politician and crooks" +  "....";
        a.href = '/articleNumber234';
        a.textContent = 'Read more...';
        img.src = "img/susan-yin-647448-unsplash.jpg";
        img.alt = 'Image alt';
        
        
        
        articleContainerOuter.appendChild(articleContainer);
        articleContainer.appendChild(h3);
        articleContainer.appendChild(h5);
        articleContainer.appendChild(h4);
        articleContainer.appendChild(a);
        articleContainerOuter.appendChild(img);
        figure.appendChild(articleContainerOuter);
        
        parent.appendChild(figure);



    }
        
    })();
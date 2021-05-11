document.addEventListener('DOMContentLoaded',()=>{
    const grid=document.querySelector(".grid");
    const width=8;
     const squares=[];
     let score=0;
     //Create Board object
    
     let sc=document.querySelector("#sc");
     console.log(sc);

     const candyColor=['red','yellow','orange',
     'pink','green',
     'blue'
    
    ]
     function createBoard(){
         for(let i=0;i<width*width;i++){
             const square=document.createElement("div");
             let randomColor=Math.floor(Math.random()*candyColor.length);
             square.setAttribute("draggable",true);
             square.setAttribute("id",i);
             let color=candyColor[randomColor];
            // console.log(color)
             square.style.backgroundColor=color;
             grid.appendChild(square);
             squares.push(square);
         }
     }
     createBoard();

     let colorBeingDragged;
     let colorBeingReplaced;
     let squareIdBeingReplaced;
     let squareIdBeingDragged;
    squares.forEach(square=>square.addEventListener('dragstart',dragStart))
    squares.forEach(square=>square.addEventListener('dragend',dragEnd))
    squares.forEach(square=>square.addEventListener('dragover',dragOver))
    squares.forEach(square=>square.addEventListener('dragenter',dragEnter))
    squares.forEach(square=>square.addEventListener('dragleave',dragLeave))
    squares.forEach(square=>square.addEventListener('drop',dragDrop))
 
    function dragStart(){
        colorBeingDragged=this.style.backgroundColor;
        squareIdBeingDragged=parseInt(this.id);
        console.log(colorBeingDragged);
        console.log(this.id,'dragstart');

    }
    function dragEnd(){
        console.log(this.id,'dragEnd');

        // for valid move

        let validMoves=[
            squareIdBeingDragged-1,
            squareIdBeingDragged-width,
            squareIdBeingDragged+1,
            squareIdBeingDragged+width
        ];

        let validMove=validMoves.includes(squareIdBeingReplaced)
        if(squareIdBeingReplaced && validMove){
              squareIdBeingDragged=null;
        }
        else if(squareIdBeingReplaced && !validMove){
            squares[squareIdBeingReplaced].style.backgroundColor=colorBeingReplaced;
            squares[squareIdBeingDragged].style.backgroundColor=colorBeingDragged;

        }
        else{
            squares[squareIdBeingDragged].style.backgroundColor=colorBeingDragged;
        }


    }
    function dragOver(e){
        e.preventDefault();
        console.log(this.id,'dragOver');
    }
    
    function dragEnter(e){
        e.preventDefault();
        console.log(this.id,'dragEnter');
    }

    function dragLeave(){
        console.log(this.id,'dragLeave');
    }

    function dragDrop(){
        console.log(this.id,'dragDrop');
        colorBeingReplaced=this.style.backgroundColor;
        squareIdBeingReplaced=parseInt(this.id);
        this.style.backgroundColor=colorBeingDragged;
        squares[squareIdBeingDragged].style.backgroundColor=colorBeingReplaced;
    }

    function moveDown(){
        for(let i=0;i<55;i++){
            if(squares[i+width].style.backgroundColor===''){
                squares[i+width].style.backgroundColor=squares[i].style.backgroundColor;
                squares[i].style.backgroundColor=''
                const firstRow=[0,1,2,3,4,5,6,7];
                const isFirstRow=firstRow.includes(i)
                if(isFirstRow && squares[i].style.background===''){
                    let randomColor=Math.floor(Math.random()*candyColor.length);
                     squares[i].style.backgroundColor=candyColor[randomColor];
                }
            }
        }
    }

    function checkRowForThree(){
        for(let i=0;i<61;i++){
            let rowOfthree=[i,i+1,i+2];
            let deciderColor=squares[i].style.backgroundColor;
            const isBlank=squares[i].style.backgroundColor==='';
            const notValid=[6,7,14,15,,22,23,30,31,38,39,46,47,54,55];
            if(notValid.includes(i))
            continue;

            if(rowOfthree.every(index=>squares[index].style.backgroundColor===deciderColor && !isBlank)){
                score+=3;
                document.querySelector("#sc").innerText=score;
                rowOfthree.forEach((index)=>{
                    let randomColor=Math.floor(Math.random()*candyColor.length);
                    
                    squares[index].style.backgroundColor=candyColor[randomColor];
                })
            }
            
        }
    }
    checkRowForThree();
    function checkColForThree(){
        for(let i=0;i<47;i++){
            let colOfthree=[i,i+width,i+2*width];
            let deciderColor=squares[i].style.backgroundColor;
            const isBlank=squares[i].style.backgroundColor==='';
            if(colOfthree.every(index=>squares[index].style.backgroundColor===deciderColor && !isBlank)){
                score+=3;
                document.querySelector("#sc").innerText=score;
                colOfthree.forEach((index)=>{
                    squares[index].style.backgroundColor='';
                })
            }
            
        }
    }
    checkColForThree();
    function checkRowForFour(){
        for(let i=0;i<61;i++){
            let rowOfFour=[i,i+1,i+2,i+3];
            let deciderColor=squares[i].style.backgroundColor;
            const isBlank=squares[i].style.backgroundColor==='';
            const notValid=[5,6,7,13,14,15,21,22,23,29,30,31,37,38,39,45,46,47,53,54,55];
            if(notValid.includes(i))
            continue;
           
            if(rowOfFour.every(index=>squares[index].style.backgroundColor===deciderColor && !isBlank)){
                score+=4;
                document.querySelector("#sc").innerText=score;
                rowOfFour.forEach((index)=>{
                    squares[index].style.backgroundColor='';
                })
            }
            
        }
    }
    checkRowForFour();
  
    function checkColForFour(){
        for(let i=0;i<47;i++){
            let colForFour =[i,i+width,i+2*width,i+3*width];
            let deciderColor=squares[i].style.backgroundColor;
            const isBlank=squares[i].style.backgroundColor==='';
            if(colForFour.every(index=>squares[index].style.backgroundColor===deciderColor && !isBlank)){
                score+=4;
                document.querySelector("#sc").innerText=score;
                colForFour.forEach((index)=>{
                    squares[index].style.backgroundColor='';
                })
            }
            
            
        }
    }
    checkColForFour();
  
    
    setInterval(()=>{
        
        moveDown();
        checkRowForFour();
        checkColForFour();
        checkRowForThree();
        checkColForThree();
       
    },100);




})
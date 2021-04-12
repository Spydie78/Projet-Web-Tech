const textElement =document.getElementById('text')
const optionElement =document.getElementById('option-buttons')
const objectElement=document.getElementById('menu-objects')
var btn =document.querySelector('.button-objects');
var nav=document.querySelector('.nav'); 


var state={}

function startGame(){

    state={}
     
    //display the first text 
    showTextNode(1)
}

//function that displays text and options 
function showTextNode(textNodeIndex){
    const textNode=textNodes.find(textNode=>textNode.id===textNodeIndex)
    textElement.innerText=textNode.text
    //remove all options 
    while (optionElement.firstChild){
        optionElement.removeChild(optionElement.firstChild)
    }
    //remove all objects 
    while(objectElement.firstChild){
        objectElement.removeChild(objectElement.firstChild)
    }
    textNode.options.forEach(option => {
        if(showOption(option)){
            const button =document.createElement('button')
            button.innerText=option.text
            button.classList.add('btn')
            button.addEventListener('click', ()=>selectOption(option))
            optionElement.appendChild(button)

        }
        
    });
  
   for(let i in state){

       if (state[i])
       {   
           let attribut= document.createElement('a')
        let newContent=document.createTextNode(i)
          attribut.appendChild(newContent)
         objectElement.appendChild(attribut)

       }
   }

    
  

}

function showOption(option){
    return option.requiredState==null||option.requiredState(state)
}

function selectOption (option){
    const nextTextNodeId=option.nextText
    if(nextTextNodeId<=0){
        return startGame()
    }
    //edit var state
    state =Object.assign(state, option.setState)
    
   
    showTextNode(nextTextNodeId)
}

const textNodes=[
    {
        id:1,
        text:'question 1.', 
        options:[
            {
                text:'Take goo',
                setState:{blueGoo:true},
                nextText: 2
            },
            {
                text:'Leave the goo', 
                nextText: 2
            }
        ]
    }, 
    {
        id:2,
        text:'question 2.', 
        options:[
            {
                text:'Tadre the goo for a sword',
                requiredState:(currentState)=>currentState.blueGoo,
                setState:{blueGoo:false, sword:true,choclate:true},
                nextText:3
            },
            {
                text:'Tadre the goo for a shield',
                requiredState:(currentState)=>currentState.blueGoo,
                setState:{blueGoo:false, shield:true, choclate:false},
                nextText:3
            },
           
            {
                text:'Ignore the merchant',
                nextText:3
            }
            
        ] 
    },
    {
        id:3,
        text:'question 3.', 
        options:[
            {
                text:'Explore the castle',

                nextText:4
            },
            {
                text:'find a room',
                requiredState:(currentState)=>currentState.shield,
                nextText:5
            },
            {
                text:'find some hay in a stable to sleep in',
                nextText:6
            }
            
        ] 
    },
    {
        id:4,
        text:'question 4.', 
        options:[
            {
                text:'Restart',
              
                nextText:-1
            }
            
        ] 
    },
    {
        id:5,
        text:'question 5.', 
        options:[
            {
                text:'add orange',
                setState:{orange:true},
                nextText:1
            }
            
        ] 
    }
    
    
]


btn.onclick=function(){
    nav.classList.toggle('nav_open'); 
}
startGame()
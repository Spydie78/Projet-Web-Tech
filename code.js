const textElement = document.getElementById('text')
const locationElement = document.getElementById('location')
const optionElement = document.getElementById('option-buttons')
const objectElement = document.getElementById('menu-objects')
var btn = document.querySelector('.button-objects');
var nav = document.querySelector('.nav');


var state = {}
var stateDialog = {}


function startGame() {

    state = {orange:false,flyer:false, bag:false, pass:false}
    stateDialog = { talk: false, talkEnd: false,talkEnd2:false }
 
    //display the first text 
    showTextNode(1)
}

//function that displays text and options 
function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)

    if (stateDialog.talk) {


        if (stateDialog.talkEnd) {
           
            if(stateDialog.talkEnd2){
                textElement.innerText = textNode.text +textNode.dialog + textNode.dialogEnd+textNode.dialogEnd2
            }else{
                 textElement.innerText = textNode.text + textNode.dialog + textNode.dialogEnd
            }
        }
        else {
            textElement.innerText = textNode.text + textNode.dialog
        }
    }

    else {
        textElement.innerText = textNode.text
    }

    locationElement.innerText = textNode.location
    //remove all options 
    while (optionElement.firstChild) {
        optionElement.removeChild(optionElement.firstChild)
    }
    //remove all objects 
    while (objectElement.firstChild) {
        objectElement.removeChild(objectElement.firstChild)
    }
    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionElement.appendChild(button)

        }

    });

    for (let i in state) {

        if (state[i]) {
            let attribut = document.createElement('a')
            let newContent = document.createTextNode(i)
            attribut.appendChild(newContent)
            objectElement.appendChild(attribut)

        }
    }
    console.log(stateDialog)




}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state) || option.requiredState(stateDialog)
}

function selectOption(option) {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    //edit var state
    state = Object.assign(state, option.setState)
    //edit var stateDialog
    stateDialog = Object.assign(stateDialog, option.setStateDialog)


    showTextNode(nextTextNodeId)
}

const textNodes = [
    {
        id: 1,
        location: 'Latona fountain',
        text: 'After a morning visit inside the Palace, you and your daughter want to visit the gardens in the afternoon.\nA blazing sun dominates this afternoon.\n\nHowever, you decide to split up to meet again later.\n\nWhile your daughter is going to see a water fountain show at the Apollo s fountain, you choose to buy yourself an ice cream.\n\n',
        dialog: "",
        options: [
            {
                text: 'Go to the ice cream seller',
                nextText: 2
            }
        ]
    },
    {
        id: 2,
        location: 'Ice cream seller',
        text: 'question 2.',
        dialog: "",
        options: [
            {
                text: 'Buy',
               
                nextText: 3
            },
            {
                text: 'Do not buy',
              
                nextText: 3
            }
        ]
    },
    {
        id: 3,
        location: 'Orangery',
        text: 'Intrigued by trees in the Orangery garden, you approach them.\n\nA castle gardener is in the process of caring for trees.',
        dialog: '\n\n>Talk to him\n\n-Hello, I would like to know what these trees are called ?\n-They are orange trees. Have you never seen an orange tree before ?\n-No, it does not grow orange in Scotland.\n-Um ok, take an orange, it is really good and sweet',
        dialogEnd: '\n\n>Take orange\n\n-Thank you so much, I will eat it later.',
        options: [
            {
                text: 'Talk to him',
                requiredState: (currentState) => (currentState.talk == false),
                setStateDialog: { talk: true },
               
                nextText: 3
            },
            {
                text: 'Do not talk',
                requiredState: (currentState) => (currentState.talk == false),
                nextText: 4
            },
            {
                text: 'Take orange',
                requiredState: (currentState) => (currentState.talk && currentState.talkEnd == false),
                setStateDialog: { talkEnd: true },
                setState: { orange: true },
                nextText: 3
            },
            {
                text: 'Do not take',
                requiredState: (currentState) => (currentState.talk && currentState.talkEnd == false),
                setStateDialog:{talk:false, talkEnd:false},
                nextText: 4
            },
            {
                text: 'Next',
                requiredState: (currentState) => (currentState.talkEnd),
                setStateDialog:{talk:false, talkEnd:false},
                nextText: 4
            }

        ],
    },

    {
        id: 4,
        location:'',
        text: 'On the way to join your daughter, you see a castle flyer on the ground, including the program of shows.',
        dialog:'',
        options: [
            {
                text: 'Pick up',
                setState: { flyer: true },
                nextText: 5
            },
            {
                text: 'Do not Pick up',
                nextText: 5
            }

        ]
    },



    {
        id: 5,
        location: 'Apollo s fountain',
        text: 'Arriving at the Apollo s fountain, your daughter is gone.\nYou can interact with another visitor.',
        dialog: '\n\n>Talk to him\n\n-Hello, the show is over? I am looking for my daughter.\n-Yes,  the show is over. Your daughter probably went to the next show. But I do not have the program. You must look in the castle flyer.\n-Thanks you',
        options: [
            {
                text: 'Talk to him',
                requiredState: (currentState) => (currentState.talk == false),
                setStateDialog: { talk: true },
                nextText: 5
            },
            {
                text: 'Do not talk',
                requiredState: (currentState) => (currentState.talk == false),
               
                nextText: 6
            }, 
            {
                text: 'Next',
                requiredState: (currentState) => (currentState.talk),
                setStateDialog:{talk:false, talkEnd:false},
                nextText: 6
            }

        ],
    },


    {
        id: 6,
        location: 'Obelisk Grove',
        text: 'You arrived too late at the show.\nHowever, you recognize your daughter s bag.\nInside there is her ID.',
        dialog: '\n\nNext to the bag, there is a photographer.',
        dialogEnd: '\n\n>Talk to him\n\n-Good afternoon, I am looking for my daughter. Have you seen a little girl ?\nMaybe, have you got a photo ?',
        dialogEnd2: '\n\n>Show ID\n\nI recognize her, she went to the Star Grove.', 
        options: [
            {
                text: 'Pick up the bag',
                requiredState: (currentState) => (currentState.talk == false),
                setState: { bag: true },
                setStateDialog: { talk: true },
                nextText: 6
            },
            {
                text: 'Do not pick up',
                requiredState: (currentState) => (currentState.talk == false),
                setStateDialog: { talk: true },
                nextText: 6
            },
            {
                text: 'Talk to him',
                requiredState: (currentState) => (currentState.talk && currentState.talkEnd == false),
                setStateDialog: { talkEnd: true },
                nextText: 6
            },
            {
                text: 'Do not talk',
                requiredState: (currentState) => (currentState.talk && currentState.talkEnd == false),
                setStateDialog:{talk:false, talkEnd:false,talkEnd2:false},
                nextText: 6
            },
            {
                text: 'Show ID', 
               //Problem here 
                requiredState: (currentState) => (currentState.talkEnd && currentState.talkEnd2==false ),
               
                setStateDialog: { talkEnd2: true },
                nextText: 6
            },
            {
                text: 'Go to the Star Grove',
                requiredState: (currentState) => (currentState.talkEnd2),
                setStateDialog:{talk:false, talkEnd:false,talkEnd2:false},
                nextText: 7
            }

        ],
    },

    {
        id: 7,
        location:'Star Grove',
        text: 'You are now in the front of the entrance to the Star Grove.\nYou see a poster where it is written:\n\n< It is a paying grove,\nIt is $10 to visit.\nIt is free for children.\nFor foreigners, discounts at the Queen s Grove.>',
        dialog:'',
        options: [
            {
                text: 'Buy ticket',
                requiredState: (currentState) => (currentState.pass==false),
                nextText: 9
            },
            {
                text: 'Show your pass',
                requiredState: (currentState) => (currentState.pass),
                nextText: 9
            }, 
            {
                text: 'Go to the Queen s Grove',
                nextText: 8
            } 

        ]
    },

    {
        id: 8,
        location:'Queen s Grove',
        text: 'On the side of the grove, there is a hut that sells passes to visit all the groves.\n\nSeller says, <for foreign visitors pass at $3 for the Star Groves, and the Grove of the Three fountains.>',
        dialog:'',
        options: [
            {
                text: 'Buy pass',
                setState:{pass:true},
                nextText: 7
            },
            {
                text: 'Do not buy',
                nextText: 8
            }, 
            
        ]
    },

    {
        id: 9,
        location:'Grove of the Three fountains',
        text: 'After you have looked for your daughter in the Star Groves, you found your daughter in the next grove, Grove of the Three fountains.\n\nBut she will be unable to move to reach the exit because she has sunstroke.\n\nTo save her you have to give her some sweet things. ',
        dialog:'\n\n>Give her the orange\n\nYour daughter regained her strength. You can join the exit with her before the gardens close.\nThe exit from the gardens is at the Mirror Pool.',
        options: [
            {
                text: 'Give her the orange',
                //probleme here
                requiredState: (currentState) => (currentState.orange),
                setStateDialog:{talk:true},
                nextText: 9
            },
            {
                text: 'Go to the Mirror Pool',
                requiredState: (currentState) => (currentState.talk),
                setStateDialog:{talk:false},
                nextText: 10
            }
            
            
        ]
    },
    
    {
        id: 10,
        location:'Mirror Pool',
        text: 'This is the exit from the gardens.\n\nDo you want to go out ?',
        dialog:'',
        options: [
            {
                text: 'Yes',
                
                nextText: 14
            },
            {
                text: 'No',
                nextText: 10
            }
            
            
        ]
    },



    {
        id: 14,
        text: 'question 14.',
        options: [
            {
                text: 'Restart',

                nextText: -1
            }

        ]
    }

]


btn.onclick = function () {
    nav.classList.toggle('nav_open');
}
startGame()
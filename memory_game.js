// This array, along with the following function, are going to shuffle the HTML elements.

let ids = [
    document.getElementById('pic0'),
    document.getElementById('pic1'),
    document.getElementById('pic2'),
    document.getElementById('pic3'),
    document.getElementById('pic4'),
    document.getElementById('pic5'),
    document.getElementById('pic6'),
    document.getElementById('pic7'),
    document.getElementById('pic8'),
    document.getElementById('pic9'),
    document.getElementById('pic10'),
    document.getElementById('pic11'),
    document.getElementById('pic12'),
    document.getElementById('pic13'),
    document.getElementById('pic14'),
    document.getElementById('pic15'),
    document.getElementById('pic16'),
    document.getElementById('pic17'),
    document.getElementById('pic18'),
    document.getElementById('pic19'),
    document.getElementById('pic20'),
    document.getElementById('pic21'),
    document.getElementById('pic22'),
    document.getElementById('pic23'),
    document.getElementById('pic24'),
    document.getElementById('pic25'),
    document.getElementById('pic26'),
    document.getElementById('pic27'),
    document.getElementById('pic28'),
    document.getElementById('pic29'),
    document.getElementById('pic30'),
    document.getElementById('pic31')
];

let list = document.getElementById("cards");

function shuffle(items) {
    let cached = items.slice(0), temp, i = cached.length, rand;
    while(--i)
    {
        rand = Math.floor(i * Math.random());
        temp = cached[rand];
        cached[rand] = cached[i];
        cached[i] = temp;
    }
    return cached;
}

function randomizer() {
    let nodes = list.children, i = 0;
    nodes = Array.prototype.slice.call(nodes);
    nodes = shuffle(nodes);
    while(i < nodes.length)
    {
        list.appendChild(nodes[i]);
        ++i;
    }
}

function start() { // Once the start button is clicked, the game will start.
    const done = document.getElementById('finish');
    const r_text = document.getElementById('restart_text');
    const text = document.getElementById('start_text');
    const show_cards = document.getElementById('cards');
    document.getElementById("clicks").innerHTML = `Clicks: 0`;
    done.style.display = "none";
    r_text.style.display = "none";
    text.style.display = "none";
    randomizer(ids);
    show_cards.style.display = "grid";
}

let clicked = document.getElementById("clicks");
let counter = 0;

let first_card_id = null;
let second_card_id = null;

const resolved = []; // All matched cards will be pushed into this array.

function cardClicked(e){ // Whenever a card is selected, this function will display the picture on it.
    clicked.innerHTML = `Clicks: ${counter + 1}`;
    counter++;
    const pick = e.target;
    if (pick.getAttribute("class").split(" ")[1] === 'resolved') { // For cards already matched.
        const message = document.getElementById('matched');
        message.style.display = "flex";
        return setTimeout(() => {
            message.style.display = "none";
        }, 600);
    }
    pick.className = pick.className
        .replace('back_of_card', 'none');
    if (first_card_id && !second_card_id) { // If a first card has already been chosen.
        second_card_id = pick;
        if (second_card_id.getAttribute('id') !== first_card_id.getAttribute('id')) { // When two different cards are picked, both are put into variables.
            const compareFirst = first_card_id.getAttribute("class").split(" ")[0];
            const compareSecond = second_card_id.getAttribute("class").split(" ")[0];
            setTimeout(() => { 
                if (compareFirst === compareSecond) { // If the cards share the same class it's a match.
                    first_card_id.className = first_card_id.className
                        .replace('none', 'resolved');
                    second_card_id.className = second_card_id.className
                        .replace('none', 'resolved');
                    resolved.push(first_card_id.getAttribute("id"), second_card_id.getAttribute("id"));
                    first_card_id = null;
                    second_card_id = null;
                    if (resolved.length === 32) { // If all thirty-two cards have been matched the game is over.
                        const show_cards = document.getElementById('cards');
                        const done = document.getElementById('finish');
                        const text = document.getElementById('restart_text');
                        done.innerHTML = `You won! With a total of ${counter} clicks. Would you like to play again?`
                        show_cards.style.display = "none";
                        done.style.display = "flex";
                        counter = 0;
                        ids.forEach(function(i){
                            let complete = i.getAttribute("class").split(" ")[1];
                            if (complete === "resolved") {
                                i.className = i.className.replace("resolved", "back_of_card");
                            }                         
                        })
                        setTimeout(() => {
                            text.style.display = "block";
                        }, 750)
                        
                    }
                } 
                else { // If the cards don't match they get flipped back.
                    first_card_id.className = first_card_id.className
                        .replace('none', 'back_of_card');
                    second_card_id.className = second_card_id.className
                        .replace('none', 'back_of_card');
                    first_card_id = null;
                    second_card_id = null;
                }
            }, 300)
        } else {
            first_card_id.className = first_card_id.className
                .replace('none', 'back_of_card');
            second_card_id.className = second_card_id.className
                .replace('none', 'back_of_card');

            first_card_id = null;
            second_card_id = null;
        }

    }
    if (!first_card_id) { // If a card hasn't been picked for a new pair.
        first_card_id = pick;
        pick.className = pick.className.replace('back_of_card', 'none');
    }
}
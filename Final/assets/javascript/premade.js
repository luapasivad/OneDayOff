// Initialize Firebase

var config = {
    apiKey: "AIzaSyBHLLHSID8XnKBEARSlZ2xsp9kHrNXjRgo",
    authDomain: "onedayoff-2291e.firebaseapp.com",
    databaseURL: "https://onedayoff-2291e.firebaseio.com",
    projectId: "onedayoff-2291e",
    storageBucket: "onedayoff-2291e.appspot.com",
    messagingSenderId: "1096725822270"
};
firebase.initializeApp(config);
const db = firebase.firestore()

let plansForThisCity = []
let where = sessionStorage['premadeCity']

    // go into database and grab all plans from selected city
    db.collection('plans').get().then( snapshot => {
        snapshot.docs.forEach( doc => {
            console.log(doc)
            let obj = doc.data()
            let city = obj.plan[2].location
            
            if (city.toLowerCase() === where.toLowerCase()) {
                let newObj = {...obj.plan}
                plansForThisCity.push(newObj)
            }
        })
    })

    console.log(plansForThisCity)

    // add to premade plans page
    let column = $('<div>')
                    .attr('class', 'col-sm-6').
                    appendTo('#premadeDiv')
    let card = $('<div>').
                    attr('class', 'card pre-made-card')
                    .appendTo(column)
    let img = $('<img>')
                    .attr('src', '#')
                    .attr('class', 'card-img-top day-off-image')
                    .appendTo(card)
    let cardBody = $('<div>')
                        .attr('class', 'card-body')
                        .appendTo(card)
    let text = $('<p>')
                    .attr('class', 'card-text')
                    .text('hello').appendTo(card)
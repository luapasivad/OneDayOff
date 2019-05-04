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

let image = '',
    title = '',
    description = ''

    // go into database and grab all plans from selected city
    db.collection('plans').get().then( snapshot => {
        snapshot.docs.forEach( doc => {
            let obj = doc.data()
            let city = obj.plan[2].location
            
            if (city.toLowerCase() === where.toLowerCase()) {
                let newObj = {...obj.plan}
                plansForThisCity.push(newObj)

                for (let i = 2; i < obj.plan.length; i++) {
                    image = obj.plan[i].img
                    title = obj.plan[0]
                    description = obj.plan[1]
                }

                 // add to premade plans page
                let column = $('<div>')
                                .attr('class', 'col-sm-6').
                                appendTo('#premadeDiv')
                let card = $('<div>').
                                attr('class', 'card pre-made-card mb-3 mt-3')
                                .appendTo(column)
                let img = $('<img>')
                                .attr('src', image)
                                .attr('class', 'card-img-top day-off-image')
                                .appendTo(card)
                let cardBody = $('<div>')
                                .attr('class', 'card-body')
                                .appendTo(card)
                let cardTitle = $('<p>')
                                .attr('class', 'card-text ml-3 mb-3')
                                .text(title).appendTo(card)
                let cardDescription = $('<p>')
                                .attr('class', 'card-text ml-3 mb-3')
                                .text(description).appendTo(card)
            }
        })
    })

    console.log(plansForThisCity)

   
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

            console.log('doc id: ' + doc.id)
            
            if (city.toLowerCase() === where.toLowerCase()) {
                let key = doc.id
                let newObj = {...obj.plan}
                plansForThisCity.push(newObj)

                for (let i = 2; i < obj.plan.length; i++) {
                    image = obj.plan[i].img
                    title = obj.plan[0]
                    description = obj.plan[1]
                }

                 // add to premade plans page
                let column = $('<div>')
                                .attr('class', 'col-sm-3').
                                appendTo('#premadeDiv')
                let card = $('<div>').
                                attr('class', 'card pre-made-card mb-3 mt-3')
                                .attr('style', 'width: 200px')
                                .appendTo(column)
                let img = $('<img>')
                                .attr('src', image)
                                .attr('style', 'height: 200px; width: 200px')
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
                let cardMoreInfo = $('<p>')
                                        .attr('class', 'card-text text-muted')
                                        .text('More info')
                                        .attr('id', 'more-info')
                                        .attr('data-key', key)
                                        .appendTo(card)
            }
        })
    })


    // $('#more-info').on('click', function() {
    //     db.collection('plans').doc($(this).attr('data-key')).get().then(function(plans) { 
    //         $.each(plans.data(), function(key, value){ 
    //             let plan = value
    //             $('#moreDetailModal').modal('show')
    //             $('#planTitle').html(plan[0])
    //             $('#planDesc').html(plan[1])
    //             console.log(plan)
                
                
    //             for(let i=2; i < value.length; i++) {
    //             $('<div>')
    //                 .attr('class', 'location')
    //                 // .attr()
    //                 .text(plan[i].name)
    //                 .appendTo($('#moreDetailBody'))
    //             $('<div>')
    //                 .attr('class', 'address text-muted m-2')
    //                 .html(plan[i].address)
    //                 .appendTo($('#moreDetailBody'))
    
    //             }   
    //         })
    //     })
    // })

    $(document).on('click', '#more-info', function() {
        db.collection('plans').doc($(this).attr('data-key')).get().then(function(plans) { 
            $.each(plans.data(), function(key, value){ 
                let plan = value
                $('#moreDetailModal').modal('show')
                $('#planTitle').html(plan[0])
                $('#planDesc').html(plan[1])
                console.log(plan)
                
                
                for(let i=2; i < value.length; i++) {
                $('<div>')
                    .attr('class', 'location')
                    // .attr()
                    .text(plan[i].name)
                    .appendTo($('#moreDetailBody'))
                $('<div>')
                    .attr('class', 'address text-muted m-2')
                    .html(plan[i].address)
                    .appendTo($('#moreDetailBody'))
    
                }   
            })
        })
    })

    console.log(plansForThisCity)

   
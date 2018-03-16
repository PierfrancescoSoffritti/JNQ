const detaultAction = (actor) => console.log("no action for this plan");

function Plan( action = detaultAction ) {
    //this.action = (actor) => { return buildPromiseFromAction(action, actor) }
    this.action = action;
}

// function buildPromiseFromAction(action, actor) {
//     const promise = new Promise( (resolve, reject) => {              
//         try {
//             action(actor);
//             resolve("Stuff worked!");
//         } catch(error) {
//             reject( Error("It broke") );
//         }
        
//     });

//     return promise;
// }

module.exports = Plan;
const detaultAction = () => console.log("no action for this plan");
const defaultFinalAction = (actor) => { };

function Plan( { action = detaultAction, finalAction = defaultFinalAction } ) {

    this.action = () => { return buildPromiseFromAction(action) }
    this.finalAction = (actor) => { return buildPromiseFromAction(finalAction, actor) }
}

function buildPromiseFromAction(action, actor) {
    const promise = new Promise( (resolve, reject) => {              
        try {
            action(actor);
            resolve("Stuff worked!");
        } catch(error) {
            reject( Error("It broke") );
        }
        
    });

    return promise;
}

module.exports = Plan;
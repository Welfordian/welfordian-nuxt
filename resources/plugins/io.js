import Ws from '@adonisjs/websocket-client'
import {eventBus} from "../eventBus";

let store;
let ReadAnalytics = false;
//const WriteAnalytics = Ws().connect().subscribe('write-analytics');

let setLoggedIn = (auth) => {
    let token = auth.$storage._state['_token.local'].replace('Bearer ', '');

    ReadAnalytics = Ws().withJwtToken(token).connect().subscribe('read-analytics');

    setReadSubscriptions();

    WriteAnalytics.on('error', (e) => {
        //console.log('Write', e);
    })
    ReadAnalytics.on('error', (e) => {
        //console.log('Not auth', e);
    })
};

let setLoggedOut = () => {
    ReadAnalytics.close();
    ReadAnalytics = false;
};

let setReadSubscriptions = () => {
    ReadAnalytics.on('analytics', (d) => {
        store.commit('dashboard/SET_CONNECTIONS', d.connections);
    })
};

let setRoute = (to) => {
    //WriteAnalytics.emit('routeChange', to);
};


// eventBus.$on('loggedIn', setLoggedIn);
// eventBus.$on('loggedOut', setLoggedOut);
// eventBus.$on('routeChange', setRoute);


export default (ctx) => {
    if (ctx.app.store.$auth.loggedIn) {
        store = ctx.app.store;

        setLoggedIn(ctx.app.store.$auth);
    }
};

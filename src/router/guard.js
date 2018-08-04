import apiConf from "../api/api.conf";
import {loginCheck} from "../api/user";
import store from "../store/vuex";

export function adminGuard(to, from, next) {

    // next();
    // return;

    //console.log('------------');
    //console.log(to, from);
    //console.log('------------');

    // loginCheck().then(resp=>{
    // 	console.log(resp.data);
    // });

    if (!store.state.user || !store.state.user.type) {
        loginCheck().then(resp => {
            console.log(resp.data);
            if (resp.data.code == apiConf.errorCode || !resp.data.data) {
                next('/404');
                return;
            }
            store.commit('setUser', resp.data.data);
            //store.state.user = resp.data.data;
            if (store.state.user.type != apiConf.superUserType) {
                next('/404');
            } else {
                next();
            }
        });
    } else {
        if (store.state.user.type != apiConf.superUserType) {
            next('/404');
        } else {
            next();
        }
    }

    // if (!store.state.user || store.state.user.type != apiConf.superUserType) {
    //        	next('/404');
    //    	} else {
    //        	next();
    //    	}
    //    next();

}
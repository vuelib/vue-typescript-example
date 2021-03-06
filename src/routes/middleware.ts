import {VueRouter} from "vue-router/types/router";
import {Route} from "vue-router";
import {AuthenticationService} from "../services/authentication/authentication-service";

export default function middleware (router: VueRouter) {
    router.beforeEach((to: Route, from: Route, next: Function) => {
        if (to.meta.title) {
            document.title = to.meta.title
        }

        if (to.matched.some(record => record.meta.requiresAuth) && !AuthenticationService.loggedIn) {
            next({ path: '/login' });
        } else {
            next();
        }
    });
}
import { createRouter, createWebHistory } from "vue-router";
import {nextTick} from "vue";
import {handleLoginCallback, useUserStore} from "../stores/user.js";
import eventhub from "raccoon-eventhub";
import {NavigationEvent} from "../events/NavigationEvent.js";

const base = new URL(document.baseURI).pathname

const path = (path) => {
    return base + path; // TODO slashes and stuff?
}


const router = createRouter({
    history: createWebHistory(base + "/"),
    routes: [
        {
            path: "/",
            name: "home",
            component: () => import("../views/Home.vue"),
        },
        {
            path: "/:realmId/",
            name: "realm",
            redirect: to => ({name: 'configuration', params: to.params}),
        },
        {
            path: "/:realmId/configuration/",
            name: "configuration",
            component: () => import("../views/Configuration.vue"),
            props: true,
        },
        {
            path: "/:realmId/clients/",
            name: "clients",
            component: () => import("../views/Clients.vue"),
            props: true,
        },
        {
            path: "/:realmId/users/",
            name: "users",
            component: () => import("../views/Users.vue"),
            props: true,
        },
        {
            path: "/:realmId/scopes-claims/",
            name: "scopes-claims",
            component: () => import("../views/ScopesAndClaims.vue"),
            props: true,
        },
        {
            path: "/auth/",
            name: "auth",
            beforeEnter:  async _ => {
                return await handleLoginCallback();
            } 
        },
        {
            path: "/user-settings/",
            name: "user-settings",
            component: () => import("../views/Home.vue")
        },
        /*{
            path: "/:pathMatch(.*)*",
            name: "NotFound",
            component: () => import("../views/NotFound.vue"),
        },*/
    ],
});
router.beforeEach(async (to, from) => {
    if (to.name !== 'auth') {
        const userStore = useUserStore();
        await userStore.login(to);
    }
})
router.afterEach((to, from) => {
    eventhub.notify(new NavigationEvent(from, to))
})

export default router;
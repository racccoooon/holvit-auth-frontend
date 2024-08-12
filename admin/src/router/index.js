import { createRouter, createWebHistory } from "vue-router";
import {nextTick} from "vue";
import {handleLoginCallback, useUserStore} from "../stores/user.js";

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
            path: "/auth",
            name: "auth",
            beforeEnter:  async _ => {
                return await handleLoginCallback();
            } 
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
        await userStore.login();
    }
})

export default router;
import { createRouter, createWebHistory } from "vue-router";

const base = new URL(document.baseURI).pathname

const path = (path) => {
    return base + path; // TODO slashes and stuff?
}


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: path("/"),
            name: "home",
            component: () => import("../views/Home.vue"),
        },
        {
            path: path("/:pathMatch(.*)*"),
            name: "NotFound",
            component: () => import("../views/NotFound.vue"),
        },
    ],
});

export default router;
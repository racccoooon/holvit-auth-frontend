import {defineStore} from "pinia";
import {UserManager} from "oidc-client-ts";
import router from "../router";


const mgr = new UserManager({
    authority: "http://localhost:8080/oidc/admin",
    client_id: "holvit_admin",
    scope: "openid profile email",
    redirect_uri: "http://localhost:8080/admin/auth"
});

export const useUserStore = defineStore("user", {
    state: () => ({
        user: null,
    }),
    actions: {
        async login(destination) {
            const user = await mgr.getUser();
            if (user !== null) {
                this.user = user;
            } else {
                await mgr.signinRedirect({
                    state: {
                        destination: destination,
                    }
                });
            }
        },
        async logout() {
            await mgr.signoutRedirect();
        },
        setUser(user) {
            this.user = user;
        }
    },
});

export async function handleLoginCallback() {
    const user = await mgr.signinRedirectCallback();
    const store = useUserStore();
    store.setUser(user);
    return user.state.destination;
}
import {UserManager} from "oidc-client-ts";


const mgr = new UserManager({
    authority: "http://localhost:8080/oidc/admin",
    client_id: "holvit_admin",
    scope: "openid profile email",
    redirect_uri: "http://localhost:8080/admin/auth"
});

export async function login(destination) {
    const user = await mgr.getUser();
    if (user === null) {
        await mgr.signinRedirect({
            state: {
                destination: destination,
            }
        });
    }
}

export async function logout() {
    await mgr.signoutRedirect();
}

export async function handleLoginCallback() {
    const user = await mgr.signinRedirectCallback();
    return user.state.destination;
}

export async function getUser() {
    return await mgr.getUser();
}
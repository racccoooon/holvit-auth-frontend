import {UserManager} from "oidc-client-ts";


export const login = async () => {
    await mgr.signinRedirect()
}

export const callback = async () => {
    await mgr.signinCallback()
}

export const getUser = async () => {
    return await mgr.getUser()
}

export const logout = async () => {
    await mgr.signoutRedirect()
}
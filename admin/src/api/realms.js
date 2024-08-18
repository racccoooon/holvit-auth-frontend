import {getUser} from "../stores/user.js";


export const findRealms = async () => {
    const user = await getUser();
    const response = await fetch(`${window.apiBase}/realms`, {
        headers: {
            'Authorization': `Bearer ${user.access_token}`,
        }
    });
    return await response.json().then(x => x.rows);
};
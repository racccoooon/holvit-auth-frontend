import {getUser} from "../stores/user.js";


export const useFindUsers = (realmName) => async ({currentPage, pageSize, searchText, sortBy, sortDirection}) => {
    const user = await getUser();
    const response = await fetch(`${window.apiBase}/realms/${realmName}/users?q=${searchText}&page=${currentPage}&pageSize=${pageSize}&sort=${sortBy}&dir=${sortDirection}`, {
        headers: {
            'Authorization': `Bearer ${user.access_token}`,
        }
    });
    return await response.json();
};
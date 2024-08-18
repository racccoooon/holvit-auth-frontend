import {getUser} from "../stores/user.js";


export const useFindUsers = (realmName) => async ({currentPage, pageSize, searchText, sortBy, sortDirection}) => {
    const user = await getUser();
    const url = new URL(`${window.apiBase}/realms/${realmName}/users`)
    if (currentPage != null) {
        url.searchParams.append('page', currentPage)
    }
    if (pageSize != null) {
        url.searchParams.append('pageSize', pageSize)
    }
    if (searchText != null) {
        url.searchParams.append('q', searchText)
    }
    if (sortBy != null) {
        url.searchParams.append('sort', sortBy)
        if (sortDirection != null) {
            url.searchParams.append('dir', sortDirection)
        }
    }
    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${user.access_token}`,
        }
    });
    return await response.json();
};
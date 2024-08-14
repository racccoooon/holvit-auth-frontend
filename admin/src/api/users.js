

export const useFindUsers = (realmName, jwt) => async ({currentPage, pageSize, searchText, sortBy, sortDirection}) => {
    const response = await fetch(`${window.apiBase}/realms/${realmName}/users?q=${searchText}&page=${currentPage}&pageSize=${pageSize}&sort=${sortBy}&dir=${sortDirection}`, {
        headers: {
            'Authorization': `Bearer ${jwt}`,
        }
    });
    return await response.json();
};
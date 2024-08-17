

export const useFindRealms = (jwt) => async () => {
    const response = await fetch(`${window.apiBase}/realms/`, {
        headers: {
            'Authorization': `Bearer ${jwt}`,
        }
    });
    return await response.json();
};
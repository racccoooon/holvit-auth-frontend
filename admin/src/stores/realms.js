import {defineStore} from "pinia";

export const useRealmStore = defineStore("realms", {
    state: () => ({
        realms: [
            {
                name: "admin",
                displayName: "Admin",
                id: "afe4b806-3447-418d-9cb1-497e4363b03b",
                numUsers: 10,
                numClients: 2,
            },
            {
                name: "demo",
                displayName: "Demo",
                id: "95e62753-a3ad-463d-a022-3387d9848aca",
                numUsers: 23912,
                numClients: 37,
            }
        ],
    })
});
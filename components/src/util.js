import {escape} from 'lodash'
let id = 0;
export function useId() {
    return `id${id++}`
}

export function markText(text, searches) {
    text = escape(text);
    
    if (!searches || searches.length === 0) {
        return text;
    }

    searches = searches.map(escape).map(x => x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));

    const regexPattern = new RegExp('(' + searches.join('|') + ')', 'gi')
    return text.replace(regexPattern, '<mark>$1</mark>');
}

export function splitSearch(search) {
    return search.split(' ').filter(x => x.length > 0)
}
import {escape} from 'lodash'
let id = 0;
export function useId() {
    return `id${id++}`
}

export function markText(text, searchText) {
    text = escape(text);
    
    if (!searchText) {
        return text;
    }
    
    searchText = escape(searchText);

    const escapedTerm = searchText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regexPattern = new RegExp(`(${escapedTerm})`, 'gi');
    return text.replace(regexPattern, '<mark>$1</mark>');
}
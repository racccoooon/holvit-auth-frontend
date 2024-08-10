
let id = 0;
export function useId() {
    return `id${id++}`
}

export function markText(text, searchText) {
    if (!searchText) {
        return text
    }

    const escapedTerm = searchText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regexPattern = new RegExp(`(${escapedTerm})`, 'gi');
    return text.replace(regexPattern, '<mark>$1</mark>');
}
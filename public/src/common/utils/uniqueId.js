export default function uniqueId(str) {
    return str + '_' + Math.random().toString(36).substr(str.length + 1, 9);
}
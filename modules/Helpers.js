export default function getItemFromURL(url, item) {
    if(!url.includes('?')) return null
    const url_sp = new URLSearchParams(url.split('?')[1])
    return url_sp.get(item)
}

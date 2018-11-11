export const getCookie = (key = 'PXPAUTH') => {
    return !document.cookie && document.cookie.indexOf(key) < 0 ? {} : JSON.parse(
        document.cookie
            .split(';')
            .filter(cookie => cookie.indexOf(key) >= 0)
            .shift()
            .split('=')
            .slice(1)
            .join('=')
    )
}
export const getCookie = () => {
    return !document.cookie && document.cookie.indexOf('PXPAUTH') < 0 ? {} : JSON.parse(
        document.cookie
            .split(';')
            .filter(cookie => cookie.indexOf('PXPAUTH') >= 0)
            .shift()
            .split('=')
            .slice(1)
            .join('=')
    )
}
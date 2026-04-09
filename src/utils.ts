export function themeColor(name: string): string {
    return getComputedStyle(document.documentElement)
        .getPropertyValue(name)
        .trim();
}

export function formatCensusTractId(tractId: string) {
    const tract = tractId.substring(0, 4).replace(/^0+/, '')
    const subTract = tractId.substring(4)
    if (subTract === '00') {
        return tract
    }
    return `${tract}.${subTract}`
}

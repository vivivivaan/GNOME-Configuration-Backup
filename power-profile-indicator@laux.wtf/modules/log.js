export function raw(text = "", e = null) {
    if (e !== null)
        logError(e, `power-profile-indicator: ${text}`);
    else {
        log(`power-profile-indicator: ${text}`);
    }
}
//# sourceMappingURL=log.js.map
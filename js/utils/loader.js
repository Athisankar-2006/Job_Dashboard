// js/utils/loader.js

/**
 * Show loading indicator
 * @param {HTMLElement} loaderEl
 */
export function showLoader(loaderEl) {
    loaderEl.classList.remove("hidden");
}

/**
 * Hide loading indicator
 * @param {HTMLElement} loaderEl
 */
export function hideLoader(loaderEl) {
    loaderEl.classList.add("hidden");
}
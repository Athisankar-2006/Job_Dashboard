// js/utils/errorHandler.js

/**
 * Show error message
 * @param {HTMLElement} errorEl
 * @param {string} message
 */
export function showError(errorEl, message = "Something went wrong.") {
    errorEl.textContent = message;
    errorEl.classList.remove("hidden");
}

/**
 * Hide error message
 * @param {HTMLElement} errorEl
 */
export function hideError(errorEl) {
    errorEl.classList.add("hidden");
}
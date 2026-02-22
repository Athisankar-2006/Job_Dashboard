// js/utils/storage.js

const SAVED_JOBS_KEY = "savedJobs";

/**
 * Get saved jobs from localStorage
 * @returns {Array}
 */
export function getSavedJobs() {
    return JSON.parse(localStorage.getItem(SAVED_JOBS_KEY)) || [];
}

/**
 * Save a job to localStorage
 * @param {Object} job
 */
export function saveJob(job) {
    const savedJobs = getSavedJobs();

    const exists = savedJobs.some(j => j.id === job.id);
    if (!exists) {
        savedJobs.push(job);
        localStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(savedJobs));
    }
}

/**
 * Remove job from localStorage
 * @param {number} jobId
 */
export function removeJob(jobId) {
    const updatedJobs = getSavedJobs().filter(job => job.id !== jobId);
    localStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(updatedJobs));
}

/**
 * Check if job is already saved
 * @param {number} jobId
 * @returns {boolean}
 */
export function isJobSaved(jobId) {
    return getSavedJobs().some(job => job.id === jobId);
}
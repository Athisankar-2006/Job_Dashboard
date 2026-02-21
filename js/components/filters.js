// js/components/filters.js

/**
 * Apply search and filter logic on jobs list
 * @param {Array} jobs - all jobs from API
 * @param {Object} filters - search & filter values
 * @returns {Array} filtered jobs
 */
export function filterJobs(jobs, filters) {

    const { searchText, location, type } = filters;

    return jobs.filter(job => {

        // Match search text (title + description)
        const matchSearch =
            job.title.toLowerCase().includes(searchText) ||
            job.description.toLowerCase().includes(searchText);

        // Match location
        const matchLocation =
            !location || job.location === location;

        // Match job type
        const matchType =
            !type || job.type === type;

        return matchSearch && matchLocation && matchType;
    });
}
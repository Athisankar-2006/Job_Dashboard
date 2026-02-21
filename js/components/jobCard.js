// js/components/jobCard.js

/**
 * Create a job card element
 * @param {Object} job - job data
 * @param {Function} onSave - callback for save button
 * @returns {HTMLElement}
 */
export function createJobCard(job, onSave) {

    const card = document.createElement("div");
    card.className = "job-card";

    // Badge class based on job type
    const typeClass = job.type.toLowerCase().replace(" ", "-");

    card.innerHTML = `
        <h2>${job.title}</h2>
        <p class="company">${job.company}</p>

        <div class="job-meta">
            <span>${job.location}</span>
            <span class="badge ${typeClass}">${job.type}</span>
            <span>${job.salary}</span>
        </div>

        <p class="job-desc">${job.description}</p>

        <div class="job-actions">
            <button class="save-btn">Save</button>
        </div>
    `;

    // Save button logic
    const saveBtn = card.querySelector(".save-btn");
    saveBtn.addEventListener("click", () => {
        onSave(job);
        saveBtn.classList.add("saved");
        saveBtn.textContent = "Saved";
    });

    return card;
}
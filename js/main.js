
import { filterJobs } from "./components/filters.js";
import { createJobCard } from "./components/jobCard.js";

// import the api fetched function from jobsapi.js file
import { fetchjobs } from ".api/jobsApi.js";

let locationChart;
let typeChart;


function getCountByKey(jobs, key) {
    const countMap = {};

    jobs.forEach(job => {
        countMap[job[key]] = (countMap[job[key]] || 0) + 1;
    });

    return countMap;
}



function renderCharts(jobs) {

    const locationData = getCountByKey(jobs, "location");
    const typeData = getCountByKey(jobs, "type");

    const locationCtx = document.getElementById("locationChart");
    const typeCtx = document.getElementById("typeChart");

    // Destroy old charts (important!)
    if (locationChart) locationChart.destroy();
    if (typeChart) typeChart.destroy();

    locationChart = new Chart(locationCtx, {
        type: "pie",
        data: {
            labels: Object.keys(locationData),
            datasets: [{
                data: Object.values(locationData)
            }]
        }
    });

    typeChart = new Chart(typeCtx, {
        type: "bar",
        data: {
            labels: Object.keys(typeData),
            datasets: [{
                data: Object.values(typeData)
            }]
        }
    });
}

// select dom events

const jobsContainer=document.getElementById("jobsContainer");
const loader=document.getElementById("loader");
const errorMessage=document.getElementById("errorMessage");


const searchInput=document.getElementById("searchInput");
const locationFilter=document.getElementById("locationFilter");
const typeFilter=document.getElementById("typeFilter");
const searchBtn=document.getElementById("searchBtn");


const totalJobsE1=document.getElementById("totalJobs");
const totalLocationsE1=document.getElementById("totalLocations");
const totalTypesE1=document.getElementById("totalTypes");



let allJobs = [];        // Stores all jobs from API
let filteredJobs = [];   // Stores jobs after filter/search



// Show loading indicator
function showLoader() {
    loader.classList.remove("hidden");
}

// Hide loading indicator
function hideLoader() {
    loader.classList.add("hidden");
}

// Show error message
function showError() {
    errorMessage.classList.remove("hidden");
}

// Hide error message
function hideError() {
    errorMessage.classList.add("hidden");
}


//render job cards
function renderJobs(jobs){
    //clears previous job
    jobsContainer.innerHTML="";

    //if no job found
    if(jobs.length===0){
        jobsContainer.innerHTML=`
        <div class="empty-state">
        <h2>No jobs found</h2>
        <p>try different search or filter option.</p>
        </div>
        `;
        return;
    }
    
    //loop through jobs and create cards
    jobs.array.forEach(job => {
        const jobcard=document.createElement("div");
        const card = createJobCard(job, handleSaveJob);
        jobcard.className="job-card";

        jobcard.innerHTML=`
        <h2>${job.title}</h2>
        <p class="company"> ${job.company}</p>

        <div class="job-meta">
        <span>${job.location}</span>
        <span>${job.type}</span>
        <span>${job.salary}</span>

        <p class="job-desc">${job.description}</p>

        <div class="job-action">
        <button class="save-btn">save</button>
        </div>
        `;

        jobsContainer.appendChild(jobcard);
        jobsContainer.appendChild(card);
    });
}



function updateStatus(jobs){
    //total jobs
    totalJobsE1.textContent=jobs.length;

    //unique location
    const locations=new Set(jobs.map(job=>job.location));
    totalLocationsE1.textContent=locations.size;

    //unique job types
    const types=new Set(jobs.map(job=>job.type));
    totalTypesE1.textContent=types.size;

}


//search and filter

function applyFliter(){
    const searchText=searchInput.ariaValueMax.toLowerCase();
    const selectedLocation=locationFilter.ariaValueMax.toLowerCase();
    const selectedTypes=typeFilter.ariaValueMax.toLowerCase();


    filteredJobs=allJobs.filter(job=>{
        const matchText=
        job.title.toLowerCase().includes(searchText)||
        job.description.toLowerCase().includes(searchText);

        const matchLocation=
        !selectedLocation||job.location===selectedLocation;


        const matchType=
        !selectedTypes|| job.type===selectedTypes;

        return matchText && matchLocation && matchType;
    })

     const filters = {
        searchText: searchInput.value.toLowerCase(),
        location: locationFilter.value,
        type: typeFilter.value
    };

    filteredJobs = filterJobs(allJobs, filters);

    renderJobs(filteredJobs);
    updateStatus(filteredJobs);
    renderCharts(filteredJobs);
}


//load job from api

async function loadJobs(){

    try{
        showLoader();
        showError();

        //fetch jobs
        allJobs=await fetchjobs();
        filteredJobs=allJobs;

        renderJobs(allJobs);
        updateStatus(allJobs);
        renderCharts(allJobs);
    }catch(error){
        showError();
    }finally{
        hideLoader();
    }
}


function handleSaveJob(job) {
    console.log("Saved job:", job.title);
}


//event handling
searchBtn.addEventListener("click",applyFliter);
searchInput.addEventListener("keyup",applyFliter);
locationFilter.addEventListener("change",applyFliter);
typeFilter.addEventListener("change",applyFliter);

loadJobs();
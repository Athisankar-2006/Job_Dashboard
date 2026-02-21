// import the api fetched function from jobsapi.js file
import { fetchjobs } from ".api/jobsApi.js";



// select dom events

const jobsContainer=document.getElementById("jobsContainer");
const loader=document.getElementById("loader");
const errorMessage=document.getElementById("errorMessage");


const searchInput=document.getElementById("searchInput");
const locationFilter=document.getElementById("locationFilter");
const typeFilter=document.getElementById("typeFilter");
const searchBtn=document.getElementById("searchBtn");


const totalJobs=document.getElementById("totalJobs");
const totalLocations=document.getElementById("totalLocations");
const totalTypes=document.getElementById("totalTypes");



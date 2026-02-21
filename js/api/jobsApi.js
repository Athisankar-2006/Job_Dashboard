const jobs_url= "data/mockjobs.json";


export async function fetchjobs(){
 try{
     if(!response.ok){
        const response=fetch(jobs_url);
        throw new console.error("can not fetch api");
    }

    const jobs=await response.json();
    return jobs;

   } 
catch(error){
    console.error("Api error: " ,error);
    throw error;
   }
}
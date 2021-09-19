import fs from 'fs';
import path from 'path';

//getting path and making const variable appending /data
const dataDirectory = path.join(process.cwd(), "data");

//internal function to retreive JSON object
function getJSONObj(){

  const filepath = path.join( dataDirectory, "persons.json" );
  const filepath2 = path.join( dataDirectory, "aka.json");
  // get json file contents
  const jsonString = fs.readFileSync(filepath, "utf8");
  //read second JSON file and make a string
  const jsonString2 = fs.readFileSync(filepath2, "utf8");

  //parse both into json objects
  const jsonObject1 = JSON.parse(jsonString);
  const jsonObject2 = JSON.parse(jsonString2);

  //concatenate into a single json object and return that
  return jsonObject1.concat(jsonObject2);
}

//function to return all id's for the json objects in the array
export function getAllIds(){

  const jsonObj = getJSONObj();

  return jsonObj.map(item => {
    return{
      params: {
        id: item.id.toString()
      }
    }
  });
}


//returns names and id's of all json objects in the array, sorted by name property
export function getSortedList(){
  
  const jsonObj = getJSONObj();
  //sort json by name property
  jsonObj.sort(function(a, b){
    return a.name.localeCompare(b.name);
  });
  //use map() to extract just name and id properties into new obj value array
  return jsonObj.map(item => {
    return{
      id: item.id.toString(),
      name: item.name
    }
  });
} // end getSortedList()

//async function to get data from one person object based on id
export async function getData(idRequested){
  
  const jsonObj = getJSONObj();

  //find object value in the array with a specific id
  //used by getStaticProps in [id].js
  const objMatch = jsonObj.filter(obj =>{
    return obj.id.toString() === idRequested;
  });
  //get single object value in filtered array if there is any
  let objReturned;

  if(objMatch.length > 0 ){
    objReturned = objMatch[0];
    }
    else {
      objReturned = {};
    }
  return objReturned;
}


//async function to get data from one person object based on name
export async function getAKA(akaRequested){
  
  const jsonObj = getJSONObj();
  // this was undefined, was not able to pull .aka property


  //find object value in the array with a specific id
  //used by getStaticProps in [id].js
  const objMatch = jsonObj.filter(obj =>{
    return obj.name.toString() === akaRequested;
  });
  //print to check what's going on


  //get single object value in filtered array if there is any
  let objReturned;

  if(objMatch.length > 0 ){
    objReturned = objMatch[0];
    }
    else {
      objReturned = {};
    }
  return objReturned;
}
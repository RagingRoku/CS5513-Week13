//filesystem package/module
import fs from 'fs';
//path
import path from 'path';

// use path to build a filepath to data subdirectory
//process.cwd() gets the whole path
// then join with the String "data"
const dataDirectory = path.join( process.cwd(), "data" );

//console.log(dataDirectory);
/* In this function we are:
completing filepath to data/persons.json and storing in variable
retreiving JSON Data, converting to object
sorting by "name" property in the JSON
returning the object to the page as a string

 */

export default function handler(req, res) {
  const filepath = path.join( dataDirectory, "persons.json" );

  const jsonData = fs.readFileSync( filepath, "utf8");

  const jsonObj = JSON.parse( jsonData );

  jsonObj.sort(
    function(a, b){
      return a.name.localeCompare(b.name);
    }
  );

  res.status(200).json( jsonObj );
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

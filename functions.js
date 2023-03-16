// imports uuid for the unique alphanumeric string
import {v4 as uuidv4} from 'uuid';
// import validator to check if the email is valid
import validator from 'validator';
// imports fs to write in .txt file
import fs from 'fs';

const generateUniqueID = (firstName, lastName) =>{
  let firstInit = firstName[0].toLowerCase(); // gets the first letter of the first name in lowercase
  let lastInit = lastName.toLowerCase(); // gets the lowercase version of the input last name
  let random = uuidv4(); // gets a unique alphanumeric string

  let uniqueID = firstInit.concat(lastInit, random.slice(0,8)); // concatenates lastInit and the first 8 characters of the alphanumeric string

  return uniqueID; // returns the combination
};

const addAccount = (inputArray) => {

  // for loop to check if the string inputs (names and email) are non-empty
  for(let i = 0; i < inputArray.length-1; i++){
    var check = false;
    if(typeof inputArray[i] === 'string' && inputArray[i].length > 0){
      var check = true; // 
    }else{
      var check = false;
      break;
    }
  }
  
  if(inputArray.length === 4){ // checks if there are 4 input parameters
    const [firstName, lastName, email, age] = inputArray; // to access the data easier

    if(!check){ // checks if there are empty strings, stops if there are/is, continues if there are non
      return false;
    }

    if(!validator.isEmail(email)){ // checks if the email is valid, stops if it's not
      return false;
    }
    
    if(typeof age !== 'number' || age < 18){ // checks if the inputted age is a number or age > 18, stops if not
      return false;
    }

    const id = generateUniqueID(firstName, lastName); // gets the unique ID using the firstName and lastName of the input
    const save = `${firstName},${lastName},${email},${age},${id}\n`; // gets all the values to get ready for storing
    fs.appendFileSync('users.txt', save); // stores the values in a txt file

    return true;
  }

  else{
    return false; 
  }
}

export {addAccount , generateUniqueID} // exports the addAccount function



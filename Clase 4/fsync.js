const fs = require('fs');

const date = Date().toLocaleString();


try {
    fs.writeFileSync("./fyh.txt", date)
  } 
catch (err) {
    console.log(err)
  }


try {
    const data = fs.readFileSync('./fyh.txt', 'utf-8')
    console.log(data);
  } 
catch (err) {
    console.log(err)
  }
  
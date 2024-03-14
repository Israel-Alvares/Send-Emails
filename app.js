const fs = require('fs');

// const nameContact = {};
// const emailContact = {};
const contacts = []

const csvFilePath = './contact/Divulgação - UTF 8.csv';

fs.readFileSync(csvFilePath, 'utf-8')
  .split('\n')
  .forEach(line => {
    // Separa os valores pelo ponto e vírgula
    const [email] = line.split(' ').map(value => value.trim());

    if (email) { // Ignora linhas vazias
      contacts.push(email)
    }
  });

  // let emailContact;
  // contacts.forEach((element) => emailContact.push(element))

// console.log(nameContact);
console.log(contacts);
// console.log(contacts[0]);
// console.log(emailContact);
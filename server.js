const nodemailer = require('nodemailer');
const fs = require('node:fs')

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  // secure: STARTTLS,
  // tls: { rejectUnauthorized: false },
  auth: {
    // TODO: replace `user` and `pass` values from your gmail
    user: "comunicacao.stps@ipb.org.br",
    pass: "Semon@23",
  },
});

async function main() {
  const message = `
CFO – Curso de Formação de Oficiais – 2024
https://seminariosimontonrj.com.br/formacao-oficiais/

16 disciplinas – Curso totalmente online – Investimento: 12 x de R$ 150,00
Voltado para presbíteros e diáconos e todo aquele que aspira ao oficialato, 
o curso foi pensado para qualificar nossos oficiais, trazendo o que há de mais relevante 
para o exercício ministerial diligente e piedoso. Na primeira parte, o curso capacitará 
o aluno nos Fundamentos de Constituição e Ordem da IPB, Panorama de História da IPB, 
Fundamentos de Liderança, Preparação de Estudos e Mensagens e Símbolos de Fé da IPB. 
Seguirá no segundo semestre fornecendo os fundamentos da Teologia Reformada, Interpretação Bíblica, 
Panoramas do Antigo e Novo Testamento, História da Igreja, Noções de Aconselhamento e Evangelização.

Inscreva-se já: https://seminariosimontonrj.com.br/formacao-oficiais/`

  const imageStream = fs.createReadStream('./images/Cartaz - Curso CFO.png'); /*'"\\wsl.localhost\Ubuntu\home\carlos\test\images\Cartaz - Curso CIT.png"'*/

  const csvFilePath = './contact/Divulgação - UTF 8.csv';

  const contacts = []

fs.readFileSync(csvFilePath, 'utf-8')
  .split('\n')
  .forEach(line => {
    // Separa os valores pelo ponto e vírgula
    const [email] = line.split(' ').map(value => value.trim());

    if (email) { // Ignora linhas vazias
      contacts.push(email)
    }
  });


  const attachments = {
    filename: 'Cartaz - Curso CFO', // Nome do arquivo anexo
    content: imageStream, // Conteúdo da foto
    encoding: 'base64', // Codificação da 
    contentType: 'image/png'
  }

  const mailOptions = {
    from: 'comunicacao.stps@ipb.org.br', // sender address
    to: contacts,
    subject: "CFO- Curso de Formação de Oficiais", // Subject line
    text: message, // plain text body
    attachments: [attachments]
  }
  // send mail with defined transport object
  const info = await transporter.sendMail(mailOptions)
  console.log("Message sent: %s", info.messageId);
}

main().catch(console.error);
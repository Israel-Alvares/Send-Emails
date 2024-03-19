import fastify from 'fastify';
import formBody from '@fastify/formbody';
import nodemailer from 'nodemailer';

const app = fastify({ logger: true })

app.register(formBody)

app.get('/', function (response, reply) {
  reply.send({ message: 'Funcionando!!!' })
})

app.post('/send-emails', async function (response, reply) {
  try {
    const { emails, message } = response.body

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
      // const attachments = {
      //   filename: 'Cartaz - Curso CFO', // Nome do arquivo anexo
      //   content: imageStream, // Conteúdo da foto
      //   encoding: 'base64', // Codificação da 
      //   contentType: 'image/png'
      // }

      const mailOptions = {
        from: 'comunicacao.stps@ipb.org.br', // sender address
        to: emails,
        subject: "CFO- Curso de Formação de Oficiais", // Subject line
        text: message, // plain text body
        // attachments: [attachments]
      }
      // send mail with defined transport object
      const info = await transporter.sendMail(mailOptions)
      console.log("Message sent: %s", info.messageId);
    }

    main().catch(console.error);
  } catch (error) {
    console.error(`Deu erro aqui: ${error}`)
  }

})

app.listen({ port: 3000 }).then(() => {
  console.log('HTTP server running!')
})
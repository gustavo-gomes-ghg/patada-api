
const nodemailer = require('nodemailer');
require('dotenv').config();

module.exports = sendWelcomeEmail;

async function sendWelcomeEmail( user = null, validation_code: string, email_type: string ) {

    if ( user === null ) {
        return;
    }

    // validation url
    const url = `https://patadadeurso.com.br/dashboard/#!/validacao-cadastro?utm_i=${validation_code}`;

    // Title and body message	          
    const title   = 'Patada de Urso - Seja bem vindo';
    let message   = `Este é um email automático gerado pela plataforma da Patada de Urso.<br><br>Você está recebendo este email pois o cadastro na plataforma foi realizado com sucesso.<br><br>Clique no link a seguir para confirmar o cadastro.<br><a href='${url}'>Confirmar cadastro!</a><br><br>Após a confirmação do cadastro mais algumas informações serão necessárias.<br><br><i><b>Seja bem vindo!</b></i>`;
                
    // $commando  = escapeshellcmd('python ' . __DIR__ . '/preSendEmail.py "Patada de Urso - Confirmação de Cadastro" "'.$titulo.'" "'.$mensagem.'" "'.$email.'" "confirmacao-cadastro"');
    // $resposta = system($commando);

    // atualiza o objeto com status de envio do email
    //$obj['status_envio_email'] = $resposta;


    var transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    var mailOptions = {
        from: process.env.EMAIL_EMAIL,
        to: user.email_usp,
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
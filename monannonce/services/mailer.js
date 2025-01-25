const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.MAILER_HOST,
  port: process.env.MAILER_PORT,
//   secure: process.env.MAILER_SECURE, // true for port 465, false for other ports
//   auth: {
//     user: process.env.MAILER_USERNAME,
//     pass: process.env.MAILER_PASSWORD,
//   },
});

async function mailer(
    from, // format : '"Maddison Foo Koch 👻" <maddison53@ethereal.email>'
    to, // format : "bar@example.com, baz@example.com"
    subject, // format : "Hello ✔"
    text, // format : "Hello world?"
    html // format : "<b>Hello world?</b>"
) {
    try {
        // send mail with defined transport object
        const info = await transporter.sendMail({
            from, // sender address
            to, // list of receivers
            subject, // Subject line
            text, // plain text body
            html // html body
        });

        //console.log("Message sent: %s", info.messageId);
        return true
    } catch(e) {
        return e
    }
}

module.exports = {
    mailer
};

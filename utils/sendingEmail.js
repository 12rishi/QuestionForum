const nodeMailer = require("nodemailer");
const sendEmail = async (data) => {
  let transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: "iamthapajack12@gmail.com",
      pass: "kzwgmysvlyfblnkv",
    },
  });
  let mailOptions = {
    from: "Rishi Thapa<rishithapa12@gmail.com>",
    to: data.email,
    subject: data.subject,
    text: data.text,
  };
  await transporter.sendMail(mailOptions);
};
module.exports = sendEmail;

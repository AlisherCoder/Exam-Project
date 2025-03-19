import nodemailer from "nodemailer";
import { totp } from "otplib";

totp.options = { step: 600, digits: 5 };
const transport = nodemailer.createTransport({
   service: "gmail",
   auth: {
      user: "sidiqjonyusufjanov7@gmail.com",
      pass: "dhwj ofzg kswh ybzf",
   },
});

async function sendMail(email) {
   try {
      const sekretKey = process.env.OTPKEY || "otpsecret";
      let otp = totp.generate(sekretKey + email);

      await transport.sendMail({
         to: email,
         subject: "One time password",
         text: `Code for verify account <h1>${otp}</h1>`,
      });

      return otp;
   } catch (error) {
      console.log(error.message);
   }
}

export default sendMail;

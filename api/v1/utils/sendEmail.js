const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config({ path: "../.env" });
const sender = process.env.emailName;
const password = process.env.emailPassword;

/**
 * Creates a nodemailer transporter for sending confirmation emails.
 */
const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  auth: {
    user: sender,
    pass: password,
  },
  host: "smtp.gmail.com",
});

/**
 * Sends a confirmation email to the receiver's email address.
 * @param {string} receiverEmail - The email address of the receiver.
 * @returns {Promise} A promise that resolves when the email is sent successfully, or rejects with an error.
 * @author Yaekob Demisse
 */

exports.confirmEmail = (recieverEmail) => {
  const mailOptions = {
    from: sender,
    to: recieverEmail,
    subject: "Confirm Your Email Address for Fenote",
    html: `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
            }
  
            h1 {
              color: #333;
            }
  
            p {
              margin-bottom: 20px;
            }
  
            a {
              display: inline-block;
              padding: 10px 20px;
              background-color: #28a1d1;
              color: #fffafa;
              text-decoration: none;
              border-radius: 10px;
            }
          </style>
        </head>
        <body>
          <h1>Confirm Your Email Address for Fenote</h1>
          <p>
            Thank you for registering with our service! To complete the registration process and activate your account, please confirm your email address by clicking the link below:
          </p>
          <a href="http://localhost:3333/api/v1/confirm?email=${encodeURIComponent(
            recieverEmail
          )}">Confirm Email Address</a
          <p>
            By confirming your email address, you will gain full access to our platform and enjoy all the benefits it offers.
          </p>
          <p>
            If you did not create an account or have received this email in error, please disregard it.
          </p>
          <p>
            Thank you for choosing our service!
          </p>
          <p>
            Best regards,<br>
            Fenote Edu
          </p>
        </body>
      </html>
    `,
  };
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
};

/**
 * Sends a password reset verification email to the specified email address.
 * @param {string} email - The email address of the user requesting the password reset.
 * @returns {Promise} A promise that resolves when the email is sent successfully, or rejects with an error.
 * @author Yaekob Demisse
 */
exports.resetingRequest = (email) => {
  const mailOptions = {
    from: sender,
    to: email,
    subject: "Password Reset Verification",
    html: `
    <html>
  <head>
    <meta charset="UTF-8">
    <title>Password Reset Verification</title>
    <style>
      body {
        background-color: #f5f5f5;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 16px;
        line-height: 1.5;
        margin: 0;
        padding: 0;
      }

      .container {
        margin: auto;
        max-width: 600px;
        padding: 20px;
      }

      .heading {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 20px;
      }

      .text {
        margin-bottom: 20px;
      }

      .button {
        background-color: #007bff;
        border: none;
        border-radius: 4px;
        color: #fff;
        cursor: pointer;
        display: inline-block;
        font-size: 16px;
        font-weight: bold;
        padding: 12px 24px;
        text-align: center;
        text-decoration: none;
        transition: background-color 0.2s ease-in-out;
      }

      .button:hover {
        background-color: #0060b6;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1 class="heading">Password Reset Verification</h1>
      <p class="text">
        Hi, 
        You recently requested to reset your password. To complete this process, please click the button below to verify your email address.
      </p>
      <a class="button" href="http://localhost:3333/api/v1/verifiedrequest?email=${encodeURIComponent(
        email
      )}">Verify Email</a>
      <p class="text">
        If you did not request a password reset, you can ignore this email and your account will remain secure.
      </p>
      <p class="text">
        Thank you,<br>
        The Fenote Team
      </p>
    </div>
  </body>
  </html>
    `,
  };
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
};

const errorNotification = (
  staffName,
  transactionId,
  description
) => `<html lang="en">
  <head>
    <title>Bank ATM Banking</title>
    <style>
      body {
        font-family: "Poppins", Verdana, Geneva, Tahoma, sans-serif;
        position: relative;
        height: 100%;
        font-size: 1.2rem;
      }
      .container {
        width: fit-content;
        max-width: 80%;
        margin: 2rem auto;
        background-color: #537188;
        color: white;
        padding: 4rem;
      }
      h1,
      h4,
      span {
        color: #e1d4bb;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>😢 Oops Another Failed Transaction</h1>
      <p>Hi ${staffName}!</p>
      <p>
        The transaction with ID <span>${transactionId}</span> failed with a
        <span>${description}</span> error at the ATM.
      </p>
      <p>Kindly look into it ASAP.</p>

      <br />
      <p>Fast, Reliable and Affordable <span>Banking</span> You can Trust</p>
    </div>
  </body>
</html>
          
          `;

const loginNotification = (username) => `
  <head>
    <title>Bank ATM Banking</title>
    <style>
      body {
        font-family: "Poppins", Verdana, Geneva, Tahoma, sans-serif;
        position: relative;
        height: 100%;
        font-size: 1.2rem;
      }
      .container {
        width: fit-content;
        max-width: 80%;
        margin: 2rem auto;
        background-color: #537188;
        color: white;
        padding: 4rem;
      }
      h1,
      h4,
      span,
      a {
        color: #e1d4bb !important;
      }
      a {
        text-decoration: none;
      }
      a:hover {
        color: #c2993a;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Bank ATM Banking</h1>
      <p>Hello ${username}</p>
      <p>We noticed a new login to your account.</p>

      <h4>If this was you</h4>
      <p>You can ignore this message. There's no need to take action</p>

      <h4>If this wasn't you</h4>
      <p>Someone may have access to your password, and or PIN.</p>
      <p>Complete these steps to secure your account:</p>
      <ul>
        <li>
          Reset your password.
          <ul>
            <li>
              Head over to the
              <a href="${process.env.bank_interface_url}/forgot-password"
                >Forgot password</a
              >
              page.
            </li>
            <li>Key in your email address</li>
            <li>A reset link will be sent to you</li>
          </ul>
        </li>
        <li>Check for any unauthorised transactions.</li>
        <li>You may also reset your pin.</li>
      </ul>
    </div>
  </body>
  </html>
  `;

const registrationNotification = (username) => `
  <head>
    <title>Bank ATM Banking</title>
    <style>
      body {
        font-family: "Poppins", Verdana, Geneva, Tahoma, sans-serif;
        position: relative;
        height: 100%;
        font-size: 1.2rem;
      }
      .container {
        width: fit-content;
        max-width: 80%;
        margin: 2rem auto;
        background-color: #537188;
        color: white;
        padding: 4rem;
      }
      h1,
      h4,
      span {
        color: #e1d4bb;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Welcome to Bank ATM Banking 🎉</h1>
      <p>Congratulations ${username}!</p>
      <p>Your account was created successfully.</p>

      <br />
      <p>Fast, Reliable and Affordable <span>Banking</span> You can Trust</p>
    </div>
  </body>
</html>
  `;

const resetPasswordNotification = (username, token) => `
  <head>
    <title>Bank ATM Banking | Password Reset</title>
    <style>
      body {
        font-family: "Poppins", Verdana, Geneva, Tahoma, sans-serif;
        position: relative;
        height: 100%;
        font-size: 1.2rem;
      }
      .container {
        width: fit-content;
        max-width: 80%;
        margin: 2rem auto;
        background-color: #537188;
        color: white;
        padding: 4rem;
      }
      h1,
      h4,
      span,
      a {
        color: #e1d4bb !important;
      }
      a {
        text-decoration: none;
      }
      a:hover {
        color: #c2993a;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Password Reset - Bank ATM Banking</h1>
      <p>Hi ${username}</p>
      <p>We received a password reset request for your account.</p>

      <h4>If this was not you</h4>
      <p>You can ignore this message. There's no need to take action</p>

      <h4>If this was you</h4>
      <p>
        Click
        <a href="${process.env.bank_interface_url}/password-reset?token=${token}"> here</a> to
        enter your new password.
      </p>
      <p>The link expires in 15 minutes.</p>
    </div>
  </body>
</html>
  `;

module.exports = {
  errorNotification,
  loginNotification,
  registrationNotification,
  resetPasswordNotification,
};

// utils/templates/otpTemplate.js

const otpTemplate = (name, OTP) => {
  return `
    <div style="font-family: Arial, sans-serif; background:#f9f9f9; padding:30px; text-align:center;">
      <!-- لوجو -->
      <div style="margin-bottom:20px;">
        <img src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png" alt="Logo" width="80" />
      </div>

      <div style="background:#fff; padding:20px; border-radius:10px; box-shadow:0 2px 8px rgba(0,0,0,0.1); max-width:500px; margin:auto;">
        <h2 style="color:#333;">Welcome, ${name} 🎉</h2>
        <p style="color:#555; font-size:16px;">Thank you for signing up! Please verify your email using the OTP below:</p>

        <div style="margin:20px 0; padding:15px; background:#007BFF; color:#fff; font-size:22px; font-weight:bold; border-radius:8px; display:inline-block;">
          ${OTP}
        </div>

        <p style="font-size:14px; color:#777;">⚠️ This OTP will expire in <b>10 minutes</b>.</p>

        <p style="margin-top:20px; color:#555;">If you didn’t request this, please ignore this email.</p>
      </div>

      <div style="margin-top:30px; font-size:12px; color:#aaa;">
        © ${new Date().getFullYear()} Your Company. All rights reserved.
      </div>
    </div>
  `;
};

module.exports = otpTemplate;

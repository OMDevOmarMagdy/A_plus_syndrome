const sendmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"A+ Syndrome" <${process.env.EMAIL_FROM}>`,
      to,
      subject,
      text,
    });

    console.log("✅ Email sent:", info.response);
    return info;
  } catch (err) {
    console.error("❌ Error in sendmail:", err.message);
    throw err;
  }
};

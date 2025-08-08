function verifyEmailTemplate(name, url) {
  return `
    <h2>Hi ${name},</h2>
    <p>Thank you for registering.</p>
    <p>Please click the link below to verify your email:</p>
    <a href="${url}">Verify Email</a>
  `;
}

module.exports = verifyEmailTemplate;



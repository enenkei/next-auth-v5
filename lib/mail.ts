import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `${domain}/auth/new-verification?token=${token}`;

    await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        // to: [email],
        to : ['enenkei257@gmail.com'],
        subject: 'Confirm your email',
        html: `<p>Welcome!&nbsp;Click&nbsp;<a href="${confirmLink}">Here</a>&nbsp;to confirm</p>
      </div>`
    });
}

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `http://localhost:3000/auth/reset-password?token=${token}`;

  await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      // to: [email],
      to : ['enenkei257@gmail.com'],
      subject: 'Reset your password',
      html: `<p>Welcome!&nbsp;Click&nbsp;<a href="${resetLink}">Here</a>&nbsp;to reset password</p>
    </div>`
  });
}
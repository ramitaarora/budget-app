import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import db from '../../../db/connection';

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", required: true },
        password: {  label: "Password", type: "password", required: true }
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        const [results] = await db.query(
          'SELECT * FROM users WHERE email = ? AND password = ?', 
          [email, password]
        );

        if (results.length > 0) {
          const user = results[0];
          return { id: user.id, name: user.name, email: user.email };
        } else {
          return null;
        }
      }
    })
  ],
  session: {
    jwt: true,
  },
  pages: {
    signIn: '/auth/signin',
  }
});
import jwt from 'jsonwebtoken';

export const generateAuthToken = (data)=>{
    try {

        const { username,email} = data;
        const payload = { username,email };
        // Generate a JWT with your secret key
        const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });
        return token;
      } catch (error) {
        console.error('Error verifying ID token:', error.message);
        return error.message;
      }
}
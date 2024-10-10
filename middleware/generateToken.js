import jwt from 'jsonwebtoken';

export const generateAuthToken = (data)=>{

  const { _id,username,email } = data;
  const payload = { _id,username,email };
  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: process.env.TOKEN_EXPIRE });
  
  if(!token){
    throw new Error(token)
  }
  return {"Token":token};

}
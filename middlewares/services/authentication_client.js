const { response } = require('express');
const  {grpc, protoLoader } = require('.');

const packageDef = protoLoader.loadSync("authentication.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const authenticationPackage = grpcObject.authenticationPackage;
const urls = require("../../config/hosts.json");

const client = new authenticationPackage.Authenticate(urls.services.authentication, grpc.credentials.createInsecure());

exports.protect = async(req, res, next) => {

  const auth_header = req.headers.authorization;
  if (auth_header === undefined) {
    res.status(401).json({
      error: "token not provided"
    })
  }
  token = auth_header.split(" ")[1];

  //  CHECK IF TOKEN IS PRESENT
  if(!auth_header.startsWith("Bearer") && (token === null)) {

  }
  //  MAKE CALL TO AUTHENTICATE SERVICIE:
  //  PROVIDE TOKEN AND GET THE USER FROM SERVICE
  await authenticateUserWithToken(token)
    .then(res => {
      req.user = res;
    })
    .catch(err => console.log(err))
  
  next();
}

exports.authenticateGoogleUser = (newUser) => {

  return new Promise((resolve, reject) => {
    client.authenticateUserWithGoogle(newUser, (error, response) => {
      if (error) {
        reject(error);
      }
      resolve(response)
    })
  });
}

//  HELPER PROMISE FUNCTION

const authenticateUserWithToken = (tokenId) => {
  return new Promise((resolve, reject) => {
    client.authenticateUser({ tokenId }, (error, response) => {
      if (error) {
        reject(error)
      }
      resolve(response)
    })
  })
}
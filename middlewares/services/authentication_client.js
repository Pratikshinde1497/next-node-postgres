const  {grpc, protoLoader } = require('.');

const packageDef = protoLoader.loadSync("authentication.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const authenticationPackage = grpcObject.authenticationPackage;
const urls = require("../../config/hosts.json");

const client = new authenticationPackage.Authenticate(urls.services.authentication, grpc.credentials.createInsecure());

exports.protect = (req, res, next) => {
  const id = req.headers.authorization.split(' ')[1];

  client.authenticateUser({ id }, (err, res)=> {
    if ((!err) && (Object.keys(res).length !==0)) {
      req.user = res
      next();
    }
    else return next(new Error("invalid token: 401"));
  })
}

exports.authenticateGoogleUser = (newUser) => {
  client.authenticateUserWithGoogle(newUser, (err, res) => {
    if (!err) {
      return {err: null, res};
    }
    else return {err, res: null}; 
  })
}


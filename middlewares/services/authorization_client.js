const { grpc, protoLoader } = require(".");

const packageDef = protoLoader.loadSync("authorize.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const authorizePackage = grpcObject.authorizePackage;
const urls = require("../../config/hosts.json")

const client = new authorizePackage.Authorize(urls.services.authorization, grpc.credentials.createInsecure());

exports.authorize = (...roles) => {
  return (req, res, next) => {
    client.authorizeUser({ user: req.user, allowedRoles: roles}, (err, res)=> {
      if(!err) {
        if (!res.allowed) {
          return next(new Error("no access: 403"));
        }
        next();
      }
      else return next(new Error("server error: 500"))
    })
  }
}

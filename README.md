 ## ***Prerequisites***
* [postgreSQL database installed on system](https://www.postgresql.org/download/)
* [pgAdmin dbms system (optional)](https://www.pgadmin.org/download/)
* [Postman to call APIs (recommended)](https://www.postman.com/downloads/)
* Create ```next-node-postgre``` database 

 ## ***Installations***

 > run command   ```npm install``` or
 > ```npm install grpc @grpc/proto-loader nodemon cors sequelize passport passport-google-oauth20 pg pg-hstore sequelize-cli express express-session jsonwebtoken dotenv```


 ## ***Commands To Execute***

```
 - production:   node  server.js
 - development:  npm run dev
```

 ## ***APIs***

 > - _LOGIN OR REGISTER THROUGH GOOGLE OAUTH_ :  **GET**        {{url}}/api/v1/auth/google
  
  #### WITH ABOVE API WE CAN GET A JWT TOKEN, WITH THAT WE CAN ACCESS PROTECTED ROUTES MENTIONED BELOW.
  ##### TOKEN HAS TO BE PASSED THROUGH THE AUTHORIZATION HEADER.

 > - _GET ALL TUTORIALS_                      :  **GET**        {{url}}/api/v1/tutorials
 > - _GET TUTORIAL BY ID_                     :  **GET**        {{url}}/api/v1/tutorials/:id
 > - _ADD TUTORIAL_                           :  **POST**       {{url}}/api/v1/tutorials
 > - _UPDATE TUTORIAL BY ID_                  :  **PUT**        {{url}}/api/v1/tutorials/:id
 > - _DELETE TUTORIAL BY ID_                  :  **DELETE**     {{url}}/api/v1/tutorials/:id



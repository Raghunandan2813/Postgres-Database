import dotenv  from "dotenv";
import express from "express";
import {Client} from "pg";
dotenv.config(); 
const app = express();
app.use(express.json());
const pgClient = new Client({
    connectionString : process.env.POSTGRES_URI ,
    ssl :{
           rejectUnauthorized: false
    }
})



async function main(){             // this is async function it will take time to connect database it is presen somewhere on other machine
    await pgClient.connect();     
    const response = await pgClient.query("SELECT *FROM users;")
    //console.log(response);
    
    console.log(response.rows);
}


app.post('/signup' , async (req , res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email
    try{
         const insertQuery = `INSERT INTO users (username , password , email) VALUES (s1, s2, s3);`
        
         const response = await pgClient.query(insertQuery , [username , password, email])

     //    const insertQuery = `INSERT INTO users (username , email , password) VALUES ('${username}', '${email}', '${password}')`


   // const response = await pgClient.query(insertQuery);

    res.json({
        messege : "You have signed up"
    })
    }catch(e){
        res.json({
            messege: "Error while signing up!"
        })
    }
   
})

main()
app.listen(3000)
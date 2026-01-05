
const express=require("express");
const app=express();
const path=require("path");
const mysql = require('mysql2');
const { faker } = require('@faker-js/faker');
const meathodOverride=require("method-override");

app.use(meathodOverride("_method"));

app.use(express.urlencoded({extended:true}));




app.set("views engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public/styles")));

let port=8080;


app.listen(port,()=>{
  console.log(`server is running on port ${port}`);

});
// home route ;
app.get("/",(req,res)=>{
  try{
    let q="SELECT count(*) FROM users";
    connection.query(q,(err,results)=>{
      if(err) throw err;
      let data= results[0]["count(*)"];
      res.render("home.ejs",{data});
    });
  }catch(err){
    console.log("error in database query ");
  }
});

// users route
app.get("/users",(req,res)=>{
    try{
      let q= "SELECT * FROM users";
      connection.query(q,(err,results)=>{
        if(err) throw err;
      //  res.send(results);
        let allUsers=results;
      res.render("users.ejs",{allUsers});
      });  
    }catch(err){
      console.log("error in database query ");
    }
});

// update route 99
app.get("/users/:id/edit",(req,res)=>{

let {id}=req.params;
try{
  let q="SELECT * FROM users WHERE id=?";
  let us=[id+""];

  connection.query(q,[us],(err,results)=>{{
    if(err) throw err;
    let  user=results[0];
    res.render("edit.ejs",{user});
  }});
}catch(err){
  console.log("error in database query ");
}

});
// PATCH update 
app.patch("/users/:id",(req,res)=>{
  let {id}=req.params;
  let {username}=req.body;

 try{
  let q= "SELECT * FROM users WHERE id = ?";
  let us=[id+""];
  connection.query(q,[us],(err,results)=>{
    if(err) throw err;
    if(results[0]["Password"]!=req.body.password){
      res.send("Incorrect password");
    }
    else{
          try{
            let q0="UPDATE users SET name=? WHERE id=?";
            let u0=[username+"",id+""];
            connection.query(q0,u0,(err,results)=>{
              if(err) throw err;
              res.redirect("/users");
            });
          }catch(err){
            console.log("error in database query ");
          }
    }
   
  });
 }catch(err){
  console.log("error in database query ");
 }

});
// new form

app.get("/users/new",(req,res)=>{
  res.render("newUser.ejs");
});
// posting
app.post("/users/post",(req,res)=>{
  let {username,email,password}=req.body;
  try{
    let q="INSERT INTO users  VALUES (?,?,?,?)";
  let u=[faker.string.uuid()+"",username+"",email+"",password+""];
  connection.query(q,u,(err,results)=>{
    if(err) throw err;
    res.redirect("/users");
  });
}catch(err){
  console.log("error in database query ");

}
});
//-------------------------------------------------------------------------------->>


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'deltaApp',
  password:"Agent#116"
});
// quert--------------------->
try{
  let q="SHOW TABLES";
connection.query(q,(err, results)=>{
  if(err) throw err;
    console.log(results); // results contains rows returned by server
    
  }
)}catch(err){
    console.log("error in database query ");

};
// get delete
app.get("/users/:id/delete",(req,res)=>{
  let {id}=req.params;
  try{
    let q="SELECT * FROM users WHERE id=? ";
    let us=[id+""];
    connection.query(q,us,(err,results)=>{
      if(err) throw err;
      let user=results[0];
      res.render("delete.ejs",{user});

    });
  }catch(err){
    console.log("error in database query ");
  }

});
// deleting a user

app.delete("/users/:id",(req,res)=>{
  let {id}=req.params;
  let {password}=req.body;
 
  try{
    let q="SELECT * FROM users WHERE id=?";
    let us=[id+""];
    connection.query(q,us,(err,results)=>{
      if(err) throw err;  
      if(results[0]["Password"]!=password){
        res.send(password,results[0]["Password"]);
    console.log(password,results[0]["Password"]); 
      }
      else{
        try{
          let qo="DELETE FROM users WHERE id=?";
          let uo=[id+""];

          connection.query(qo,uo,(err,results)=>{
            if(err) throw err;
            res.redirect("/users");
          } );
        }catch(err){
          console.log("error in database query ");
        }
      }
    });
    

}catch(err){

console.log("error in database query ");  
}

});

// 2nd query
// try{
//   let q="INSERT INTO users VALUES ?";
//   let user=[ 
//      ["10ben1023","BEN23_ULTIMATE","BEN23@GMAIL.COM","benjiam hero tensson"],
//     ["10classioc","BEN10_classic","BEN10_10classic@GMAIL.COM","benjiam 10 tensson"],
//   ];

// connection.query(q,[user],(err, results)=>{
//   if(err) throw err;
//     console.log(results); // results contains rows returned by server
    
//   }
// )}catch(err){
//     console.log("error in database query ");

// };

//

//3rd query
// try{
//   let q="INSERT INTO users VALUES ?";
//   let user=[];

//   for(let i=0;i<100;i++){
//     user.push(createRandomUser());
//   };

// connection.query(q,[user],(err, results)=>{
//   if(err) throw err;
//     console.log(results); // results contains rows returned by server
    
//   }
// )}catch(err){
//     console.log("error in database query ");

// };


// inserting into buulk using facker js
function createRandomUser() {
  return [
     faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
   faker.internet.password(),
    
  ];
};

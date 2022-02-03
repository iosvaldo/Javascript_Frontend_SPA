const express = require("express");
const req = require("express/lib/request");
const path =require("path");

const app = express();
// const port =  3001;
const port = process.env.PORT || 3001;

app.use( express.static( "frontend/static" ) );

app.get("/*", (req, res) => {  
  res.sendFile(path.resolve(__dirname, "frontend","index.html"));
});

app.listen(port, ()=> console.log("express server is running" + port));

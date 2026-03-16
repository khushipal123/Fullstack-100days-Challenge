const express = require("express");
const app = express();
app.use(express.json());
app.listen(3000,()=>{
   console.log("Server is Runnig ....")
})

//Rest Api ...
// create note by post api...
const notes = []
app.post("/post",(req,res)=>{
     notes.push(req.body);
    res.json({
        Message :"Post Data Successfully..."
        ,
        notes
    });
    
});
// fetch the data... on server
app.get("/get",(req,res)=>{
    res.send(notes);
});
// DELETE - note delete...
app.delete("/notes/:id", (req, res) => {
   delete notes[req.params.id]
  res.json({ message: "Note deleted!", notes });
});

//Uptade the complelete database...
app.put("/put/:id", (req, res) => {
  notes[req.params.id].notes = req.body.notes;
  res.json({ Message: "Put the data..." , notes});
});

//Update the part of data...
app.patch("/patch/:id", (req, res) => {
  notes[req.params.id].description = req.body.description;
  res.json({ Message: "Patched the data..." ,
    notes
  });
});

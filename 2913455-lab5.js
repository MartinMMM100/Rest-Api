    const express = require('express');
    const app = express();
    const PORT = 3000;

    app.use(express.json());

    // Your routes here

    let books = [];
    app.get("/whoami",(req,res) => {

        res.status(200).send({studentNumber:"2913455"});
    });

    app.get("/books",(req,res) =>{
        res.status(200).send(books);
    });

    app.get("/books/:id",(req,res) =>{
        const book = books.find(b => b.id === req.params.id)
        if(!book){res.status(404).send({"error":"Book not found"});return;};
        res.status(200).send(book);
    })

    app.post("/books",(req,res) =>{
        if(!req.body || !req.body.id || !req.body.title || !req.body.details){
            res.status(400).send({"error": "Missing required fields"});
            return;
        }
        book = req.body;
        books.push(book);
        res.status(201).send(book);
    });

    app.put("/books/:id",(req,res) =>{
        const book = books.find(b => b.id === req.params.id)
        if(!book){res.status(404).send({"error":"Book not found"});return;};
       
        book.title = req.body.title;
        res.status(200).send(book);
    });

    app.delete("/books/:id",(req,res) =>{
        const book = books.find(b => b.id === req.params.id)
        if(!book){res.status(404).send({"error":"Book not found"});return;};
        
        const index = books.indexOf(book);
        books.splice(index,1);
        res.status(200);
    });

    
    app.post("/books:id/details",(req,res) =>{
        const book = books.find(b => b.id === req.params.id)
        if(!book){res.status(404).send({"error":"Book not found"});return;};
        
        book.details.push(req.body);
        res.status(201).send(book);
    });

    app.delete("/books/:id/details/:detailId",(req,res) =>{
        const book = books.find(b => b.id === req.params.id)
        if(!book){res.status(404).send({"error":"Book or detail not found"});return;};

        const detail = book.details.find(d => d.id === req.params.detailId)
         if(!detail){res.status(404).send({"error":"Book or detail not found"});return;};
        
        const index = books.details.indexOf(detail);
        books.details.splice(index,1);
        res.status(200);
    });


    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });


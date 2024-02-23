import express from "express";
import bodyParser from "body-parser";


const app = express();
const port = 3000;

let postArray = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


function Post(title, content){
    this.title = title;
    this.content = content;
    this.rawDate = new Date();
    this.date = this.rawDate.toLocaleString();


}       

function addNewPost(title, content){
    let post = new Post(title, content);
    postArray.push(post);
}


// Delete Post
function deletePost(index) {
    postArray.splice(index, 1);
}

// Edit Post
function editPost(index, title, content) {
    postArray[index] = new Post(title, content);
}


app.get("/", (req, res) => {
    res.render("index.ejs", {postArray: postArray});
});

app.get("/viewPost/:id", (req, res) => {
    let index = req.params.id;
    res.render("viewPost.ejs", {postId: index, postArray: postArray});
}); 


app.post("/delete", (req, res) => {
    let index = req.body["postId"];

    deletePost(index);
    res.redirect("/");

});

app.get("/edit/:id", (req, res) => {
    let index = req.params.id;
    res.render("create.ejs", {postId: index, postArray: postArray});
});

app.post("/update", (req, res) => {
    let title = req.body["title"];
    let content = req.body["post"];
    let index = req.body["index"];
    editPost(index, title, content);
    res.redirect("/");
});


app.get("/createPost", (req, res) => {
    res.render("create.ejs");
});


app.post("/submit", (req, res) => {
    let blogTitle = req.body["title"];  
    let blogPost = req.body["post"];

    addNewPost(blogTitle, blogPost);

    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
    addNewPost("Post Number 1", "Hello there");
    addNewPost("Post Number 2", "blah blah blah blah blah");
  });
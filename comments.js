// Create web server
// 1. Load express module
const express = require('express');
const app = express();
// 2. Load body-parser module
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
// 3. Load mongoose module
const mongoose = require('mongoose');
// 4. Connect to MongoDB
mongoose.connect('mongodb://localhost/comments');
// 5. Create Schema
const commentSchema = new mongoose.Schema({
    username: String,
    comment: String
});
// 6. Create Model
const Comment = mongoose.model('Comment', commentSchema);
// 7. Set view engine
app.set('view engine', 'ejs');
// 8. Create route
app.get('/', (req, res) => {
    Comment.find({}, (err, comments) => {
        if (err) {
            console.log(err);
        } else {
            res.render('index', { comments: comments });
        }
    });
});
app.post('/add', (req, res) => {
    const newComment = new Comment({
        username: req.body.username,
        comment: req.body.comment
    });
    newComment.save((err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});
// 9. Start server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
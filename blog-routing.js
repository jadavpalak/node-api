const express = require('express');
const blogRouting = express.Router();

let Blog = require('./blog.model');

blogRouting.route('/add').post(function (req, res) {
    let blog = new Blog(req.body);
    blog.save()
        .then(blog => {
            res.status(200).json({ 'blog': 'blog addded successfully' });
        })
        .catch(err => {
            res.status(400).send("something went wrong..!!");
        });
});

blogRouting.route('/edit/:id').get(function (req, res) {
    let id = req.params.id;
    Blog.findById(id, function (err, blog) {
        res.json(blog);
    });
});
blogRouting.route('/all').get(function (req, res) {
    Blog.find(function (err, blog) {
        res.json(blog);
    });
});

module.exports = blogRouting; 
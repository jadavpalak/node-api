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
    let page = parseInt(req.query.page) ;
    let limit = parseInt(req.query.limit);
    if (page < 0 || page === 0) {
        response = { "error": true, "message": "invalid page number, should start with 1" };
        return res.json(response)
    }
    var name = req.query.sortName;
    var order = 1;
    if(req.query.sortOrder=='desc'){
        order = -1;
    }
    let filter = req.query.search;
    var filterQuery = {}; 
    var sort = { name: order };
    var query = {};
    query.skip = limit * (page - 1);
    query.limit = limit;
    query.sort = sort;
    var filterQuery = {};
    if (filter != '') {
        filter = JSON.parse(filter);
        if ('name' in filter) {
            console.log(filter.name.value);
            filterQuery.name = new RegExp(filter.name.value);
        }
        if ('email' in filter) {
            filterQuery.email = new RegExp(filter.email.value);
        }
        if ('description' in filter) {
            filterQuery.description = new RegExp(filter.description.value);
        }
    };
    Blog.countDocuments(filterQuery, function (err, totalCount) {
        if (err) {
            response = { "error": true, "message": "Error fetching data" }
        }
        Blog.find(filterQuery, {}, query, function (err, data) {
            if (err) {
                console.log(err);
                response = { "error": true, "message": "Error fetching data" };
            } else {
                response = { items: data, total: totalCount };
            }
            res.json(response);
        })
    });
});

module.exports = blogRouting; 
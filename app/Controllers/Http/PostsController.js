'use strict'

const Post = use('App/Models/Post')

class PostsController {
    list() {
        return Post.query().orderBy('id', 'DESC').fetch()
    }
}

module.exports = new PostsController()

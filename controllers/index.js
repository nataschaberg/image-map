const ProfileController = require("./ProfileController")
const PostController = require("./PostController")
const CommentController = require("./CommentController")

module.exports = {

    post: PostController,
    comment: CommentController,
    profile: ProfileController

}

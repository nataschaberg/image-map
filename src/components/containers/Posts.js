import React, { Component } from "react"
import { APIManager } from "../../utils"
import { connect } from "react-redux"
import actions from "../../actions"
import { CreatePost } from "../view"

class Posts extends Component {


    componentDidMount() {
        const currentLocation = this.props.posts.currentLocation
        this.props.fetchPosts(currentLocation)
    }


    componentDidUpdate() {
        // console.log("component did update ")
        if(this.props.posts.list == null){
            const currentLocation = this.props.posts.currentLocation
            this.props.fetchPosts(currentLocation)
        }

    }


    submitPost(post){
        const user = this.props.account.user
        if(user == null){
            alert("please sign up to submit")
            return
        }
        //here we add user info from account reducer to posts
        post["profile"] = {
            id: user.id,
            username: user.username
        }

        const currentLocation = this.props.posts.currentLocation
        //this set up is required by Mongo for geo search
        post["geo"] = [
            currentLocation.lat,
            currentLocation.lng
        ]
        // console.log("submitPost in posts before dispatch: ", JSON.stringify(post))
        this.props.createPost(post)
    }


    render() {
        const list = this.props.posts.list //can be null {list} set to null initial in reducer
        return(
            <div>
                <CreatePost onCreate={this.submitPost.bind(this)}/>
                <div class="table-wrapper">
                    <table class="alt">
                        <tbody>
                            { (list == null) ? null : list.map((post, i) => {
                                    return(
                                        <tr key={post.id}>
                                            <td><img style={{width:60}} src={post.image}/></td>
                                            <td>{post.caption}</td>
                                            <td>{post.profile.username}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

const stateToProps = (state) => {
    return {
        posts: state.post,
        account: state.account
    }
}

const dispatchToProps = (dispatch) => {
    return {
        fetchPosts: (params) => dispatch(actions.fetchPosts(params)),
        createPost: (params) => dispatch(actions.createPost(params))
    }
}

export default connect(stateToProps, dispatchToProps)(Posts)

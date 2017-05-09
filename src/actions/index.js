import constants from "../constants"
import { APIManager } from "../utils"

export default {


    signup: (params) => {
        return (dispatch) => {
            APIManager
            .post("account/register", params)
            .then(response => {
                dispatch({
                    type: constants.CURRENT_USER_RECEIVED,
                    user: response.user
                })
            })
            .catch((err) => {
                console.log("Error action signup: ", err)
            })
        }
    },

    login: (params) => {
        return (dispatch) => {
            APIManager
            .post("account/login", params)
            .then(response => {
                // console.log("im in login actions", JSON.stringify(response))
                dispatch({
                    type: constants.CURRENT_USER_RECEIVED,
                    user: response.user
                })
            })
            .catch((err) => {
                // console.log("Error action login: ", err.message)
                alert(err.message)
            })
        }
    },

    checkCurrentUser: () => {
        return (dispatch) => {
            APIManager
            .get("account/currentuser", null)
            .then(response => {
                // console.log("im in check currentuser ", JSON.stringify(response))
                dispatch({
                    type: constants.CURRENT_USER_RECEIVED,
                    user: response.user
                })
            })
            .catch((err) => {
                console.log("Error action checkcurrentUser: ", err)
            })
        }
    },

    updateCurrentLocation: (location) => {
        return {
            type: constants.CURRENT_LOCATION_CHANGED,
            location: location
        }
    },


    createPost: (params) => {
        return (dispatch) => {
            APIManager
            .post("api/post", params)
            .then(response => {
                console.log("response action createPost", JSON.stringify(response))
                dispatch({
                    type: constants.POST_CREATED,
                    post: response.result
                })
            })
            .catch((err) => {
                console.log("Error action createPost: ", err)
            })
        }
    },


    fetchPosts: (params) => {
        return (dispatch) => {

            APIManager
            .get("/api/post", params)
            .then((response) => {
                console.log("Response in action: ", JSON.stringify(response));
                dispatch({
                    type: constants.POSTS_RECEIVED,
                    posts: response.results
                })
            })
            .catch((err) => {
                console.log("Error in get ajax POST: ", err)
            })
        }
    },

    postsReceived: (posts) => {
        return {
            type: constants.POSTS_RECEIVED,
            posts: posts
        }
    }

}

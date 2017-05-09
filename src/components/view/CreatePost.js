import React, { Component } from "react"
import Dropzone from "react-dropzone"
import sha1 from "sha1"
import { APIManager } from "../../utils"

class CreatePost extends Component {
    constructor(){
        super()
        this.state = {
            post: {
                image: "",
                caption: ""
            }
        }

    }

    updatePost(event) {
        event.preventDefault()
        // console.log("the post is: ", event.target.value)
        let updated = Object.assign({}, this.state.post)
        updated[event.target.id] = event.target.value
        this.setState({
            post: updated
        })
    }


    submitPost() {
        event.preventDefault()
        // console.log("submit post: ", this.state.post)
        if(this.state.post.image.length == 0) {
            alert("Please add an image first")
            return
        }
        if(this.state.post.caption.length == 0) {
            alert("Please add an image first")
            return
        }
        let updated = Object.assign({}, this.state.post)
        this.props.onCreate(updated)
    }


    imageSelected(files){
        const image = files[0]
        console.log("upload image")
        const cloudName = "YOUR_CLOUD_NAME" //check in cloudinary
        const url = "https://api.cloudinary.com/v1_1/" +cloudName+ "/image/upload"
        const timestamp = Date.now()/1000
        const uploadPreset = "YOUR_PRESET"
        const paramsStr = "timestamp="+timestamp+"&upload_preset="+uploadPreset+"YOUR_API_SECRET"
        const signature = sha1(paramsStr)

        const params = {
            "api_key": "YOUR_API_KEY",
            "timestamp": timestamp,
            "upload_preset": uploadPreset,
            "signature": signature
        }

        APIManager.uploadFile(url, image, params)
        .then((uploaded) => {
            console.log("Uploaded file: ", JSON.stringify(uploaded))
            let updated = Object.assign({}, this.state.post)
            updated["image"] = uploaded["secure_url"]
            this.setState({
                post: updated
            })
        })
        .catch((err) => {
            console.log("ERROR in API post image ", err)
        })


    }



    render() {
        return(
            <div>
                <h2>Create Post</h2>
                <div className="row">
                    <div className="3u 12u$(small)">
                        <Dropzone onDrop={this.imageSelected.bind(this)} style={{border:"none"}}>
                            <button className="button special small">Add Image</button>
                        </Dropzone>
                    </div>
                    <div className="9u 12u$(small)">
                        <input id="caption" style={{marginLeft:2}} onChange={this.updatePost.bind(this)} type="text" placeholder="Caption" />
                    </div>
                </div>
                    <br />
                    <button className="button special" style={{float:"right"}} onClick={this.submitPost.bind(this)} >Submit</button>
                    <br />
                    <hr />
            </div>
        )
    }
}


export default CreatePost

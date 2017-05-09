import React, { Component } from "react"
import { GoogleMapLoader, GoogleMap } from "react-google-maps"

class Map extends Component {
    constructor(){
        super()
        this.state = {
            map: null
        }
    }

    mapDragged(){
        var latLng = this.state.map.getCenter().toJSON()
        // console.log("map was dragged", JSON.stringify(latLng))
        this.props.mapMoved(latLng)
    }

    render() {
        const mapContainer = <div style={{minHeight: 800, height: "100%", width: "100%"}}></div>


        return(
            <GoogleMapLoader
                containerElement = { mapContainer }
                googleMapElement = {
                    <GoogleMap
                        ref={ (map) => {
                                if(this.state.map != null)
                                    return
                                this.setState({map: map})
                            }
                        }
                        defaultZoom={this.props.zoom}
                        defaultCenter={this.props.center}
                        onDragend={this.mapDragged.bind(this)}>
                    </GoogleMap>
                } />
        )
    }

}

export default Map

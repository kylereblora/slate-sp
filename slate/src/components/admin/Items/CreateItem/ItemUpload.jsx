import React, { Component } from 'react'
import { Button, Progress } from 'semantic-ui-react'
import { storage } from '../../../../firebase/index'

export class ItemUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image : null,
            url : '',
            progress: 0
        }
    }

    handleUploadChange = (e) => {
        if(e.target.files[0]) {
            const image = e.target.files[0];
            this.setState({image})
        }
    }

    handleUpload = (e) => {
        const { image } = this.state;
        const uploadTask =  storage.ref(`items/${image.name}`).put(image);

        uploadTask.on('state_changed', 
            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                this.setState({progress})
            },
            (error) => { 
                console.log(error) 
            },
            () => {
                storage.ref('items')
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        this.setState({url});
                    })
                    .then(() => {
                        this.props.callbackFromParent(this.state.url);
                    })
            }
        )
        
    }

    render() {
        return (
            <div>
                <Progress percent={this.state.progress} size="small" inverted progress indicating />
                <input type="file" onChange={this.handleUploadChange}/>
                <Button color="orange" onClick={this.handleUpload}>Upload</Button>
                {/* <img src={this.state.url || 'http://via.placeholder.com/400x300'} alt={"uploaded image"} /> */}
            </div>
        )
    }
}

export default ItemUpload

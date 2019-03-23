import React, { Component } from 'react'
import { Button, Progress, Icon } from 'semantic-ui-react'
import { storage } from '../../../../firebase/index'
import './itemupload.css'
import { signUpBtn } from '../../../../assets/styles/styles';

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
        if(this.state.image !== null) {
            const { image } = this.state;
            const uploadTask =  storage.ref(`${this.props.store}/${image.name}`).put(image);

            uploadTask.on('state_changed', 
                (snapshot) => {
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    this.setState({progress})
                },
                (error) => { 
                    console.log(error) 
                },
                () => {
                    storage.ref(`${this.props.store}`)
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
        
    }

    render() {
        return (
            <div className="item-upload-main">
                <div className="item-upload-input">
                    <input type="file" accept="image/*" onChange={this.handleUploadChange}/>
                    <Button style={signUpBtn} onClick={this.handleUpload}>Upload</Button>
                </div>
                {
                    this.state.progress === 100 ?
                    <Progress  percent={100} size="small" inverted success />
                    :
                    
                    <div>
                        {
                            this.state.progress === 0 ?
                            null
                            :
                            <Progress  percent={this.state.progress} size="small" inverted indicating />
                        }
                    </div>
                    
                }
            </div>
        )
    }
}

export default ItemUpload

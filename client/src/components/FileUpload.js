import React, { Fragment, useState } from 'react';
import { Form, FormGroup, Label, Input, FormText, Button } from 'reactstrap';
import axios from 'axios';
import Message from './Message';
import Progress from './Progress';

const FileUpload = () => {
    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Choose your video file');
    const [uploadedFile, setUploadedFile] = useState({});
    const [message, setMessage] = useState('');
    const [uploadPercentage, setUploadPercentage] = useState(0);

    const onChange = e => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    }

    const onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axios.post('/api/items', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: progressEvent => {
                    setUploadPercentage(parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total)))
                    // Clear percentage
                    setTimeout(() => setUploadPercentage(0), 10000);
                }
            });

            const { fileName, filePath } = res.data;

            setUploadedFile({ fileName, filePath });

            setMessage('File uploaded');
        } catch(err) {
            if(err.response.status === 500) {
                setMessage('There was a problem with the server');
            } else {
                setMessage(err.response.data.msg);
            }
        }
    }

    return (
        <Fragment>
            { message ? <Message msg={message} /> : null}
            <Form onSubmit={onSubmit}>
                <FormGroup className="custom-file mb-4">
                    <Input type="file" name="custom-file-input" id="customFile" onChange={onChange} />
                    <Label className="custom-file-label" htmlFor="customFile">{filename}</Label>
                    <FormText color="muted" className="mt-2">
                    {filename}
                    </FormText>
                </FormGroup>
                <FormGroup>
                    <Progress percentage={uploadPercentage} />
                    <Button
                        type="submit"
                        value="Upload"
                        className="btn btn-primary btn-block mt-2 mb-4"
                    >
                        Submit
                    </Button>
                </FormGroup>
            </Form>
            { uploadedFile ? <div className="row mt-5">
                <div className="col-md-6 m-auto">
                    <h3 className="text-center">{ uploadedFile.fileName }</h3>
                    <img style={{ width: '100%'}} src={uploadedFile.filePath} alt="" />
                </div>
            </div> : null }
        </Fragment>
    )
}

export default FileUpload;

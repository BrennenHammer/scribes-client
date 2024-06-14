import { useState } from 'react';
import { post } from '../services/authService';
import { photoService } from '../services/photoService';

function AddPost({ onClose }) {
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [feedback, setFeedback] = useState('');  
    const [disabled, setDisabled] = useState(false);    
    const [imagePreviewUrl, setImagePreviewUrl] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        post('/feed', { file, description })
            .then(response => {
                console.log("new post", response.data);
                setIsLoading(false);
                setDescription('');  
                setFile(null);       
                setFeedback('Successfully uploaded!');
                setImagePreviewUrl(''); // Clear image preview after submission
            })
            .catch(error => {
                setIsLoading(false);
                setFeedback('Error occurred. Please try again.');
            });
    };

    const handleFileChange = (e) => {
        setDisabled(true);
        const selectedFile = e.target.files[0];
        
        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviewUrl(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }

        photoService(e)
            .then((response) => {
                setFile(response.data.image);
                setDisabled(false);
            })
            .catch((err) => {
                console.log(err);
                setDisabled(false);
            });
    };

    return (
        <>
            <div className="backdrop" onClick={onClose}></div>
            <div className="add-post-page">
                <button className="exit-button" onClick={onClose}>X</button>
                <h2 className='storyp'>Add A New Story!</h2>
                <form onSubmit={handleSubmit}>
                    <textarea 
                        placeholder="Describe Your Story..."
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input 
                        type="file" 
                        onChange={handleFileChange} 
                        accept="image/*,video/*"
                    />
                    {imagePreviewUrl && (
                        <div>
                            <img src={imagePreviewUrl} alt="Image Preview" width="200" />
                        </div>
                    )}
                    <button disabled={disabled} type="submit">Post</button>
                </form>
                {feedback && <p>{feedback}</p>}
                {isLoading && <p>Loading...</p>}
            </div>
        </>
    );
}

export default AddPost;

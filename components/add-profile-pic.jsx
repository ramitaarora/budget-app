import { useState } from 'react';

export default function ProfilePictureSelector({ modalVisibility, setModalVisibility, saveProfilePicture }) {
    const [selectedPicture, setSelectedPicture] = useState('');

    const profilePictures = [
        '/images/profile-pics/blank.png',
        '/images/profile-pics/woman2.png',
        '/images/profile-pics/woman3.png',
        '/images/profile-pics/woman4.png',
        '/images/profile-pics/woman5.png',
        '/images/profile-pics/woman6.png',
        '/images/profile-pics/woman7.png',
        '/images/profile-pics/man.png',
        '/images/profile-pics/man2.png',
        '/images/profile-pics/man3.png',
        '/images/profile-pics/man4.png',
        '/images/profile-pics/man5.png',
        '/images/profile-pics/man7.png',
        '/images/profile-pics/astronaut.png',
        '/images/profile-pics/bear.png',
        '/images/profile-pics/dog.png',
        '/images/profile-pics/dog2.png',
        '/images/profile-pics/duck.png',
        '/images/profile-pics/hippo.png',
        '/images/profile-pics/meerkat.png',
        '/images/profile-pics/rabbit.png',
        '/images/profile-pics/unicorn.png',
        '/images/profile-pics/weasel.png',
    ];

    const handlePictureSelect = (picture) => {
        setSelectedPicture(picture);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (selectedPicture) {
            saveProfilePicture(selectedPicture);
            closeModal();
        } else {
            alert('Please select a profile picture.');
        }
    };

    const closeModal = () => {
        setModalVisibility('hidden');
    };

    return (
        <div className={"modal-background " + modalVisibility}>
            <div className="modal">
                <div className="modal-content">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" onClick={closeModal} className="exit">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0-.708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                    </svg>
                    <form onSubmit={handleSubmit}>
                        <h2>Select Profile Picture</h2>
                        <div className="modal-form">
                            <div className="modal-form-line">
                                <div className="grid grid-cols-4 gap-4">
                                    {profilePictures.map((picture, index) => (
                                        <div
                                            key={index}
                                            className={`cursor-pointer border rounded-lg overflow-hidden hover:shadow-md ${selectedPicture === picture ? 'border-blue-500' : ''
                                                }`}
                                            onClick={() => handlePictureSelect(picture)}
                                        >
                                            <img
                                                src={picture}
                                                alt={`Profile ${index + 1}`}
                                                className="w-12 h-12"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="text-black py-2 px-4 mt-4 mx-2 rounded hover:bg-blue-400 hover:text-white">
                            Save
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
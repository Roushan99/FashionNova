import { useState } from 'react';
import { Select, Flex, Icon, useDisclosure } from "@chakra-ui/react";
// import { ChevronDownIcon } from "@chakra-ui/icons";

import pic1 from "../assets/quickcomputerImages/enhanced/img0.jpg"
import pic2 from "../assets/quickcomputerImages/enhanced/img2.jpg"
import pic3 from "../assets/quickcomputerImages/enhanced/img3.jpg"
import pic4 from "../assets/quickcomputerImages/enhanced/img4.jpg"
import pic5 from "../assets/quickcomputerImages/enhanced/img7.jpg"
import pic6 from "../assets/quickcomputerImages/enhanced/img6.jpg"
import pic7 from "../assets/quickcomputerImages/enhanced/img5.jpg"
import pic8 from "../assets/quickcomputerImages/enhanced/img8.jpg"
import pic9 from "../assets/quickcomputerImages/enhanced/img9.jpg"




// Dummy data for photos and videos
const photos = [
    { src: pic1, alt: 'Photo 1' },
    { src: pic2, alt: 'Photo 2' },
    { src: pic3, alt: 'Photo 3' },
    { src: pic4, alt: 'Photo 4' },
    { src: pic5, alt: 'Photo 5' },
    { src: pic6, alt: 'Photo 6' },
    { src: pic7, alt: 'Photo 7' },
    { src: pic9, alt: 'Photo 9' },
    { src: pic8, alt: 'Photo 8' },


];

const videos = [
    { src: 'https://via.placeholder.com/600x400?text=Video+1', alt: 'Video 1' },
    { src: 'https://via.placeholder.com/600x400?text=Video+2', alt: 'Video 2' },
    { src: 'https://via.placeholder.com/600x400?text=Video+3', alt: 'Video 3' },
];

const MediaGallery = () => {
    const [galleryType, setGalleryType] = useState('photos'); // 'photos' or 'videos'
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    const handleOpenModal = (item) => {
        setModalContent(galleryType === 'photos' ? (
            <img src={item.src} alt={item.alt} className="w-full h-auto max-w-4xl mx-auto" />
        ) : (
            <video src={item.src} controls className="w-full h-auto max-w-4xl mx-auto">
                Your browser does not support the video tag.
            </video>
        ));
        setModalOpen(true);
    };




    const { isOpen, onToggle } = useDisclosure();
    const [isArrowTilted, setArrowTilted] = useState(false);

    const handleToggle = () => {
        onToggle();
        setArrowTilted(!isArrowTilted);
    };


    return (
        <div className="container mx-auto px-4 py-8">


            <Flex align="center">
                <Select
                    placeholder="Select option"
                    isOpen={isOpen}
                    onClick={handleToggle}
                    onBlur={() => setArrowTilted(false)}
                    style={{ WebkitAppearance: "none", MozAppearance: "none", appearance: "none", paddingRight: "2rem" }} // Apply custom styles to remove default arrow
                >
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                </Select>
                {/* <Icon
                    as={ChevronDownIcon}
                    ml="-25px"
                    boxSize="20px"
                    transform={isArrowTilted ? "rotate(180deg)" : ""}
                /> */}
            </Flex>




            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Our Gallery</h1>
                <div className="flex justify-center gap-4 mb-6">
                    <button
                        className={`px-4 py-2 rounded-lg ${galleryType === 'photos' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
                        onClick={() => setGalleryType('photos')}
                    >
                        Photo Gallery
                    </button>
                    <button
                        className={`px-4 py-2 rounded-lg ${galleryType === 'videos' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
                        onClick={() => setGalleryType('videos')}
                    >
                        Video Gallery
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {(galleryType === 'photos' ? photos : videos).map((item, index) => (
                    <div key={index} className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer" onClick={() => handleOpenModal(item)}>
                        <img src={item.src} alt={item.alt} className="w-full h-auto transform hover:scale-110 transition-transform duration-300 ease-in-out" />
                    </div>
                ))}
            </div>
            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
                    <div className="bg-white p-5 rounded-lg shadow-xl">
                        {modalContent}
                        <button onClick={() => setModalOpen(false)} className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition">
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MediaGallery;
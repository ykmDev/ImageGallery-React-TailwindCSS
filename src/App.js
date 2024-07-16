import { useState, useEffect } from 'react';
import ImageCard from './components/ImageCard';
import ImageSearch from './components/ImageSearch';

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState('');

  useEffect(() => {
    fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API}&q=${term}+flowers&image_type=photo`)
      .then(response => response.json())
      .then(data => {
        setImages(data.hits);
        setIsLoading(false);
      })
      .catch(error => console.error(error));
  }, [term]);

  return (
    <>
    <h1 className='font-bold text-3xl text-center mt-5'>Image Gallery</h1>
    <div className="container mx-auto">
      <ImageSearch searchText={(text) => setTerm(text)} />
      {isLoading ? <h1 className="text-6xl text-center mx-auto mt-32">Loading...</h1> :
        <div className="grid grid-cols-3 gap-4">
          {images.map(image => (
            <ImageCard key={parseInt(image.id) + Math.floor(Math.random() * 10000000)} image={image} />
          ))}
        </div>}
    </div>
    </>
  );
}

export default App;

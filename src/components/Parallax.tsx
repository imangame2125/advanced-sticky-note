import image1 from '../assets/images/image-1.png';
import image2 from '../assets/images/image-2.png';
import image3 from '../assets/images/image-3.png';
import image4 from '../assets/images/image-4.png';
import image5 from '../assets/images/image-5.png';
import SimpleGallery from './SimpleGallery';

export default function Parallax() {
  const images = [image1, image2, image3, image4, image5];

  return (
    <div className="" id="example ">
      <SimpleGallery images={images} />
    </div>
  );
}

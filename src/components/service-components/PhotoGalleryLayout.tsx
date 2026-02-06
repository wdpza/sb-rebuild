import ServicesPhotosMasonry from "./ServicesPhotosMasonry";
import ServicesSliderPhoto from "./ServicesSliderPhoto";

export default function PhotoGalleryLayout({ slide, backgroundImage, layout }: any) {
    const style = layout[0] || 'masonry';
    if (style === 'slider') {
        return <ServicesSliderPhoto slide={slide} />;
    }
    
    return <ServicesPhotosMasonry slide={slide} backgroundImage={backgroundImage} />;
}

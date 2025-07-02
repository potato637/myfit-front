interface ImageDisplayProps {
  imageUrl?: string;
  alt?: string;
  className?: string;
}

function ImageDisplay({
  imageUrl,
  alt = "이미지",
  className = "",
}: ImageDisplayProps) {
  return (
    <div className={`overflow-hidden ct-center ${className} `}>
      <img src={imageUrl} alt={alt} className="w-full h-full object-cover" />
    </div>
  );
}
export default ImageDisplay;

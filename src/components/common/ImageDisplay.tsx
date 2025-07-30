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
    <div className={` ct-center ${className} `}>
      <img src={imageUrl} alt={alt} className="w-full h-auto object-contain" />
    </div>
  );
}
export default ImageDisplay;

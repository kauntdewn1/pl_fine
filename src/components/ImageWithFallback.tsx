import { useState } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
}

export function ImageWithFallback({ src, alt, fallbackSrc, className = '' }: ImageWithFallbackProps) {
  const [error, setError] = useState(false);

  const handleError = () => {
    setError(true);
  };

  return (
    <img
      src={error ? (fallbackSrc || '/placeholder.jpg') : src}
      alt={alt}
      className={className}
      onError={handleError}
      loading="lazy"
    />
  );
} 
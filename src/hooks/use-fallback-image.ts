import { useState } from 'react';

/**
 * A custom hook to handle image loading with fallback
 * @param fallback The fallback content to display if the image fails to load
 * @returns An object with the error state and error handler function
 */
export function useFallbackImage() {
  const [hasError, setHasError] = useState(false);
  
  const handleError = () => {
    setHasError(true);
  };
  
  return {
    hasError,
    handleError
  };
}
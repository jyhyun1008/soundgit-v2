import Image from "next/image"
import { useState, useEffect } from "react"

export default function ImageWithFallback({
    fallback = fallbackImage,
    alt,
    src,
    ...props
  }) {
    const [error, setError] = useState(null)
  
    useEffect(() => {
      setError(null)
    }, [src])
  
    return (
      <Image
        alt={alt ? alt : 'alt'}
        onError={setError}
        width={256}
        height={256}
        src={error ? fallback : src}
        {...props}
      />
    )
  }
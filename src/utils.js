
import { VALID_FILE_TYPES } from "./rise-video";

export function getVideoFileType( url ) {
  const urlLowercase = url.toLowerCase();
  const fileType = VALID_FILE_TYPES.find( fileType => {
    if ( urlLowercase.endsWith( `.${fileType.toLowerCase()}` ) ) {
      return fileType;
    }
  });

  return fileType ? `video/${fileType}` : undefined;
}

export function getAspectRatio( width = 0, height = 0 ) {
  let divisor;

  if ( width === 0 && height === 0 ) {
    return "0:0";
  }

  function greatestCommonDivisor( a, b ) {
    return ( b == 0 ) ? a : greatestCommonDivisor( b, a % b );
  }

  divisor = greatestCommonDivisor( width, height );

  return width / divisor + ":" + height / divisor;
}

export function clampNumber( value, min, max ) {
  return Math.max( Math.min( value, max ), min ); // Clamp volume to 0-100 range
}
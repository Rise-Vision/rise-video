
import { VALID_FILE_TYPES } from "./rise-video";

export function getVideoFileType( url ) {
  const urlLowercase = url.toLowerCase();

  return VALID_FILE_TYPES.find( fileType => {
    if ( urlLowercase.endsWith( `.${fileType.toLowerCase()}` ) ) {
      return "video/" + fileType;
    }
  });
}

export function getAspectRatio( width, height ) {
  let divisor;

  function greatestCommonDivisor( a, b ) {
    return ( b == 0 ) ? a : greatestCommonDivisor( b, a % b );
  }

  divisor = greatestCommonDivisor( width, height );

  return width / divisor + ":" + height / divisor;
}


export function getRightOfStringSlice(str) {

  const lastDotIndex = str.lastIndexOf('.');

  if (lastDotIndex !== -1) {
    return str.slice(lastDotIndex + 1);
  } else {
    return '';
  }
}

export function overloadImages(number) {
  if (number < 8) {
    return false;
  } else {
    return true;
  }
}



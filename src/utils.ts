function ellipsisText(text: string, length = 35){
  let limitedText = text.substring(0, length);
  if (text.length > length) {
    limitedText += '...';
  }

  return limitedText
    
}

export {ellipsisText}
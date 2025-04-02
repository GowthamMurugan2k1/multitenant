export function GreetingMessage() {
  const time = new Date();
  const hrs = time.getHours();
  
  if (hrs >= 5 && hrs < 12) {
    return "Good Morning";
  } else if (hrs >= 12 && hrs < 16) {
    return "Good Afternoon";
  } else if (hrs >= 16 && hrs < 21) {
    return "Good Evening";
  } else {
    return "Good Night";
  }
}


// convert to hex to RGB
export const hexToRgb = (hex:string) => {
  hex = hex.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `${r} ${g} ${b}`;
};
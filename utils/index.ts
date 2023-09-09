export const msToMinSec = (ms: number) => {
    let seconds = Math.floor(ms / 1000);
    
    const minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }
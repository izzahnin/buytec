function generateRandomStock(): number {
    const randomNumber = Math.floor(Math.random() * (40 - 20 + 1)) + 20;
    return randomNumber;
  }
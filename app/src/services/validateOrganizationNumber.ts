export const validateOrganizationNumber = (organizationNumber: number): boolean => {
    const orgNumStr = organizationNumber.toString();
  
    // Check if the length is 10 digits
    if (orgNumStr.length !== 10) {
      return false;
    }
  
    // Luhn algorithm for checksum validation
    let sum = 0;
    for (let i = 0; i < orgNumStr.length; i++) {
      let digit = parseInt(orgNumStr[i], 10);
      if (i % 2 === 0) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      sum += digit;
    }
  
    return sum % 10 === 0;
  };
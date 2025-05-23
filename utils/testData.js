export const minMaxData = [
    { field: 'Your Address *', value: 'A', shouldBeValid: false },
    { field: 'Your Address *', value: 'AAA', shouldBeValid: true },
    { field: 'Your Address *', value: 'A'.repeat(33), shouldBeValid: false },
    { field: 'Your City *', value: 'A', shouldBeValid: false },
    { field: 'Your City *', value: 'Los Angeles', shouldBeValid: true },
    { field: 'Your State *', value: 'TX', shouldBeValid: false },
    { field: 'Your Country *', value: 'USA', shouldBeValid: true },
  ];
  
  export const addressData = [
    { value: '123 Main St', valid: true },
    { value: 'Main@Street!', valid: false },
    { value: '45612 Oak Blvd', valid: true },
  ];
  
  export const alphaFields = [
    { field: 'Your City *', value: 'New York', valid: true },
    { field: 'Your City *', value: 'NY123', valid: false },
    { field: 'Your State *', value: 'Texas', valid: true },
    { field: 'Your Country *', value: 'U$A', valid: false },
  ];
  
  export const zipData = [
    { value: '75001', valid: true },
    { value: '7500', valid: false },
    { value: '75001-1234', valid: false },
    { value: 'abcde', valid: false },
  ];
  
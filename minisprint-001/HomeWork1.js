// HomeWork1.js - MiniSprint 001: TypeScript Fundamentals

// Topic: 1.1 ES6 Methods - Examples and Explanations

/* ================================================
   WHAT IS ES6?
   ================================================ */

/*
ECMAScript (ES) is an object-oriented programming language for performing computations
and manipulating computational objects within a host environment. 
ECMAScript was originally designed to be used as a scripting language,
but has become widely used as a general-purpose programming language.
A scripting language is a programming language that is used to manipulate, customize, and automate the facilities
of an existing system. ECMAScript was originally designed to be a Web scripting language,
providing a mechanism to enliven Web pages in browsers and to perform server computation as part of a Web-based client-server architecture.
ECMAScript is now used to provide core scripting capabilities for a variety of host environments.
ECMAScript usage has moved beyond simple scripting and it is now used
for the full spectrum of programming tasks in many different environments and scales.
As the usage of ECMAScript has expanded, so have the features and facilities it provides.
ECMAScript is now a fully featured general-purpose programming language.


ES6 (ECMAScript 2015) is like upgrading from an old hotel phone system to a modern smart communication platform.
It's the 6th version of JavaScript that made coding much easier, cleaner, and more powerful.
Released in 2015, ES6 transformed JavaScript from a basic scripting language
into a robust tool for building complex applications like a hotel B2B platform.
If JavaScript before ES6 was like managing a hotel with paper forms and manual processes,
ES6 is like having a digital management system with automated features and smart tools.
*/

console.log("=== ES6 METHODS DEMONSTRATION ===");
/* ================================================
   1. ARRAY METHODS - Data Processing Toolkit
   ================================================ */

console.log("--- 1. ARRAY METHODS ---");
// Sample hotel data for demonstrations
const roomPrices = [100, 150, 200, 250, 300];
const guests = ['john', 'mary', 'bob', 'alice'];
const rooms = [
  { number: 101, available: true, price: 100, type: 'standard' },
  { number: 102, available: false, price: 150, type: 'deluxe' },
  { number: 103, available: true, price: 200, type: 'suite' },
  { number: 104, available: true, price: 80, type: 'budget' }
];

// MAP() - Transform Your Data
console.log("\nMAP() - Transform hotel data:");
const pricesWithTax = roomPrices.map(price => price * 1.1);
console.log("Original prices:", roomPrices);
console.log("Prices with 10% tax:", pricesWithTax);

// FILTER() - Find What You Need
console.log("\nFILTER() - Find specific rooms:");
const availableRooms = rooms.filter(room => room.available);
console.log("Available rooms:", availableRooms);

// FIND() - Get the First Match
console.log("\nFIND() - Get first matching item:");
const foundGuest = guests.find(guest => guest === 'mary');
console.log("Found guest 'mary':", foundGuest);

// INCLUDES() - Check if array contains value
console.log("\nINCLUDES() - Check if value exists:");
const hasExpensiveRoom = roomPrices.includes(300);
console.log("Has room priced at $300:", hasExpensiveRoom);

/* ================================================
   2. OBJECT METHODS - Handle Data Like a Pro
   ================================================ */

console.log("\n--- 2. OBJECT METHODS ---");

const hotel = {
  name: 'Grand Plaza Hotel',
  rooms: 150,
  rating: 4.5,
  city: 'Ayia Napa',
  amenities: ['wifi', 'pool', 'spa', 'gym']
};

// OBJECT.KEYS() - Get Property Names
console.log("\nOBJECT.KEYS() - Get all property names:");
const hotelProperties = Object.keys(hotel);
console.log("Hotel properties:", hotelProperties);

// OBJECT.VALUES() - Get Property Values
console.log("\nOBJECT.VALUES() - Get all values:");
const hotelValues = Object.values(hotel);
console.log("Hotel values:", hotelValues);

// OBJECT.ENTRIES() - Get Key-Value Pairs
console.log("\nOBJECT.ENTRIES() - Get key-value pairs:");
const hotelEntries = Object.entries(hotel);
console.log("Hotel entries:", hotelEntries);

/* ================================================
   3. STRING METHODS - Text Processing Made Easy
   ================================================ */

console.log("\n--- 3. STRING METHODS ---");

const amenitiesList = 'wifi, pool, spa, gym, restaurant, parking';

// STARTSWITH() - Check text beginning
console.log("\nSTRING.STARTSWITH() - Check text start:");
const roomNumber = '301';
const isThirdFloor = roomNumber.startsWith('3');
console.log(`Room ${roomNumber} is on 3rd floor:`, isThirdFloor);

// ENDSWITH() - Check text ending
console.log("\nSTRING.ENDSWITH() - Check text end:");
const email = 'guest@grandplaza.com';
const isHotelEmail = email.endsWith('@grandplaza.com');
console.log("Is hotel email:", isHotelEmail);

/* ================================================
   4. METHOD SHORTHAND - Cleaner Object Functions
   ================================================ */

console.log("\n--- 4. METHOD SHORTHAND SYNTAX ---");

// Old ES5 way (before ES6)
const oldHotelService = {
  bookRoom: function(roomId) {
    return `Booking room ${roomId}`;
  },
  cancelBooking: function(bookingId) {
    return `Cancelled booking ${bookingId}`;
  }
};

// New ES6 way - much cleaner!
const modernHotelService = {
  // Method shorthand - no 'function' keyword needed
  bookRoom(roomId) {
    return `Booking room ${roomId}`;
  },
  
  cancelBooking(bookingId) {
    return `Cancelled booking ${bookingId}`;
  },
  
  checkAvailability(date) {
    return `Checking availability for ${date}`;
  },
  
  calculatePrice(basePrice, nights, discountPercent = 0) {
    const discount = basePrice * nights * (discountPercent / 100);
    const total = (basePrice * nights) - discount;
    return `Total price: $${total} (${nights} nights, ${discountPercent}% discount)`;
  }
};
console.log("\n--- WHY ES6 METHODS ARE IMPORTANT ---");
console.log(`
Cleaner Code: ES6 methods make your code more readable and professional
Better Performance: Modern methods are optimized for speed
Industry Standard: All modern frameworks (React, NestJS) use ES6 extensively
Easier Debugging: Shorter, clearer code means fewer bugs
Team Collaboration: Other developers can understand your code faster`);
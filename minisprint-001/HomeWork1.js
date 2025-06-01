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


/* ================================================
   WHAT ARE VARIABLE DECLARATIONS?
   ================================================ */

/*
Variable declarations are how we create containers to store data.
Think of them as different types of hotel room keys:
- var: Old master key (opens too many doors, security issues)
- let: Modern smart card (precise access control)
- const: VIP key card (cannot be duplicated or changed)
*/

console.log("=== VAR, LET, CONST DIFFERENCES ===");

/* ================================================
   1. VAR - The Old Way 
   ================================================ */

console.log("--- 1. VAR (Function-Scoped or Global-Scoped) ---");
console.log("var has two main scopes: function scope and global scope, but it completely ignores block scope (which is why let and const were introduced in ES6).");

function hotelBookingVar() {
  var guestName = 'Clem';
  var roomNumber = 101;
  
  if (true) {
    var guestName = 'Clemy'; // This overwrites the previous guestName!
    var amenities = 'wifi, pool'; // Available throughout entire function
  }
  
  console.log("Guest name:", guestName); // 'Clemy' - unexpected!
  console.log("Amenities:", amenities); // 'wifi, pool' - accessible outside if block
}

// Hoisting example with var
// Hoisting means that variable declarations are moved to the top of their scope
// var declarations, wherever they occur in a script, are processed before any code within the script is executed
console.log("\nVar hoisting example:");
console.log("Hotel name before declaration:", hotelName); // undefined (not an error!)
var hotelName = 'Grand Plaza';
console.log("Hotel name after declaration:", hotelName); // 'Grand Plaza'

hotelBookingVar();

/* ================================================
   2. LET - Modern Block-Scoped Variable
   ================================================ */

console.log("\n--- 2. LET (Block-Scoped) ---");

function hotelBookingLet() {
  let availableRooms = 50;
  let guestCount = 0;
  
  if (guestCount < availableRooms) {
    let roomType = 'standard'; // Only available in this block
    let specialOffer = '10% discount';
    
    console.log("Room type inside block:", roomType); // Works fine
  }
  
  // console.log(roomType); // This would cause ReferenceError!
  
  // Can reassign let variables
  availableRooms = 45; // This works
  guestCount = 5; // This works too
  
  console.log("Available rooms:", availableRooms);
  console.log("Guest count:", guestCount);
}


/* ================================================
   3. CONST - Immutable Declaration
   ================================================ */

console.log("\n--- 3. CONST (Cannot be reassigned) ---");

// Hotel configuration with const
const HOTEL_NAME = 'Grand Plaza Hotel';
const MAX_GUESTS_PER_ROOM = 4;
const HOTEL_AMENITIES = ['wifi', 'pool', 'spa', 'gym'];

console.log("Hotel name:", HOTEL_NAME);
console.log("Max guests per room:", MAX_GUESTS_PER_ROOM);
console.log("Hotel amenities:", HOTEL_AMENITIES);

// const HOTEL_NAME = 'Another Hotel'; // This would cause SyntaxError!
// HOTEL_NAME = 'New Name'; // This would cause TypeError!

// Object mutation with const (this is allowed)
const hotelInfo = {
  name: 'Grand Plaza',
  rooms: 150,
  rating: 4.5
};

console.log("Original hotel info:", hotelInfo);

// This works - we're modifying the object, not reassigning the variable
hotelInfo.rating = 4.7;
hotelInfo.newProperty = 'excellent service';

console.log("Modified hotel info:", hotelInfo);

/* ================================================
   4. LOOP VARIABLE PROBLEM
   ================================================ */

console.log("\n--- 4. LOOP VARIABLE PROBLEM ---");

// Problem with var in loops
console.log("Problem with var in setTimeout:");
for (var i = 1; i <= 3; i++) {
  setTimeout(() => {
    console.log('var room:', i); // Always prints 4!
  }, 100);
}

// Solution with let
console.log("Solution with let in setTimeout:");
for (let j = 1; j <= 3; j++) {
  setTimeout(() => {
    console.log('let room:', j); // Prints 1, 2, 3 correctly
  }, 200);
}

/* ================================================
    Spread Operator
   ================================================ */

console.log("\n--- SPREAD OPERATOR ---");
// Spread operator (...) allows us to expand elements of an iterable (like an array, object) into individual elements
// Use it to combine, copy, or spread data easily

const basicAmenities = ['wifi', 'parking'];
const premiumAmenities = ['pool', 'spa'];
const allAmenities = [...basicAmenities, ...premiumAmenities];

console.log("Basic amenities:", basicAmenities);
console.log("Premium amenities:", premiumAmenities);
console.log("All amenities using spread operator:", allAmenities);


/* ================================================
   WHAT IS OBJECT ITERATION AND DEEP COPY?
   ================================================ */

/*
Object iteration: Going through each property in an object
Deep copy: Creating a completely separate copy of an object

Think of iteration like checking each hotel room one by one,
and deep copy like building an identical hotel in another location.
*/

console.log("=== OBJECT ITERATION AND DEEP COPY ===");

const hotelNYC = { name: 'Grand Plaza', rooms: 150, rating: 4.5, city: 'NYC' };

// Method 1: Object.keys() - Get property names
console.log("Object.keys():", Object.keys(hotelNYC));

// Method 2: Object.values() - Get property values
console.log("Object.values():", Object.values(hotelNYC));

// Method 3: Object.entries() - Get key-value pairs
console.log("Object.entries():", Object.entries(hotelNYC));

// Method 4: for...in loop
console.log("for...in loop:");
for (let key in hotelNYC) {
  console.log(`${key}: ${hotelNYC[key]}`);
}

// Method 5: forEach with entries
console.log("forEach with entries:");
Object.entries(hotelNYC).forEach(([key, value]) => {
  console.log(`${key}: ${value}`);
});

/* ================================================
   2. SHALLOW COPY vs DEEP COPY
   ================================================ */

console.log("\n--- 2. SHALLOW COPY vs DEEP COPY ---");

const originalHotel = {
  name: 'Grand Plaza',
  location: { city: 'NYC', country: 'USA' }
};

// Shallow copy - nested objects still connected
const shallowCopy = { ...originalHotel };
shallowCopy.location.city = 'Larnaka'; // This changes original too!

console.log("Original after shallow copy change:", originalHotel);
console.log("Shallow copy:", shallowCopy);


/* ================================================
   3. DEEP COPY METHODS
   ================================================ */

console.log("\n--- 3. DEEP COPY METHODS ---");

const hotelData = {
  name: 'Grand Plaza',
  details: { rooms: 150, amenities: ['wifi', 'pool'] }
};

// JSON stringify/parse (most common)
const deepCopy1 = JSON.parse(JSON.stringify(hotelData));
deepCopy1.details.rooms = 200;
console.log("Original:", hotelData);
console.log("Deep copy 1:", deepCopy1);



/* ================================================
   WHAT ARE ARRAY METHODS?
   ================================================ */

/*
Array methods are functions that work with arrays:
- Accessor: Read data without changing the original array
- Iterator: Loop through elements and process them
- Mutator: Modify the original array

Think of them as different hotel management tools:
- Accessor: Check room status without changing anything
- Iterator: Visit each room to collect information
- Mutator: Actually modify room assignments
*/

console.log("=== ARRAY METHODS DEMONSTRATION ===");

/* ================================================
   1. ACCESSOR METHODS (Don't change original array)
   ================================================ */

console.log("--- 1. ACCESSOR METHODS ---");

const hotelRooms = [101, 102, 103, 104, 105];
const amenities = ['wifi', 'pool', 'spa', 'gym'];

// slice() - Extract portion of array
const firstThreeRooms = hotelRooms.slice(0, 3);
console.log("Original rooms:", hotelRooms);
console.log("First 3 rooms:", firstThreeRooms);

// concat() - Combine arrays
const moreAmenities = ['restaurant', 'parking'];
const allAmenitiesConcat = amenities.concat(moreAmenities);
console.log("Combined amenities:", allAmenitiesConcat);

// indexOf() - Find position of element
const poolIndex = amenities.indexOf('pool');
console.log("Pool is at index:", poolIndex);

// includes() - Check if element exists
const hasWifi = amenities.includes('wifi');
console.log("Has wifi:", hasWifi);

// join() - Convert array to string
const amenityList = amenities.join(', ');
console.log("Amenity list:", amenityList);

/* ================================================
   2. ITERATOR METHODS (Process each element)
   ================================================ */

console.log("\n--- 2. ITERATOR METHODS ---");

const hotels = [
  { name: 'Grand Plaza', price: 200, rating: 4.5 },
  { name: 'Budget Inn', price: 80, rating: 3.2 },
  { name: 'Luxury Resort', price: 350, rating: 4.8 }
];

// forEach() - Execute function for each element
console.log("forEach - List all hotels:");
hotels.forEach(hotel => {
  console.log(`${hotel.name}: $${hotel.price}`);
});

// map() - Transform each element
const hotelNames = hotels.map(hotel => hotel.name);
console.log("Hotel names:", hotelNames);

const pricesWithTaxes = hotels.map(hotel => hotel.price * 1.1);
console.log("Prices with tax:", pricesWithTaxes);

// filter() - Get elements that match condition
const expensiveHotels = hotels.filter(hotel => hotel.price > 150);
console.log("Expensive hotels:", expensiveHotels);

// find() - Get first element that matches
const budgetHotel = hotels.find(hotel => hotel.price < 100);
console.log("Budget hotel:", budgetHotel);

// reduce() - Reduce array to single value
const totalRevenue = hotels.reduce((sum, hotel) => sum + hotel.price, 0);
console.log("Total revenue:", totalRevenue);

const averageRating = hotels.reduce((sum, hotel) => sum + hotel.rating, 0) / hotels.length;
console.log("Average rating:", averageRating.toFixed(1));


/* ================================================
   3. MUTATOR METHODS (Change original array)
   ================================================ */

console.log("\n--- 3. MUTATOR METHODS ---");

const roomNumbers = [101, 102, 103];
console.log("Original room numbers:", roomNumbers);

// push() - Add to end
roomNumbers.push(104);
console.log("After push(104):", roomNumbers);

// pop() - Remove from end
const removedRoom = roomNumbers.pop();
console.log("Removed room:", removedRoom);
console.log("After pop():", roomNumbers);

// unshift() - Add to beginning
roomNumbers.unshift(100);
console.log("After unshift(100):", roomNumbers);

// shift() - Remove from beginning
const firstRoom = roomNumbers.shift();
console.log("Removed first room:", firstRoom);
console.log("After shift():", roomNumbers);

// splice() - Add/remove elements at any position
const guestList = ['John', 'Mary', 'Bobyy'];
console.log("Original guests:", guestList);

guestList.splice(1, 1, 'Alice', 'Lucky'); // Remove 1 at index 1, add Alice and Charlie
console.log("After splice:", guestList);

// sort() - Sort elements
const prices = [200, 80, 350, 150];
console.log("Original prices:", prices);

prices.sort((a, b) => a - b); // Sort ascending
console.log("Sorted prices:", prices);

// reverse() - Reverse array order
const floors = [1, 2, 3, 4];
console.log("Original floors:", floors);

floors.reverse();
console.log("Reversed floors:", floors);

/* ================================================
   4. METHOD CHAINING
   ================================================ */

console.log("\n--- 4. METHOD CHAINING ---");

const hotelDataNYC = [
  { name: 'Grand Plaza', price: 200, rating: 4.5, city: 'NYC' },
  { name: 'Budget', price: 80, rating: 3.2, city: 'NYC' },
  { name: 'Luxury Resorts', price: 350, rating: 4.8, city: 'Miami' },
  { name: 'City Hotel', price: 150, rating: 4.1, city: 'NYC' }
];

// Chain multiple methods together
const nycHotelNames = hotelDataNYC
  .filter(hotel => hotel.city === 'NYC')
  .filter(hotel => hotel.rating >= 4.0)
  .map(hotel => hotel.name)
  .sort();

console.log("High-rated NYC hotels:", nycHotelNames);

/*
ARRAY METHOD CATEGORIES:

ACCESSOR METHODS (Don't change original):
- slice() - Extract portion
- concat() - Combine arrays
- indexOf() - Find position
- includes() - Check existence
- join() - Convert to string

ITERATOR METHODS (Process elements):
- forEach() - Execute function for each
- map() - Transform each element
- filter() - Get matching elements
- find() - Get first match
- reduce() - Reduce to single value

MUTATOR METHODS (Change original):
- push() - Add to end
- pop() - Remove from end
- unshift() - Add to beginning
- shift() - Remove from beginning
- splice() - Add/remove at position
- sort() - Sort elements
- reverse() - Reverse order */
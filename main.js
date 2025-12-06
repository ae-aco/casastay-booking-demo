//Here is my object and I've stored an array of room prices and available rooms.
let myHotel = {
    hotelName: "Hotel Venus",
    roomTypes: ["Standard", "Double", "Deluxe"],
    roomPrice: [150, 250, 400],
    availableRooms: [[101, 102], [201, 202], [500]],
    bookedRooms: [[], [], []],
};

//I have implemented this function into the book now button to demonstrate that the code is reusable and triggers an event when clicked.
function bookNow() {
    document.getElementById("jump-to-location").scrollIntoView({ behavior: 'smooth' });
}

function submitBooking() {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let adults = document.getElementById('adult').value;
    let children = document.getElementById('child').value;
    let checkinDate = document.getElementById('checkin-date').value;
    let checkoutDate = document.getElementById('checkout-date').value;
    let roomPreference = document.getElementById('room-selection').value;
    let discountCode = document.getElementById('discount').value;

    let includeBreakfast = document.getElementById('breakfast-option').checked;
    let breakfastPrice = includeBreakfast ? 20 : 0;

    let roomIndex = { standard: 0, double: 1, deluxe: 2 }[roomPreference.toLowerCase()] || -1;

    if (roomIndex === -1) {
        alert("Please select a room type.");
        return;
    }

    if (myHotel.availableRooms[roomIndex].length > 0) {
        let bookedRoom = myHotel.availableRooms[roomIndex].shift();
        myHotel.bookedRooms[roomIndex].push(bookedRoom);

        let nights = calculateNights(checkinDate, checkoutDate);
        let totalPrice = (myHotel.roomPrice[roomIndex] * nights) + breakfastPrice;

        //if the user is a new customer this will apply the discount when the code is entered
        if (discountCode === "WELCOME20") {
            totalPrice *= 0.8;
        }

        /* when the user has successfully booked a room this is the message that will pop up - I didn't dedicate enough time to fix why this didn't pop up. But I've left it in the code to show that data the function submitBooking gets from what is submitted by the user is printed in the console, which was supposed pop up as an alert.
        
        console.log(`Thanks for booking a room at Hotel Venus, ${name}. You booked a ${myHotel.roomTypes[roomIndex]} room. Room Number; ${bookedRoom}. Your total price is £${totalPrice}. You will be in room ${bookedRoom}.`); */

        alert(`Booking confirmed! Room ${bookedRoom} has been reserved for ${name}.`);

        document.querySelector('form').reset();
    }
    else {
        alert(`Sorry, there are no ${myHotel.roomTypes[roomIndex]} rooms available.`);
    }

    function calculateNights(checkin, checkout) {
        const checkinDate = new Date(checkin);
        const checkoutDate = new Date(checkout);
        const timeDifference = checkoutDate - checkinDate;
        const days = timeDifference / (1000 * 3600 * 24);
        return days;
    }
}

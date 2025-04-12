// script.js

// **Core Variables and Constants**
const getRouteButton = document.getElementById('get-route-button');
const routeDisplay = document.getElementById('route-display');
const alertDisplay = document.getElementById('alert-display');
const mapContainer = document.getElementById('route-map-container');
const mapElement = document.getElementById('map'); // Get the map element
const meshNetworkNotice = document.getElementById('mesh-network-notice');
const contactNavLink = document.getElementById('contact-nav-link');
const contactPopup = document.getElementById('contact-popup');
const closeContactPopupButton = document.getElementById('close-contact-popup');
const popupOverlay = document.getElementById('popup-overlay');
const smsInputContainer = document.getElementById('sms-input-container');
const smsInput = document.getElementById('sms-input');
const smsButton = document.getElementById('sms-button');

let map; // Declare map variable outside the function to be accessible globally
let marker;  // Store the marker
let routeLayer; // Store the route layer

// **Helper Functions**

// Function to display an alert
function displayAlert(message, type = 'error') {
    alertDisplay.textContent = message;
    alertDisplay.style.display = 'block';
    alertDisplay.style.backgroundColor = type === 'success' ? '#e8f9ea' : '#fee';
    alertDisplay.style.color = type === 'success' ? '#388e3c' : '#f00';
}

// Function to clear an alert
function clearAlert() {
    alertDisplay.style.display = 'none';
    alertDisplay.textContent = '';
}

// Function to display a route
function displayRoute(routeInstructions) {
    routeDisplay.textContent = routeInstructions;
    routeDisplay.style.display = 'block';
}

// Function to clear the route
function clearRoute() {
    routeDisplay.style.display = 'none';
    routeDisplay.textContent = '';
}

// Function to initialize the map
function initMap(latitude, longitude) {
    // Check if the map has already been initialized
    if (map) {
        map.remove(); // Remove the existing map
    }

    map = L.map('map').setView([latitude, longitude], 16); // Centered on user's location, zoom level 16

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add a marker at the user's location
    if (marker) {
        map.removeLayer(marker);
    }
    marker = L.marker([latitude, longitude]).addTo(map);
    marker.bindPopup("Your Location").openPopup();
}

// Function to draw a route on the map (example)
function drawRouteOnMap(routeCoordinates) {
    if (routeLayer) {
        map.removeLayer(routeLayer); // Clear previous route if any
    }
    routeLayer = L.polyline(routeCoordinates, {color: 'blue'}).addTo(map);
    map.fitBounds(routeLayer.getBounds()); // Adjust map view to fit the route
    mapContainer.style.display = 'block'; // Show the map container
}


// **Event Handlers**

// Get Route Button Click Handler
getRouteButton.addEventListener('click', () => {
    clearAlert();
    clearRoute();

    if (!navigator.geolocation) {
        displayAlert('Geolocation is not supported by your browser.');
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            initMap(latitude, longitude); // Initialize the map

            // Simulated route data (replace with actual route calculation)
            const routeCoordinates = [
                [latitude, longitude],
                [latitude + 0.002, longitude + 0.001],
                [latitude + 0.005, longitude + 0.003],
                [latitude + 0.008, longitude + 0.002]
            ];

            const routeInstructions = `
                1. Head east for 100 meters.
                2. Turn left onto Main Street.
                3. Continue for 200 meters.
                4. Evacuate to the designated safe zone.
            `;

            displayRoute(routeInstructions);
            drawRouteOnMap(routeCoordinates);

        },
        (error) => {
            let errorMessage = 'Could not retrieve your location.';
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    errorMessage = 'Geolocation permission denied. Please enable location services.';
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMessage = 'Location information is unavailable.';
                    break;
                case error.TIMEOUT:
                    errorMessage = 'The request to get user location timed out.';
                    break;
                case error.UNKNOWN_ERROR:
                    errorMessage = 'An unknown error occurred.';
                    break;
            }
            displayAlert(errorMessage);
        }
    );
});


// Contact Link Click Handler
contactNavLink.addEventListener('click', (e) => {
    e.preventDefault();
    contactPopup.style.display = 'block';
    popupOverlay.style.display = 'block';
});

// Close Contact Popup Button Click Handler
closeContactPopupButton.addEventListener('click', () => {
    contactPopup.style.display = 'none';
    popupOverlay.style.display = 'none';
});

// Overlay Click Handler (to close the popup)
popupOverlay.addEventListener('click', () => {
    contactPopup.style.display = 'none';
    popupOverlay.style.display = 'none';
});


// **Simulated Mesh Network and SMS Functionality (Placeholder)**

// Simulate Mesh Network Alerts - Displaying the notice
function showMeshNetworkNotice() {
    meshNetworkNotice.style.display = 'block';
}

// Simulate sending SMS (placeholder) - To be integrated with a real SMS gateway.
function sendSMS(phoneNumber, message) {
    // In a real application, you'd use an API like Twilio or other SMS service.
    alert(`SMS would be sent to ${phoneNumber} with the message: ${message}`);
}

//  Example of handling incoming alerts through a simulated mesh network and SMS fallback
const socket = io(); // Connect to the Socket.IO server

socket.on('connect', () => {
    console.log('Connected to the server');
});

socket.on('emergencyAlert', (data) => {
    const alertMessage = `Emergency Alert: ${data.message}`;
    displayAlert(alertMessage, 'error'); // Display alert on UI

    // Simulate SMS fallback (if desired)
    const phoneNumber = localStorage.getItem('phoneNumber');
    if (phoneNumber) {
        sendSMS(phoneNumber, alertMessage);
    }
});

// **Initialization**

// Initially hide the route display and alert
routeDisplay.style.display = 'none';
alertDisplay.style.display = 'none';
mapContainer.style.display = 'none';

// Show the Mesh Network notice (initial display)
showMeshNetworkNotice();
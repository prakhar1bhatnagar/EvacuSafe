# EvacuSafe
# EvacuSafe: Smart Emergency Evacuation System

## Overview

EvacuSafe is a web-based application designed to assist users during emergencies by providing real-time alerts, personalized evacuation routes, and offline functionality (simulated).  This project was created for the HACKERZ STREET 3.0 Hackathon 2025.

## Features

*   *Real-time Location:* Utilizes the user's current location.
*   *Offline Mode (Simulated):*  Features a simulated mesh network for alerting users when the primary network is unavailable. SMS fallback (placeholder).
*   *Real-time Alerts:* Receives and displays emergency alerts from the server.
*   *Personalized Routes (Conceptual):* Provides step-by-step evacuation instructions (simulated).
*   *Contact Information:* Provides contact details.

## Technologies

*   *Frontend:* HTML, CSS, JavaScript, Leaflet (map)
*   *Backend:* Node.js, Express, Socket.IO

## Project Structure


EvacuSafe/
├── index.html # Frontend
├── script.js # Frontend
├── server.js # Backend
├── package.json # Dependencies
└── README.md # This file

## Prerequisites

*   Node.js and npm
*   Text Editor/IDE

## Installation

1.  Clone or download the code.
2.  npm install in the project directory.

## Running

1.  node server.js
2.  Use ngrok http 3000 (or the correct port) to get an HTTPS URL.
3.  Open the ngrok HTTPS URL in your browser.
4.  Grant location permissions.

## Functionality

*   "Get Safe Route" (simulated) displays a route.
*   Receives simulated emergency alerts.

## Important

*   Replace placeholders with real implementations for:
    *   Geolocation
    *   Routing API
    *   Alerting
    *   SMS
*   Simulated Mesh Network requires actual Bluetooth/Wi-Fi Direct for real-world functionality.

## Contact

*   Prakhar Bhatnagar
*   PRAKHAR.23FE10ITE00003@muj.manipal.edu
*   github.com/evacusafe


// server.js
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path'); // Import the 'path' module

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = process.env.PORT || 3000;

// Serve static files from the current directory (where your HTML and JS files are)
app.use(express.static(__dirname));  // Serves all the static files


// Set up a route to serve the HTML file (optional, but good practice)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Use 'path.join' to construct the path
});


// Socket.IO connection handling
io.on('connection', (socket) => {
    console.log('A user connected');

    // Example:  Emitting an emergency alert every 10 seconds (for demonstration)
    const intervalId = setInterval(() => {
        const alertMessage = `Simulated Emergency Alert! Evacuate immediately!`;
        io.emit('emergencyAlert', { message: alertMessage }); // Broadcast to all connected clients
        console.log('Emitted emergency alert');
    }, 10000); // Every 10 seconds

    socket.on('disconnect', () => {
        console.log('User disconnected');
        clearInterval(intervalId); // Clear the interval when the user disconnects
    });
});


server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
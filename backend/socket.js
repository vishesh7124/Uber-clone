const socketIo = require('socket.io');
const userModel = require('./models/user.model');
const captainModel = require('./models/captain.model');


let io;

function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
            allowedHeaders: ['Content-Type'],
            credentials: true
        }
    });

    console.log("connecting");

    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);

        socket.on('join', async(data)=>{
            const {userId, userType} = data;
            if(userType === 'user'){
                await userModel.findByIdAndUpdate(userId,{
                    socketId:socket.id
                })
            }else if(userType === 'captain'){
                await captainModel.findByIdAndUpdate(userId,{
                    socketId:socket.id
                })
            }
        })

        socket.on('update-location-captain', async(data)=>{
            const {userId,location} = data;

            if(!location || !location.ltd || !location.lng){
                return socket.emit('error',{message: 'Invalid location data!'});
            }


            await captainModel.findByIdAndUpdate(userId,{
                location:{
                    ltd: location.ltd,
                    lng: location.lng
                }
            })

            console.log(await captainModel.findOne({_id: userId}));

        })

        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
}

function sendMessageToSocketId(socketId, message) {
    if (io) {
        io.to(socketId).emit('message', message);
    } else {
        console.log('Socket.io is not initialized');
    }
}

module.exports = { initializeSocket, sendMessageToSocketId };
import io from 'socket.io-client';

const SOCKET_URL = `${process.env.EXPO_PUBLIC_BASE_URL}`;

class WSService {

    initializeSocket = async () => {
        try {

            this.socket = io(SOCKET_URL, {
                transports: ['websocket']
            })
            // console.log("initializing socket", this.socket)
            console.log("initializing socket")


            this.socket?.on('connected', (data) => {
                // console.log("=== socket connected ====")
                console.log("=== socket connected ====")
            })

            this.socket?.on('disconnect', (data) => {
                console.log("=== socket disconnected ====")
            })

            this.socket?.on('error', (data) => {
                console.log("socket error", data)
            })

        } catch (error) {
            console.log("socket is not inialized", error)
        }
    }

    emit(event, data = {}) {
        this.socket?.emit(event, data)
    }
    
    on(event, cb) {
        this.socket?.on(event, cb)
    }

    removeListener(listenerName) {
        this.socket.removeListener(listenerName)
    }

}

const socketServcies = new WSService()

export default socketServcies
// // models/qrModel.js
// const { Client, LocalAuth } = require('whatsapp-web.js');
// const qrcode = require('qrcode'); // Import qrcode library

// class QRModel {
//     constructor() {
//         this.client = null;
//         this.qrCode = null;
//         this.authenticated = false;
//     }

//     async createClient() {
//         try {
//             const localAuth = new LocalAuth();

//             // @ts-ignore
//             delete localAuth.logout; // Remove the existing logout method

//             // Override logout method to include custom logic
//             localAuth.logout = async () => {
//                 try {
//                     // Custom logic for logout
//                     console.log('User has logged out.');

//                     // Cleanup and stop client
//                     if (this.client) {
//                         console.log("Cleaning up and stopping client...");
//                         await this.client.destroy(); // Properly stop the client
//                         this.client = null;
//                         this.authenticated = false;
//                     }

//                     // Additional cleanup or logic can be added here if needed
//                 } catch (error) {
//                     console.error('Error during logout:', error);
//                 }
//             };

//             this.client = new Client({
//                 authStrategy: localAuth, // Use LocalAuth for session management
//                 restartOnAuthFail: true,
//                 puppeteer: {
//                     headless: true,
//                     ignoreHTTPSErrors: true,
//                     args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-web-security', '--disable-gpu', '--hide-scrollbars', '--disable-cache', '--disable-application-cache','--disable-gpu-driver-bug-workarounds', '--disable-accelerated-2d-canvas','--disable-features=IsolateOrigins,site-per-process'],
//                 },
//             });

//             this.client.on('qr', (qr) => this.handleQR(qr));
//             this.client.on('authenticated', () => this.handleAuthenticated());
//             this.client.on('auth_failure', (message) => console.error('Authentication failure:', message));

//             await this.client.initialize();
//         } catch (error) {
//             console.error('Error creating client:', error.message);
//         }
//     }

//     async handleQR(qr) {
//         console.log('QR Code received');
//         this.qrCode = qr;

//         // Generate QR code image URL
//         qrcode.toDataURL(qr, (err, url) => {
//             if (err) {
//                 console.error('Error generating QR code:', err.message);
//                 return;
//             }

//             // Print QR code URL to the console
//             console.log('QR Code URL:', url);

//             // No longer save QR code image
//             // This part is removed to avoid saving QR code image
//         });
//     }

//     handleAuthenticated() {
//         console.log('Authenticated successfully');
//         this.authenticated = true;
//     }

//     async initializeClient() {
//         console.log('Initializing client...');
//         try {

//             if (!this.client) {
//                 await this.createClient();
//             }
//             return this.qrCode;
//         } catch (error) {
//             console.error('Error initializing client:', error.message);
//             throw error;
//         }
//     }
// }

// module.exports = QRModel;

// models/qrModel.js
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode'); // Import qrcode library

class QRModel {
    constructor() {
        this.client = null;
        this.qrCode = null;
        this.authenticated = false;
    }

    async createClient() {
        try {
            const localAuth = new LocalAuth();

            // @ts-ignore
            delete localAuth.logout; // Remove the existing logout method

            // Override logout method to include custom logic
            localAuth.logout = async () => {
                try {
                    console.log('User has logged out.');
                    
                    if (this.client) {
                        console.log("Cleaning up and stopping client...");
                        await this.client.destroy();
                        this.client = null;
                        this.authenticated = false;
                    }
                } catch (error) {
                    console.error('Error during logout:', error.message);
                }
            };

            this.client = new Client({
                authStrategy: localAuth, // Use LocalAuth for session management
                restartOnAuthFail: true,
                puppeteer: {
                    headless: true,
                    ignoreHTTPSErrors: true,
                    args: [
                        '--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage',
                        '--disable-web-security', '--disable-gpu', '--hide-scrollbars',
                        '--disable-cache', '--disable-application-cache', '--disable-gpu-driver-bug-workarounds',
                        '--disable-accelerated-2d-canvas', '--disable-features=IsolateOrigins,site-per-process'
                    ],
                },
            });

            // Attach event handlers
            this.client.on('qr', (qr) => this.handleQR(qr));
            this.client.on('authenticated', () => this.handleAuthenticated());
            this.client.on('auth_failure', (message) => console.error('Authentication failure:', message));

            // Initialize client
            await this.client.initialize();
        } catch (error) {
            console.error('Error creating client:', error.message);
        }
    }

    async handleQR(qr) {
        console.log('QR Code received');
        this.qrCode = qr;

        // Generate QR code image URL
        qrcode.toDataURL(qr, (err, url) => {
            if (err) {
                console.error('Error generating QR code:', err.message);
                return;
            }
        });
    }

    handleAuthenticated() {
        console.log('Authenticated successfully');
        this.authenticated = true;
    }

    // async initializeClient() {
    //     console.log('Initializing client...');
    //     try {
    //         if (!this.client) {
    //             await this.createClient();
    //         }

    //         // Ensure the client is ready and authenticated
    //         if (!this.authenticated) {
    //             console.log('Waiting for client to authenticate...');
    //             await new Promise((resolve) => {
    //                 const checkAuth = () => {
    //                     if (this.authenticated) {
    //                         resolve();
    //                     } else {
    //                         setTimeout(checkAuth, 1000);
    //                     }
    //                 };
    //                 checkAuth();
    //             });
    //         }

    //         console.log('Client initialized and authenticated');
    //         return this.qrCode;
    //     } catch (error) {
    //         console.error('Error initializing client:', error.message);
    //         throw error;
    //     }
    // }
    async initializeClient() {
                console.log('Initializing client...');
                try {
        
                    if (!this.client) {
                        await this.createClient();
                    }
                   
                                // Ensure the client is ready and authenticated
                                // if (!this.authenticated) {
                                //     console.log('Waiting for client to authenticate...');
                                //     await new Promise((resolve) => {
                                //         const checkAuth = () => {
                                //             if (this.authenticated) {
                                //                 console.log("Waiting ");
                                //                 resolve();
                                //             } else {
                                                
                                //             }
                                //         };
                                //         checkAuth();
                                //     });
                                // }
                    return this.qrCode;
                } catch (error) {
                    console.error('Error initializing client:', error.message);
                    throw error;
                }
            }
            async sendMessageToGroup(groupId, message) {
                console.log("Attempting to send message to group...");
                console.log("Group ID:", groupId, "Message:", message);
        
                if (!this.client || !this.authenticated) {
                    console.error('Client is not initialized or authenticated');
                    throw new Error('Client is not initialized or authenticated');
                }
        
                try {
                    await this.client.isReady; 
        
                    console.log('Retrieving chat by ID...');
                    const chat = await this.client.getChatById(groupId);
        
                    if (chat) {
                        console.log('Group chat found, sending message...');
                        await chat.sendMessage(message);
                        console.log('Message sent to group');
                    } else {
                        console.error('Chat not found for group ID:', groupId);
                        throw new Error('Chat not found');
                    }
                } catch (error) {
                    console.error('Error sending message to WhatsApp group:', error.message);
                    throw error;
                }
            }
            async getAllGroupIds() {
                try {
                    if (!this.client || !this.authenticated) {
                        throw new Error('Client is not initialized or authenticated');
                    }
        
                    const chats = await this.client.getChats();
                    const groupChats = chats.filter(chat => chat.isGroup);
        
                    return groupChats.map(group => ({
                        id: group.id._serialized,
                        name: group.name
                    }));
                } catch (error) {
                    console.error('Error retrieving group IDs:', error.message);
                    throw error;
                }
            }
}

module.exports = QRModel;


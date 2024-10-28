const QRModel = require('../models/qrModel');
const qrcode = require('qrcode');
const path = require('path');
const fs = require('fs').promises; // Use promises for async file operations

const qrModel = new QRModel();

exports.generateQRCode = async (req, res) => {
    try {
        // Initialize the WhatsApp client if not authenticated
        if (!qrModel.authenticated) {
            await qrModel.initializeClient();
        }

        if (!qrModel.qrCode) {
            return res.status(500).json({
                success: false,
                message: 'QR Code not available'
            });
        }

        const qrCode = qrModel.qrCode;
        const uniqueID = Date.now().toString();

        // Generate QR code image URL
        const url = await qrcode.toDataURL(qrCode);

        res.status(200).json({
            success: true,
            qrCodeImage: url,
            scanURL: `http://localhost:3000/api/qrscan/${uniqueID}`
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.getAllGroupIds = async (req, res) => {
    try {
        const groupIds = await qrModel.getAllGroupIds();
        res.status(200).json({ success: true, groupIds });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.groupIdcreate = async (req, res) => {
    const { groupId } = req.body;

    if (!groupId) {
        return res.status(400).json({ error: 'Group ID is required' });
    }

    process.env.GROUP_ID = groupId;

    try {
        const envFilePath = path.resolve(__dirname, '../.env');
        let data = await fs.readFile(envFilePath, 'utf8');

        const updatedData = data.replace(/GROUP_ID=.*/g, `GROUP_ID=${groupId}`);

        await fs.writeFile(envFilePath, updatedData);

        res.status(200).json({ success: true, message: 'Group ID updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error updating .env file', details: error.message });
    }
};

exports.register = async (req, res) => {
    const { name, number, email, subject, text } = req.body;

    if (!name || !number || !email || !subject || !text) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const message = `New Registration:\nName: ${name}\nNumber: ${number}\nEmail: ${email}\nSubject: ${subject}\nText: ${text}`;

    try {
        if (!qrModel.authenticated) {
            console.log('Client not authenticated. Initializing client...');
            await qrModel.initializeClient(); // Ensure client is initialized
        }

        const groupId = process.env.GROUP_ID;
        if (!groupId) {
            return res.status(500).json({ error: 'Group ID is not configured' });
        }

        await qrModel.sendMessageToGroup(groupId, message);
        res.status(200).json({ success: true, message: 'Registration details sent to WhatsApp group' });
    } catch (error) {
        console.error('Error sending message to WhatsApp group:', error);
        res.status(500).json({ error: 'Error sending message to WhatsApp group', details: error.message });
    }
};

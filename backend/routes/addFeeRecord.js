
// addFeeRecord.js ......  api   

const express = require('express');
const UserMail=require('../models/email');
const router = express.Router();
const mongoose = require('mongoose');
const Fee = require('../models/fee');
const Student = require('../models/students');
const authenticateToken = require('../middleware/authenticateToken');
const crypto = require('crypto');
const { google } = require('googleapis');
const secretKey = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');
const algorithm = 'aes-256-cbc';

function decrypt(encryptedText) {
    const [ivHex, encryptedData] = encryptedText.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);

    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
}

function createOAuthClient(userMailRecord) {
    const refreshToken = decrypt(userMailRecord.refreshToken);
    const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_MAIL_CALLBACK_URL || process.env.GOOGLE_CALLBACK_URL
    );

    oauth2Client.setCredentials({ refresh_token: refreshToken });
    return oauth2Client;
}

function encodeEmailMessage(message) {
    return Buffer.from(message)
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

function formatDate(date) {
    if (!date) return 'N/A';

    return new Date(date).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
}

function escapeHtml(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function createReceiptEmail({ student, feeType, amount, paid, paymentDate }) {
    const status = paid ? 'Paid' : 'Pending';
    const formattedAmount = Number(amount).toLocaleString('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    });
    const formattedPaymentDate = formatDate(paymentDate);
    const formattedAdmissionDate = formatDate(student.admissionDate);

    const text = `Dear ${student.studentName},

We have received your payment for ${feeType}.

Amount: ${formattedAmount}
Payment Status: ${status}
Roll Number: ${student.id}
Payment Date: ${formattedPaymentDate}
Admission Date: ${formattedAdmissionDate}

Thank you!
Syan Coaching Center`;

    const html = `
<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;color:#111827;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f3f4f6;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
            <tr>
              <td style="background:#0f766e;padding:24px 28px;color:#ffffff;">
                <p style="margin:0 0 6px;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:#ccfbf1;">Payment Receipt</p>
                <h1 style="margin:0;font-size:24px;line-height:1.3;font-weight:700;">Syan Coaching Center</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:28px;">
                <p style="margin:0 0 18px;font-size:16px;line-height:1.6;">Dear <strong>${escapeHtml(student.studentName)}</strong>,</p>
                <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#374151;">We have received your payment for <strong>${escapeHtml(feeType)}</strong>. Your receipt details are below.</p>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
                  <tr>
                    <td style="padding:14px 16px;background:#f9fafb;color:#6b7280;font-size:13px;border-bottom:1px solid #e5e7eb;">Amount</td>
                    <td style="padding:14px 16px;background:#f9fafb;color:#111827;font-size:16px;font-weight:700;text-align:right;border-bottom:1px solid #e5e7eb;">${escapeHtml(formattedAmount)}</td>
                  </tr>
                  <tr>
                    <td style="padding:14px 16px;color:#6b7280;font-size:13px;border-bottom:1px solid #e5e7eb;">Status</td>
                    <td style="padding:14px 16px;text-align:right;border-bottom:1px solid #e5e7eb;">
                      <span style="display:inline-block;padding:5px 10px;border-radius:999px;background:${paid ? '#dcfce7' : '#fef3c7'};color:${paid ? '#166534' : '#92400e'};font-size:12px;font-weight:700;">${escapeHtml(status)}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:14px 16px;color:#6b7280;font-size:13px;border-bottom:1px solid #e5e7eb;">Fee Type</td>
                    <td style="padding:14px 16px;color:#111827;font-size:14px;text-align:right;border-bottom:1px solid #e5e7eb;">${escapeHtml(feeType)}</td>
                  </tr>
                  <tr>
                    <td style="padding:14px 16px;color:#6b7280;font-size:13px;border-bottom:1px solid #e5e7eb;">Roll Number</td>
                    <td style="padding:14px 16px;color:#111827;font-size:14px;text-align:right;border-bottom:1px solid #e5e7eb;">${escapeHtml(student.id)}</td>
                  </tr>
                  <tr>
                    <td style="padding:14px 16px;color:#6b7280;font-size:13px;border-bottom:1px solid #e5e7eb;">Payment Date</td>
                    <td style="padding:14px 16px;color:#111827;font-size:14px;text-align:right;border-bottom:1px solid #e5e7eb;">${escapeHtml(formattedPaymentDate)}</td>
                  </tr>
                  <tr>
                    <td style="padding:14px 16px;color:#6b7280;font-size:13px;">Admission Date</td>
                    <td style="padding:14px 16px;color:#111827;font-size:14px;text-align:right;">${escapeHtml(formattedAdmissionDate)}</td>
                  </tr>
                </table>

                <p style="margin:24px 0 0;font-size:14px;line-height:1.6;color:#4b5563;">Thank you for your payment.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 28px;background:#f9fafb;color:#6b7280;font-size:12px;line-height:1.5;text-align:center;">
                This is an automated receipt from Syan Coaching Center.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

    return { text, html };
}

async function sendFeeReceipt(userMailRecord, mailOptions) {
    const auth = createOAuthClient(userMailRecord);
    const gmail = google.gmail({ version: 'v1', auth });
    const boundary = `receipt_${Date.now()}`;
    const message = [
        `From: ${mailOptions.from}`,
        `To: ${mailOptions.to}`,
        `Subject: ${mailOptions.subject}`,
        'MIME-Version: 1.0',
        `Content-Type: multipart/alternative; boundary="${boundary}"`,
        '',
        `--${boundary}`,
        'Content-Type: text/plain; charset="UTF-8"',
        'Content-Transfer-Encoding: 7bit',
        '',
        mailOptions.text,
        '',
        `--${boundary}`,
        'Content-Type: text/html; charset="UTF-8"',
        'Content-Transfer-Encoding: 7bit',
        '',
        mailOptions.html,
        '',
        `--${boundary}--`,
    ].join('\r\n');

    await gmail.users.messages.send({
        userId: 'me',
        requestBody: {
            raw: encodeEmailMessage(message),
        },
    });
}

// Add a fee record
router.post('/', authenticateToken, async (req, res) => {
    const { stdId, feeType, amount, paid, paymentDate } = req.body;
    const userId = req.user._id;  // Get user ID from authenticated token

    try {
        // Checking if the student with the given stdId exists for this user
        const student = await Student.findOne({ id: stdId, userId });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Creates a new fee record
        const fee = new Fee({
            _id: new mongoose.Types.ObjectId(),
            stdId,
            student: student._id,  // Reference the actual student document
            userId,  // Link to the user who owns the record
            feeType,
            amount,
            paid,
            paymentDate
        });

       


        const savedFee = await fee.save();
  // Retrieve connected Gmail account for the user
  const userMailRecord = await UserMail.findOne({ userId });
  if (!userMailRecord) {
      return res.status(400).json({ message: 'Gmail is not connected for this user' });
  }

  const receipt = createReceiptEmail({
      student,
      feeType,
      amount,
      paid,
      paymentDate,
  });

  // Define email options
  const mailOptions = {
      from: userMailRecord.email,
      to: student.email || 'lifezlifez3@gmail.com',
      subject: `Fee Payment Confirmation for ${feeType}`,
      text: receipt.text,
      html: receipt.html,
  };

  // Send the email
  await sendFeeReceipt(userMailRecord, mailOptions);
  console.log('Email sent successfully ! ');
  res.status(201).json(savedFee);


} catch (err) {
  res.status(500).json({ message: err.message });
}
});

module.exports = router;

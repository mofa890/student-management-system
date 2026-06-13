// EmailCredentialForm.js
import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/Components/EmailCredentials.css';

const EmailCredentialForm = () => {
  const [connection, setConnection] = useState({
    connected: false,
    email: null,
    connectedAt: null,
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem('token');

  const fetchConnectionStatus = useCallback(async () => {
    if (!token) {
      setMessage('Please log in before connecting Gmail.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/saveEmailCredentials/status`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setConnection(response.data);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Unable to check Gmail connection.');
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const connected = params.get('connected');

    if (connected === 'success') {
      setMessage('Gmail connected successfully.');
    } else if (connected === 'no_refresh_token') {
      setMessage('Google did not return permission for offline email sending. Please try reconnecting.');
    } else if (connected === 'failed') {
      setMessage('Gmail connection failed. Please try again.');
    }

    fetchConnectionStatus();
  }, [fetchConnectionStatus]);

  const handleConnectGoogle = () => {
    if (!token) {
      setMessage('Please log in before connecting Gmail.');
      return;
    }

    window.location.href = `${process.env.REACT_APP_API_BASE_URL}/saveEmailCredentials/google?token=${encodeURIComponent(token)}`;
  };

  const handleDisconnect = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/saveEmailCredentials`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setConnection({
        connected: false,
        email: null,
        connectedAt: null,
      });
      setMessage('Gmail disconnected successfully.');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Unable to disconnect Gmail.');
    }
  };

  return (
    <section className="add-email-from">
      <h2 className="email-connection-title">Receipt Email</h2>

      {isLoading ? (
        <p className="email-status">Checking Gmail connection...</p>
      ) : connection.connected ? (
        <>
          <p className="email-status">Connected Gmail account</p>
          <p className="connected-email">{connection.email}</p>
          <button id="email-from-btn" type="button" onClick={handleConnectGoogle}>
            Reconnect Google
          </button>
          <button className="disconnect-email-btn" type="button" onClick={handleDisconnect}>
            Disconnect
          </button>
        </>
      ) : (
        <>
          <p className="email-status">Connect Gmail to send fee receipts automatically.</p>
          <button id="email-from-btn" type="button" onClick={handleConnectGoogle}>
            Connect Google
          </button>
        </>
      )}

      {message && <p className="app-password-help">{message}</p>}
    </section>
  );
};

export default EmailCredentialForm;

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageCircle, FiX, FiSend } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: 'bot',
      text: "👋 Hi! Welcome to INK DYNASTY. How can we help you today?",
      time: 'Now',
    },
  ]);
  const [input, setInput] = useState('');

  const quickReplies = [
    "Book an appointment",
    "See pricing",
    "Talk to an artist",
    "Aftercare help",
  ];

  const sendMessage = (text) => {
    const msg = text || input.trim();
    if (!msg) return;
    const newMsg = { id: Date.now(), from: 'user', text: msg, time: 'Now' };
    setMessages((prev) => [...prev, newMsg]);
    setInput('');
    setTimeout(() => {
      const botReply = {
        id: Date.now() + 1,
        from: 'bot',
        text: getBotReply(msg),
        time: 'Now',
      };
      setMessages((prev) => [...prev, botReply]);
    }, 800);
  };

  const getBotReply = (msg) => {
    const lower = msg.toLowerCase();
    if (lower.includes('book') || lower.includes('appointment'))
      return "Great! You can book directly on our website at /booking — or call us at +91 98765 43210. We'd love to have you in! 🖤";
    if (lower.includes('price') || lower.includes('cost') || lower.includes('pricing'))
      return "Prices start at ₹2,000 for micro tattoos and go up depending on size and style. Check out our full pricing page! 💰";
    if (lower.includes('artist'))
      return "We have 4 master artists — Rajan, Priya, Vikram, and Kavya. Each specializes in different styles. Visit the Artists page to see their work! 🎨";
    if (lower.includes('aftercare') || lower.includes('heal'))
      return "Proper aftercare is crucial for a beautiful healed tattoo! Check our Aftercare page for full instructions. 🌿";
    return "Thanks for reaching out! Our team will get back to you shortly. You can also WhatsApp us for a faster response. 🚀";
  };

  return (
    <>
      {/* WhatsApp Float */}
      <a
        href="https://wa.me/919876543210?text=Hi%20INK%20DYNASTY!%20I%20want%20to%20book%20an%20appointment."
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="WhatsApp"
        title="Chat on WhatsApp"
      >
        <FaWhatsapp size={24} />
      </a>

      {/* Live Chat Button */}
      <motion.button
        className="live-chat-btn"
        onClick={() => setIsOpen((v) => !v)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open live chat"
        id="live-chat-toggle"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span key="close" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
              <FiX size={22} />
            </motion.span>
          ) : (
            <motion.span key="open" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
              <FiMessageCircle size={22} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chat-window"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          >
            {/* Header */}
            <div className="chat-header">
              <div className="chat-avatar">🖋️</div>
              <div>
                <div className="chat-name">INK DYNASTY Support</div>
                <div className="chat-status">
                  <span className="online-dot" /> Online — replies instantly
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="chat-messages" id="chat-messages">
              {messages.map((msg) => (
                <div key={msg.id} className={`chat-msg ${msg.from}`}>
                  <div className="chat-bubble">{msg.text}</div>
                </div>
              ))}
            </div>

            {/* Quick Replies */}
            <div className="chat-quick-replies">
              {quickReplies.map((q) => (
                <button key={q} className="quick-reply-btn" onClick={() => sendMessage(q)}>
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="chat-input-row">
              <input
                className="chat-input"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                id="chat-input-field"
              />
              <button className="chat-send-btn" onClick={() => sendMessage()} aria-label="Send">
                <FiSend size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .chat-window {
          position: fixed;
          bottom: 90px;
          right: 24px;
          width: 340px;
          max-height: 520px;
          background: var(--color-bg-1);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-xl);
          box-shadow: 0 20px 60px rgba(0,0,0,0.6);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          z-index: 997;
        }

        .chat-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 20px;
          background: linear-gradient(135deg, var(--color-primary), #ff6b00);
        }

        .chat-avatar {
          width: 40px;
          height: 40px;
          background: rgba(255,255,255,0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
        }

        .chat-name {
          font-weight: 700;
          font-size: 0.95rem;
          color: white;
        }

        .chat-status {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.8);
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .online-dot {
          width: 7px;
          height: 7px;
          background: #00ff88;
          border-radius: 50%;
          display: inline-block;
        }

        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .chat-msg {
          display: flex;
        }

        .chat-msg.bot { justify-content: flex-start; }
        .chat-msg.user { justify-content: flex-end; }

        .chat-bubble {
          max-width: 80%;
          padding: 10px 14px;
          border-radius: 16px;
          font-size: 0.88rem;
          line-height: 1.5;
        }

        .chat-msg.bot .chat-bubble {
          background: var(--color-surface-2);
          color: var(--color-text);
          border-bottom-left-radius: 4px;
        }

        .chat-msg.user .chat-bubble {
          background: linear-gradient(135deg, var(--color-primary), #ff6b00);
          color: white;
          border-bottom-right-radius: 4px;
        }

        .chat-quick-replies {
          padding: 8px 12px;
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          border-top: 1px solid var(--color-border);
        }

        .quick-reply-btn {
          font-size: 0.75rem;
          padding: 5px 12px;
          border-radius: 20px;
          background: rgba(255,61,0,0.1);
          border: 1px solid rgba(255,61,0,0.3);
          color: var(--color-primary-light);
          cursor: pointer;
          transition: all 0.2s;
          font-family: var(--font-body);
        }

        .quick-reply-btn:hover {
          background: rgba(255,61,0,0.2);
          border-color: var(--color-primary);
          color: white;
        }

        .chat-input-row {
          display: flex;
          gap: 8px;
          padding: 12px 16px;
          border-top: 1px solid var(--color-border);
        }

        .chat-input {
          flex: 1;
          padding: 10px 14px;
          background: var(--color-bg-2);
          border: 1px solid var(--color-border);
          border-radius: 20px;
          color: var(--color-text);
          font-size: 0.88rem;
          transition: border-color 0.3s;
        }

        .chat-input:focus { border-color: var(--color-primary); outline: none; }
        .chat-input::placeholder { color: var(--color-text-dim); }

        .chat-send-btn {
          width: 38px;
          height: 38px;
          background: linear-gradient(135deg, var(--color-primary), #ff6b00);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          cursor: pointer;
          flex-shrink: 0;
          transition: transform 0.2s;
        }

        .chat-send-btn:hover { transform: scale(1.1); }

        @media (max-width: 400px) {
          .chat-window { width: calc(100vw - 32px); right: 16px; }
        }
      `}</style>
    </>
  );
}

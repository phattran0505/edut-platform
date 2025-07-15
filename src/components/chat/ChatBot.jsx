import { useState, useRef, useEffect } from "react";
import { FiMessageSquare, FiX, FiSend } from "react-icons/fi";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      content:
        "Xin chào! Tôi là trợ lý AI, tôi có thể giúp bạn tìm khóa học phù hợp. Bạn đang quan tâm đến lĩnh vực nào?",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const selectedProduct = useSelector(
    (state) => state.products.selectedProduct
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Thêm tin nhắn của user
    const userMessage = {
      id: messages.length + 1,
      type: "user",
      content: inputMessage,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    inputRef.current?.focus();

    // giả lập AI đang trả lời
    try {
      const response = await axios.post("/api/v1/chatbot", {
        message: inputMessage,
      });
      const data = response.data;
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          type: "bot",
          content: data,
        },
      ]);
    } catch (error) {
      toast.error("Lỗi khi tạo phản hồi AI");
    }
    setIsTyping(false);
  };

  return (
    <div
      className={`chatbot-container ${
        selectedProduct ? "sm:block hidden" : ""
      }`}
    >
      {/* chatbot button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="chatbot-button"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <FiX size={20} className="sm:w-6 sm:h-6" />
        ) : (
          <FiMessageSquare size={20} className="sm:w-6 sm:h-6" />
        )}
      </button>

      {/* chatbot window */}
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3 className="text-base sm:text-lg font-semibold">Trợ lý AI</h3>
            <p className="text-xs sm:text-sm text-blue-100">
              Hỗ trợ tìm khóa học phù hợp
            </p>
          </div>

          <div className="chatbot-messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`chatbot-message ${
                  message.type === "user"
                    ? "chatbot-message-user"
                    : "chatbot-message-bot"
                }`}
              >
                <p className="text-sm sm:text-base whitespace-pre-line">
                  {message.content}
                </p>
              </div>
            ))}
            {isTyping && (
              <div className="chatbot-message chatbot-message-bot">
                <p className="text-sm">AI đang trả lời...</p>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={handleSendMessage}
            className="chatbot-input-container"
          >
            <div className="flex gap-2">
              <input
                type="text"
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Nhập tin nhắn..."
                className="chatbot-input"
              />
              <button
                type="submit"
                className="chatbot-send-button"
                disabled={!inputMessage.trim() || isTyping}
                aria-label="Send message"
              >
                <FiSend size={18} className="sm:w-5 sm:h-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot;

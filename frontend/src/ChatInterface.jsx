import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./ChatInterface.css";

// AI Character options
const AI_CHARACTERS = [
  {
    id: 'luna',
    name: 'Luna',
    avatar: '🌙',
    color: '#9c27b0',
    description: 'Calm & Empathetic',
    greeting: "Hi, I'm Luna. I'm here to listen and support you through whatever you're experiencing. How are you feeling today?"
  },
  {
    id: 'sage',
    name: 'Sage',
    avatar: '🧘',
    color: '#00897b',
    description: 'Mindful & Wise',
    greeting: "Greetings, I'm Sage. Let's find peace and clarity together. What's on your mind?"
  },
  {
    id: 'hope',
    name: 'Hope',
    avatar: '🌟',
    color: '#ff6f00',
    description: 'Positive & Uplifting',
    greeting: "Hello! I'm Hope, and I believe in your strength. Every day is a new opportunity. How can I support you today?"
  },
  {
    id: 'echo',
    name: 'Echo',
    avatar: '💙',
    color: '#1976d2',
    description: 'Understanding & Patient',
    greeting: "Hey there, I'm Echo. I'm here to understand and walk with you. What would you like to talk about?"
  }
];

export default function ChatInterface() {
  const navigate = useNavigate();
  
  // Load character preference
  const [selectedCharacter, setSelectedCharacter] = useState(() => {
    const saved = localStorage.getItem('mindwell_selected_character');
    return saved ? JSON.parse(saved) : AI_CHARACTERS[0];
  });
  
  const [showCharacterSelect, setShowCharacterSelect] = useState(false);
  
  // Load messages from localStorage or use default welcome message
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem('mindwell_chat_messages');
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages);
        // Convert timestamp strings back to Date objects
        return parsed.map(msg => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
      } catch (error) {
        console.error('Error loading chat history:', error);
      }
    }
    // Default welcome message if no history
    return [
      {
        id: 1,
        text: selectedCharacter.greeting,
        sender: "ai",
        timestamp: new Date()
      }
    ];
  });
  
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('mindwell_chat_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Crisis keywords detection
  const detectCrisisKeywords = (text) => {
    const lowerText = text.toLowerCase();
    const crisisKeywords = [
      'suicide', 'suicidal', 'kill myself', 'end my life', 'want to die',
      'self-harm', 'self harm', 'cut myself', 'hurt myself', 'harm myself'
    ];
    
    return crisisKeywords.some(keyword => lowerText.includes(keyword));
  };

  // Simple AI response generator
  const generateAIResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Crisis response
    if (detectCrisisKeywords(userMessage)) {
      return `I hear that you're going through a very difficult time, and I'm concerned about your safety. Please know that you don't have to face this alone.

🆘 **Please reach out for immediate professional help:**
• National Suicide Prevention Lifeline: 1-800-273-8255
• Crisis Text Line: Text HOME to 741741
• Emergency Services: 119

If you're outside the US, please contact your local emergency services or crisis hotline.

I'm here to listen, but professional help is crucial right now. Would you like me to help you find local mental health resources?`;
    }

    // Greeting responses
    if (lowerMessage.match(/\b(hi|hello|hey|good morning|good afternoon|good evening)\b/)) {
      return "Hello! I'm glad you're here. This is a safe space to share your thoughts and feelings. What's on your mind today?";
    }

    // Anxiety responses
    if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety') || lowerMessage.includes('worried') || lowerMessage.includes('nervous')) {
      return "I understand that anxiety can feel overwhelming. Let's take a moment together. Try this: Take a deep breath in for 4 counts, hold for 4, and exhale for 4. 🌬️\n\nWhat specific thoughts or situations are making you feel anxious right now? Sometimes talking about them can help.";
    }

    // Depression/sadness responses
    if (lowerMessage.includes('depressed') || lowerMessage.includes('sad') || lowerMessage.includes('down') || lowerMessage.includes('hopeless')) {
      return "I'm sorry you're feeling this way. Your feelings are valid, and it's okay to not be okay sometimes. 💙\n\nRemember that difficult feelings don't last forever, even when they feel overwhelming. What's one small thing that brought you even a tiny bit of comfort recently?";
    }

    // Stress responses
    if (lowerMessage.includes('stress') || lowerMessage.includes('overwhelmed') || lowerMessage.includes('pressure')) {
      return "Stress can feel like too much to carry. Let's break it down together. 🌱\n\nWhat's the main thing causing you stress right now? Sometimes naming it helps us see it more clearly. And remember, it's okay to take things one step at a time.";
    }

    // Loneliness responses
    if (lowerMessage.includes('lonely') || lowerMessage.includes('alone') || lowerMessage.includes('isolated')) {
      return "Feeling lonely can be really painful. Thank you for reaching out and sharing that with me. You're not alone in this moment - I'm here with you. 🤝\n\nIs there something specific that's making you feel this way, or has it been building up over time?";
    }

    // Sleep issues
    if (lowerMessage.includes('sleep') || lowerMessage.includes('insomnia') || lowerMessage.includes("can't sleep")) {
      return "Sleep difficulties can really impact how we feel. Here are some gentle suggestions: 😴\n\n• Try our Sleep Sounds section in the Support page\n• Avoid screens 1 hour before bed\n• Practice deep breathing exercises\n• Keep your bedroom cool and dark\n\nWhat time do you usually try to sleep?";
    }

    // Positive check-ins
    if (lowerMessage.includes('better') || lowerMessage.includes('good') || lowerMessage.includes('great') || lowerMessage.includes('happy')) {
      return "That's wonderful to hear! I'm glad you're feeling positive. 😊 What's contributing to these good feelings? Recognizing what helps us feel better is so important.";
    }

    // Gratitude/thank you
    if (lowerMessage.includes('thank') || lowerMessage.includes('thanks') || lowerMessage.includes('appreciate')) {
      return "You're very welcome. I'm here whenever you need support. Remember, reaching out is a sign of strength, not weakness. Take care of yourself! 💚";
    }

    // Help seeking
    if (lowerMessage.includes('help') || lowerMessage.includes('support') || lowerMessage.includes('advice')) {
      return "I'm here to support you. While I can provide emotional support and listening, for personalized professional guidance, I recommend:\n\n• Booking an appointment with one of our counselors\n• Exploring our Support page for helpful resources\n• Checking out our mindfulness exercises\n\nWhat kind of support are you looking for today?";
    }

    // Default empathetic response
    const defaultResponses = [
      "I hear you. Can you tell me more about what you're experiencing?",
      "Thank you for sharing that with me. What you're feeling matters. Would you like to talk more about it?",
      "It sounds like you're going through something difficult. I'm here to listen. What's been the hardest part for you?",
      "I appreciate you opening up. Your feelings are valid. How long have you been feeling this way?",
      "That sounds challenging. Remember, you're not alone in this. What do you think might help you feel a bit better right now?"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSend = async () => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: inputText,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        text: generateAIResponse(inputText),
        sender: "ai",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChatHistory = () => {
    if (window.confirm('Are you sure you want to clear all chat history? This cannot be undone.')) {
      const welcomeMessage = {
        id: 1,
        text: selectedCharacter.greeting,
        sender: "ai",
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
      localStorage.removeItem('mindwell_chat_messages');
    }
  };

  const handleCharacterChange = (character) => {
    setSelectedCharacter(character);
    localStorage.setItem('mindwell_selected_character', JSON.stringify(character));
    setShowCharacterSelect(false);
    
    // Add a message from the new character
    const characterIntro = {
      id: Date.now(),
      text: `${character.greeting}`,
      sender: "ai",
      timestamp: new Date()
    };
    setMessages(prev => [...prev, characterIntro]);
  };

  return (
    <div className="chat-interface">
      <div className="chat-header">
        <button className="back-btn-chat" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <div className="header-info">
          <div className="character-display" onClick={() => setShowCharacterSelect(!showCharacterSelect)}>
            <span className="character-avatar" style={{ backgroundColor: selectedCharacter.color }}>
              {selectedCharacter.avatar}
            </span>
            <div className="character-info">
              <h2>{selectedCharacter.name}</h2>
              <span className="character-desc">{selectedCharacter.description}</span>
            </div>
          </div>
          <span className="status-indicator">● Online</span>
        </div>
        <button className="clear-btn-chat" onClick={clearChatHistory} title="Clear chat history">
          🗑️
        </button>
      </div>

      {/* Character Selection Modal */}
      {showCharacterSelect && (
        <div className="character-select-modal">
          <div className="modal-content">
            <h3>Choose Your Support Companion</h3>
            <div className="character-grid">
              {AI_CHARACTERS.map(char => (
                <div
                  key={char.id}
                  className={`character-card ${selectedCharacter.id === char.id ? 'selected' : ''}`}
                  onClick={() => handleCharacterChange(char)}
                  style={{ borderColor: char.color }}
                >
                  <div className="char-avatar" style={{ backgroundColor: char.color }}>
                    {char.avatar}
                  </div>
                  <h4>{char.name}</h4>
                  <p>{char.description}</p>
                </div>
              ))}
            </div>
            <button className="modal-close" onClick={() => setShowCharacterSelect(false)}>×</button>
          </div>
        </div>
      )}

      <div className="chat-disclaimer">
        ⚠️ This chat provides emotional support, not medical advice.
      </div>

      <div className="chat-messages">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.sender}`}>
            <div 
              className="message-avatar"
              style={message.sender === 'ai' ? { backgroundColor: selectedCharacter.color } : {}}
            >
              {message.sender === 'ai' ? selectedCharacter.avatar : '👤'}
            </div>
            <div className="message-content">
              <div className="message-text">{message.text}</div>
              <div className="message-time">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="message ai">
            <div className="message-avatar" style={{ backgroundColor: selectedCharacter.color }}>
              {selectedCharacter.avatar}
            </div>
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-container">
        <textarea
          className="chat-input"
          placeholder="Type your message here..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          rows="2"
        />
        <button 
          className="send-btn" 
          onClick={handleSend}
          disabled={!inputText.trim()}
        >
          Send 📤
        </button>
      </div>
    </div>
  );
}

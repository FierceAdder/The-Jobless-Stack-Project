const chatResponses = {
    'hello': 'Hi! How can I help you today?',
    'hi': 'Hello! How can I assist you?',
    'help': 'I can help you with information about our services, crop recommendations, and more. What would you like to know?',
    'services': 'We offer various services including crop recommendations, weather forecasting, equipment information, and modern farming techniques.',
    'contact': 'You can reach us through our social media channels or email us at your.email@example.com',
    'crops': 'We provide information about various crops, their growing conditions, and recommendations based on weather.',
    'weather': 'Our crop support system provides real-time weather data and crop suitability analysis.',
    'equipment': 'We offer information about various agricultural equipment and machinery through our equipment section.',
    'default': 'I apologize, but I\'m not sure about that. Would you like to know about our services, crop recommendations, or contact information?'
};

function toggleChat() {
    const chatContainer = document.getElementById('chatContainer');
    chatContainer.style.display = chatContainer.style.display === 'none' || chatContainer.style.display === '' ? 'flex' : 'none';
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function sendMessage() {
    const input = document.getElementById('userInput');
    const message = input.value.trim().toLowerCase();
    
    if (message === '') return;

    // Add user message
    addMessage(input.value, 'user');
    input.value = '';

    // Get and add bot response
    setTimeout(() => {
        const response = getBotResponse(message);
        addMessage(response, 'bot');
    }, 500);
}

function addMessage(text, sender) {
    const messages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    messageDiv.textContent = text;
    messages.appendChild(messageDiv);
    messages.scrollTop = messages.scrollHeight;
}

function getBotResponse(message) {
    // Check for keywords in the message
    for (let key in chatResponses) {
        if (message.includes(key)) {
            return chatResponses[key];
        }
    }
    return chatResponses.default;
}
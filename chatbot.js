const chatResponses = {
    'hello': 'Hi! How can I help you today?',
    'hi': 'Hello! How can I assist you?',
    'help': 'I can help you with information about our services, crop recommendations, and more. What would you like to know?',
    'services': 'We offer various services including crop recommendations, weather forecasting, equipment information, and modern farming techniques.',
    'contact': 'You can reach us through our social media channels or email us at your.email@example.com',
    'crops': 'We provide information about various crops, their growing conditions, and recommendations based on weather.',
    'weather': 'Our crop support system provides real-time weather data and crop suitability analysis.',
    'appointment': 'we offer facilities to connect you directly through doctor please visit the appointment section for further enquiries',
    'medicine':'government of india offers facilities to buy generic medicines at low cost please visit the medicine section for further enquiries',
    'school':'if you are a school students we offer study material for different classes please visit the school section for further enquiries',
    'competitive exam':'for study materials of competitive exams please visit the school section for further enquiries',
    'professional':'for learning professions we also recommend some courses please visit the proffesional section for further enquiries',
    'exam updates': 'for exam updates visit exam updates section',
    'skill' :'for learning genera skills we also recommend some courses please visit the skils section for further enquiries',
    'learn finance' : 'for learning finance we have a trading platform course  please visit the learn section for further enquiries',
    'invest':'for investing we recommend a free platform please visit the learn invest for further enquiries',
    'loan': 'for loans we provide links to trusted government banks please visit the loan section for further enquiries',
    'emi calculator':'for calculating emi we have our own calculator please visit the loan section for further enquiries',
    'crop support':'for predicting the weather and protecting the crops we have our exclusive crop support system please visit the crop support section for further enquiries',
    'equipments':'for buying agriculture equipments we offer major category please visit the equipments section for further enquiries',
    'modern technology':'for accesing information about various technology applied in agriculture visit modern technology section',
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
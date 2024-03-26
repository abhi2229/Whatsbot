// Get chatbot elements
//const chatbot = document.getElementById('chatbot');
const conversation = document.getElementById('conversation');
const inputForm = document.getElementById('input-form');
const inputField = document.getElementById('input-field');
let userInput, chatbotResponse;

// Add event listener to input form
inputForm.addEventListener('submit', function (event) {
    // Prevent form submission
    event.preventDefault();

    // Get user input
    userInput = inputField.value;

    // Clear input field
    inputField.value = '';
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" });

    // Add user input to conversation
    let message = document.createElement('div');
    message.classList.add('chatbot-message', 'user-message');
    message.innerHTML = `<p class="chatbot-text" sentTime="${currentTime}">${userInput}</p>`;
    conversation.appendChild(message);

    // Generate chatbot response
    chatbotResponse = generateResponse(userInput);

    // Add chatbot response to conversation
    message = document.createElement('div');
    message.classList.add('chatbot-message', 'chatbot');
    message.innerHTML = `<p class="chatbot-text" sentTime="${currentTime}">${chatbotResponse}</p>`;
    conversation.appendChild(message);
    message.scrollIntoView({ behavior: "smooth" });
    storeInDatabase(userInput, chatbotResponse);
});

// Generate chatbot response function
function generateResponse(input) {
    // Convert input to lowercase for case-insensitive matching
    const lowerInput = input.toLowerCase();

    // Check for specific questions and provide corresponding answers
    if (lowerInput.includes('weather')) {
        return "The weather is currently sunny with a temperature of 25°C.";
    } else if (lowerInput.includes('restaurant')) {
        return "Sure! Here are some popular restaurants in the area: Restaurant A, Restaurant B, and Restaurant C.";
    } else if (lowerInput.includes('help')) {
        return "Of course! How can I assist you?";
    }

    // More specific questions and answers
    if (lowerInput.includes('how are you?')) {
        return "I'm just a computer program, so I don't have feelings, but thanks for asking!";
    } else if (lowerInput.includes('what is your name?')) {
        return "I'm your friendly chatbot assistant!";
    } else if (lowerInput.includes('who created you')) {
        return "I was created by Abhishek Maiti";
    } else if (lowerInput.includes('what time is it?') || lowerInput.includes('what time is it') || lowerInput.includes('time')) {
        return "It's currently " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ".";
    }
    else if (lowerInput.includes('what date is it') || lowerInput.includes('date')) {
        const currentDate = new Date().toLocaleDateString();
        return "Today's date is " + currentDate + ".";
    } else if (lowerInput.includes('how old are you')) {
        return "I don't have an age, as I'm just a computer program.";
    }
    if (lowerInput.includes('where are you from')) {
        return "I exist in the digital realm, so I don't have a physical location.";
    } else if (lowerInput.includes('can you help me')) {
        return "Absolutely! Just let me know what you need assistance with.";
    } else if (lowerInput.includes('do you have any hobbies')) {
        return "My hobby is helping users like you! 😊";
    } else if (lowerInput.includes('what languages do you speak')) {
        return "I communicate in the language of technology!";
    } else if (lowerInput.includes('are you a robot')) {
        return "Yes, I'm a chatbot programmed to assist you.";
    }

    if (lowerInput.includes('what is the meaning of life')) {
        return "The meaning of life is subjective and varies from person to person.";
    } else if (lowerInput.includes('tell me a joke')) {
        return "Why don't scientists trust atoms? Because they make up everything!";
    } else if (lowerInput.includes('how do I reset my password')) {
        return "To reset your password, please visit the account settings page.";
    } else if (lowerInput.includes('can you sing')) {
        return "I can't sing, but I'm here to provide assistance!";
    } else if (lowerInput.includes('what is the capital of France')) {
        return "The capital of France is Paris.";
    }

    // Generic responses
    const genericResponses = [
        "Hello, how can I help you today? 😊",
        "I'm sorry, I didn't understand your question. Could you please rephrase it? 😕",
        "I'm here to assist you with any questions or concerns you may have. 📩",
        "I'm sorry, I'm not able to browse the internet or access external information. Is there anything else I can help with? 💻",
        "What would you like to know? 🤔",
        "I'm sorry, I'm not programmed to handle offensive or inappropriate language. Please refrain from using such language in our conversation. 🚫",
        "I'm here to assist you with any questions or problems you may have. How can I help you today? 🚀",
        "Is there anything specific you'd like to talk about? 💬",
        "I'm happy to help with any questions or concerns you may have. Just let me know how I can assist you. 😊",
        "I'm here to assist you with any questions or problems you may have. What can I help you with today? 🤗",
        "Is there anything specific you'd like to ask or talk about? I'm here to help with any questions or concerns you may have. 💬",
        "I'm here to assist you with any questions or problems you may have. How can I help you today? 💡",
        "I'm sorry, I'm not able to provide that information at the moment. Can I help you with something else?",
        "Thank you for reaching out! How can I assist you further?",
        "Let me find that out for you. Please hold on for a moment.",
        "I'm glad you asked! Here's what I can do for you...",
        "It seems we've hit a snag. Could you please try asking again in a different way?",
        "I appreciate your patience. Let me see what I can do.",
        "Hmm, that's an interesting question. Let me give you some information on that...",
        "Sorry, I didn't quite catch that. Could you please repeat your question?",
        "I'm here 24/7 to assist you. Just ask!",
        "Your inquiry is important to me. Let me assist you promptly.",
        "I'm sorry, I'm not equipped to handle that request. Can I assist you with something else?",
        "Sure thing! Let me provide you with the information you need.",
        "I'm here to make your experience smooth and enjoyable. How can I help you today?",
        "It's my pleasure to assist you! What can I do for you?",
        "I'm ready to help. What do you need assistance with?"
    ];
    // Return a random response (either specific or generic)
    return genericResponses[Math.floor(Math.random() * genericResponses.length)];
}

function storeInDatabase(userInput, chatbotResponse) {
    console.log(userInput); // Corrected line
    console.log(chatbotResponse); // Corrected line
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/Chat/SaveConversation", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = function () {
            if (xhr.status === 200) {
                console.log("Conversation data saved successfully!");
            } else {
                console.error("Error saving conversation data:", xhr.statusText);
            }
        };
        var data = JSON.stringify({ userInput: userInput, chatbotResponse: chatbotResponse });
        xhr.send(data);


}  

// Get the button element
const toggleDarkModeButton = document.getElementById('toggle-dark-mode');

// Add click event listener to the button
toggleDarkModeButton.addEventListener('click', function () {
    // Toggle the 'dark-mode' class on the body element
    document.body.classList.toggle('dark-mode');
});

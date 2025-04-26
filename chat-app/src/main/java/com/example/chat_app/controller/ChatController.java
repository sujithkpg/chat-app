package com.example.chat_app.controller;

import com.example.chat_app.model.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {
    private final SimpMessagingTemplate messagingTemplate;

    public ChatController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    // This handles WebSocket messages from the client
    @MessageMapping("/sendMessage")
    public void sendMessage(Message message) {
        // Send the message to a specific user (via SimpMessagingTemplate)
        messagingTemplate.convertAndSendToUser(message.getRecipient(), "/queue/reply", message);
    }

    // Optionally, broadcast a message to all connected clients
    @MessageMapping("/broadcastMessage")
    public void broadcastMessage(Message message) {
        messagingTemplate.convertAndSend("/topic/messages", message);
    }
}

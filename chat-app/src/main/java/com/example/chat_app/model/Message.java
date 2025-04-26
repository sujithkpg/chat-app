package com.example.chat_app.model;

public class Message {
    private String sender;
    private String recipient;
    private String content;

    // Default constructor
    public Message() {
    }

    // Constructor
    public Message(String sender, String recipient, String content) {
        this.sender = sender;
        this.recipient = recipient;
        this.content = content;
    }

    // Getters and Setters
    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getRecipient() {
        return recipient;
    }

    public void setRecipient(String recipient) {
        this.recipient = recipient;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    // toString method for easy debugging
    @Override
    public String toString() {
        return "Message [sender=" + sender + ", recipient=" + recipient + ", content=" + content + "]";
    }
}

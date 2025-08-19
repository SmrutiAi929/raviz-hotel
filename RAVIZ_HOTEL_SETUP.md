# RAVIZ Hotel Voice Agent 2.0 - Setup Guide

## Overview

This project implements a production-grade Voice AI Agent for RAVIZ HOTEL, aimed at automating inbound customer interactions. The system improves operational efficiency, enhances guest experience, and reduces manual intervention by deploying an AI-powered voice assistant capable of handling defined hotel use cases.

## Features

### 🏨 **Guest Onboarding Agent**
- Welcome guests and confirm reservations
- Collect essential guest information systematically
- Handle special requests and preferences
- Provide information about hotel amenities
- Escalate complex issues appropriately

### 🎯 **Concierge Agent**
- Handle room service orders and requests
- Assist with amenity and facility inquiries
- Provide information about hotel services and local attractions
- Coordinate with housekeeping and maintenance departments
- Handle special requests and arrangements

### 🖥️ **Front Desk Agent**
- Manage check-in and check-out processes
- Handle billing and payment inquiries
- Assist with reservation modifications
- Manage guest accounts and preferences
- Handle complaints and issue escalation

### 👤 **Human Agent Simulation**
- Handle complex guest complaints and issues
- Provide personalized assistance for special situations
- Manage escalated requests and urgent matters
- Offer human empathy and understanding

## Data Collection Fields

The system collects the following guest information:

| Field | Description | Status |
|-------|-------------|---------|
| Guest Name | Full name of the guest | ✅ |
| Reservation Number | Booking ID/confirmation number | ✅ |
| Check-in Date | Arrival date | ✅ |
| Check-out Date | Departure date | ✅ |
| Room Number/Type | Room details and category | ✅ |
| Number of Guests | Total guests in the booking | ✅ |
| Contact Number | Primary phone number | ✅ |
| Email ID | Primary email address | ✅ |
| Special Requests | Early check-in, high floor, adjoining rooms | ✅ |
| Airport Pickup | Transportation requirements and flight details | ✅ |
| Food Preferences | Dietary restrictions and meal preferences | ✅ |
| Payment Method | Preferred payment options | ✅ |
| Loyalty Program | Membership ID and benefits | ✅ |
| Complaint/Issue | Any reported problems or concerns | ✅ |
| Escalation Status | Current status of issue resolution | ✅ |
| Additional Notes | Extra information and special instructions | ✅ |

## Technical Implementation

### Architecture
- **Frontend**: React with TypeScript and Tailwind CSS
- **Voice AI**: OpenAI Realtime Agents
- **State Management**: React Context API
- **Data Collection**: Real-time form updates with progress tracking

### Key Components
1. **Transcript Panel** (Left): Real-time conversation display
2. **Data Collection Center** (Right): Live guest information tracking
3. **Agent Network**: Seamless handoff between specialized agents
4. **Progress Tracking**: Visual completion indicators and metrics

### Agent Configuration
- **Guest Onboarding**: Primary agent for initial interactions
- **Concierge Services**: Handles service requests and amenities
- **Front Desk Operations**: Manages operational processes
- **Human Intervention**: Simulates staff for complex situations

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env.local` file with your OpenAI API key:
```env
OPENAI_API_KEY=your_api_key_here
```

### 3. Run the Application
```bash
npm run dev
```

### 4. Access the Interface
Open your browser and navigate to `http://localhost:3000`

## Usage

### Starting a Session
1. Select "RAVIZHotel" from the Scenario dropdown
2. Choose your preferred agent (Guest Onboarding recommended for new guests)
3. Click "Connect" to start the voice session

### Data Collection
- The system automatically tracks conversation progress
- Guest information is captured in real-time
- Progress bar shows completion percentage
- Data can be exported as JSON for integration

### Agent Handoffs
- Seamless transitions between specialized agents
- Automatic escalation for complex issues
- Human agent simulation for sensitive situations

## Customization

### Adding New Data Fields
1. Update `src/app/contexts/DataCollectionContext.tsx`
2. Add new field to the `capturedData` array
3. Update icon mapping in `AgentVisualizer.tsx`
4. Modify agent instructions as needed

### Modifying Agent Behavior
1. Edit agent configuration files in `src/app/agentConfigs/ravizHotel/`
2. Update instructions and handoff logic
3. Test with different conversation flows

### UI Customization
1. Modify `AgentVisualizer.tsx` for layout changes
2. Update color schemes and branding in `App.tsx`
3. Customize data display formats and icons

## Integration Points

### PMS Integration
- Guest data export for Property Management Systems
- Real-time reservation updates
- Check-in/check-out status synchronization

### CRM Integration
- Guest preference tracking
- Loyalty program management
- Complaint and issue tracking

### Communication Systems
- WhatsApp/SMS integration for confirmations
- Email automation for follow-ups
- Voice call recording and transcription

## Monitoring and Analytics

### Real-time Metrics
- Call duration tracking
- Data completion rates
- Agent handoff frequency
- Issue resolution times

### Performance Indicators
- Guest satisfaction scores
- Service request completion rates
- Escalation frequency
- Response time metrics

## Support and Maintenance

### Regular Updates
- Agent instruction refinements
- New use case additions
- Performance optimizations
- Security updates

### Troubleshooting
- Voice quality issues
- Agent handoff problems
- Data collection errors
- Integration failures

## Contact Information

For technical support and questions:
- **Developer**: pragyaa.ai
- **Project**: RAVIZ Hotel Voice Agent 2.0
- **Version**: 1.0.0

---

*This system represents the future of hotel guest services, combining AI efficiency with human warmth to deliver exceptional guest experiences.*

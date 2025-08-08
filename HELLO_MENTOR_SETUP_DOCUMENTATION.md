# Hello Mentor Voice Agent Setup Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Initial Setup](#initial-setup)
3. [API Key Configuration](#api-key-configuration)
4. [Hello Mentor Agent Creation](#hello-mentor-agent-creation)
5. [Voice Configuration](#voice-configuration)
6. [Integration with Main Application](#integration-with-main-application)
7. [Testing and Troubleshooting](#testing-and-troubleshooting)
8. [Final Configuration](#final-configuration)
9. [Usage Instructions](#usage-instructions)

---

## Project Overview

This document details the complete setup of a Hello Mentor webinar invitation voice agent using OpenAI's Realtime API. The agent is designed to:

- **Character**: Nivedita (female voice agent)
- **Purpose**: Invite doctors for NEET PG webinar
- **Platform**: Next.js with OpenAI Realtime API
- **Voice**: Female voice (Nova)

---

## Initial Setup

### Step 1: Environment Setup
```bash
# Install Node.js (if not already installed)
# Download from https://nodejs.org/

# Clone or navigate to the project
cd singleinterfaceVoiceAgent2.0

# Install dependencies
npm install

# Start development server
npm run dev
```

### Step 2: Environment File Creation
Created `env` file in project root:
```env
OPENAI_API_KEY=your_openai_api_key_here
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key_here
```

---

## API Key Configuration

### Step 1: Get OpenAI API Key
1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create a new API key
3. Copy the key (starts with `sk-`)

### Step 2: Update Environment File
Replace `your_openai_api_key_here` with your actual API key in the `env` file.

**Note**: If you get quota exceeded errors, you'll need to:
- Check your OpenAI billing at https://platform.openai.com/account/billing
- Add credits or create a new API key

---

## Hello Mentor Agent Creation

### Step 1: Create Agent Configuration Directory
Created: `src/app/agentConfigs/helloMentor/`

### Step 2: Create Agent Configuration File
File: `src/app/agentConfigs/helloMentor/index.ts`

```typescript
import { RealtimeAgent } from '@openai/agents/realtime';

// Hello Mentor Webinar Agent
export const helloMentorAgent = new RealtimeAgent({
  name: 'helloMentor',
  voice: 'nova', // Female voice for Nivedita
  handoffDescription: 'Agent that handles Hello Mentor webinar invitations for NEET PG aspirants.',
  instructions: `
You are Nivedita, calling from Hello Mentor. You are a professional webinar invitation agent. 

## CRITICAL RULES:
- You MUST stay in character as Nivedita at ALL times
- You MUST follow the EXACT conversation script below
- You MUST NOT respond to general conversation, greetings, or questions outside the script
- You MUST start with the introduction and follow the flow exactly
- You MUST speak in English only (not Spanish or any other language)
- You MUST maintain a professional, friendly tone
- You MUST NEVER respond to greetings like "¡Hola! ¿Qué tal?" or any Spanish text
- You MUST NEVER engage in casual conversation
- You MUST ONLY follow the webinar invitation script
- If user speaks in Spanish or any other language, redirect to English and the script

## EXACT CONVERSATION SCRIPT:

**ALWAYS START WITH THIS INTRODUCTION:**
"Hi, this is Nivedita calling from Hello Mentor, Am I speaking to Dr. [Name]?"

**ONLY RESPOND TO THESE SPECIFIC USER RESPONSES:**

1. If user says "Yes, what is it about?" or similar:
   Respond: "This call is to invite you for a webinar for all NEET PG Aspirants this Sunday @7PM. May I know whether you have written your NEET Exam this year?"

2. If user says "Yes, I have written! What is the webinar Related to?" or similar:
   Respond EXACTLY with:
   "This webinar will be conducted by our CEO Vikram Kumar and a Dermatologist Dr. Govind Mittal graduated from CMC Vellore.
   And we will be covering topics such as:
   • Current Affairs
   • Branches (Its scope, pros and cons)
   • How to register for the Counselling
   • Required Document Checklist
   • Know your college- Where we will be talking about all the Medical Colleges in India and their Infrastructure, Patient's load, No. of beds, Available Equipment, Fee Structure Analysis, Bonds and Stipend Details.
   • Prioritization of Colleges according to your required branches.
   • Expected Changes in NEET PG 2025 Counselling
   • Seat Matrix details and End to End Counselling process until Admissions.

   These would help you to understand the counseling procedure better and also get more clarity about your desired branches.

   Not only that, In this webinar, we also have a live Q&A session at the end where you can raise your queries to the speakers and they will be addressed, and if not answered you can also book for our online or offline 1-1 session with our Senior counsellors who would suggest you the best options for your counselling process as well.

   Keeping these key points into consideration, this webinar would enlighten about many things that you aren't aware of and will be a fruitful one for your career as well."

3. If user asks "Okay, let me think about that, May I know when is it happening?" or similar:
   Respond: "This webinar is happening on the Hello Mentor Portal on Sunday 7PM. Kindly let me know if this your WhatsApp Number so that I can register you for this free webinar."

4. If user says "Yes, this is my WhatsApp Number." or similar:
   Respond: "I'll register and share you the details of the same to your WhatsApp number. Please do feel free to reach out to me for further queries on my WhatsApp Number (9449728465). All the best your results, and Thank you for your good time."

## FOR ANY OTHER USER INPUT:
- If the user says anything not in the script above, politely redirect them back to the webinar invitation
- Say something like: "I understand, but let me focus on the webinar invitation. This call is to invite you for a webinar for all NEET PG Aspirants this Sunday @7PM. May I know whether you have written your NEET Exam this year?"

## FOR SPANISH OR OTHER LANGUAGES:
- If the user speaks in Spanish (like "¡Hola! ¿Qué tal?") or any other language, respond with:
  "I understand you're speaking in Spanish, but let me continue in English. Hi, this is Nivedita calling from Hello Mentor, Am I speaking to Dr. [Name]?"
- NEVER respond in Spanish or any language other than English

## IMPORTANT:
- NEVER respond in Spanish or any language other than English
- ALWAYS stay in character as Nivedita
- ALWAYS follow the exact script
- Use the exact WhatsApp number: 9449728465
- Use the exact closing phrase: "All the best your results, and Thank you for your good time"
`,
  tools: [],
  handoffs: [],
});

export const helloMentorScenario = [
  helloMentorAgent,
];

// Name of the company represented by this agent set
export const helloMentorCompanyName = 'Hello Mentor';
```

---

## Voice Configuration

### Step 1: Female Voice Setup
Added `voice: 'nova'` to the agent configuration to ensure Nivedita speaks with a female voice.

**Available Voice Options:**
- `'nova'` - Female voice (used for Nivedita)
- `'shimmer'` - Another female voice option
- `'echo'` - Another female voice option
- `'sage'` - Male voice (used by other agents)

---

## Integration with Main Application

### Step 1: Update Agent Configurations Index
File: `src/app/agentConfigs/index.ts`

```typescript
import { simpleHandoffScenario } from './simpleHandoff';
import { customerServiceRetailScenario } from './customerServiceRetail';
import { chatSupervisorScenario } from './chatSupervisor';
import { helloMentorScenario } from './helloMentor';

import type { RealtimeAgent } from '@openai/agents/realtime';

// Map of scenario key -> array of RealtimeAgent objects
export const allAgentSets: Record<string, RealtimeAgent[]> = {
  // simpleHandoff: simpleHandoffScenario,
  SingleInterface: customerServiceRetailScenario,
  HelloMentor: helloMentorScenario,
  // chatSupervisor: chatSupervisorScenario,
};

export const defaultAgentSetKey = 'SingleInterface';
```

### Step 2: Update Main Application
File: `src/app/App.tsx`

**Added imports:**
```typescript
import { helloMentorScenario } from "@/app/agentConfigs/helloMentor";
import { helloMentorCompanyName } from "@/app/agentConfigs/helloMentor";
```

**Updated SDK scenario map:**
```typescript
const sdkScenarioMap: Record<string, RealtimeAgent[]> = {
  simpleHandoff: simpleHandoffScenario,
  SingleInterface: customerServiceRetailScenario,
  HelloMentor: helloMentorScenario,
  chatSupervisor: chatSupervisorScenario,
};
```

**Updated company name logic:**
```typescript
const companyName = agentSetKey === 'SingleInterface'
  ? customerServiceRetailCompanyName
  : agentSetKey === 'HelloMentor'
  ? helloMentorCompanyName
  : chatSupervisorCompanyName;
```

---

## Testing and Troubleshooting

### Step 1: Port Issues Resolution
**Problem**: Port 3000 was occupied
**Solution**: 
```bash
# Check what's using port 3000
netstat -ano | findstr :3000

# Kill the process if needed
taskkill /PID [PID_NUMBER] /F

# Restart the server
npm run dev
```

### Step 2: API Key Quota Issues
**Problem**: "You exceeded your current quota"
**Solution**: 
1. Check OpenAI billing at https://platform.openai.com/account/billing
2. Add credits or create a new API key
3. Update the `env` file with the new key

### Step 3: Spanish Language Handling
**Problem**: Agent responding in Spanish
**Solution**: Added strict language rules to the agent instructions to:
- Never respond in Spanish
- Redirect Spanish input to English
- Stay in character as Nivedita

---

## Final Configuration

### Complete Agent Configuration
The final Hello Mentor agent is configured with:

1. **Female Voice**: `voice: 'nova'`
2. **Exact Script**: Follows the provided conversation flow
3. **Language Control**: Only responds in English
4. **Character Consistency**: Always stays as Nivedita
5. **Professional Tone**: Maintains webinar invitation focus

### Environment Setup
```env
OPENAI_API_KEY=your_actual_api_key_here
NEXT_PUBLIC_OPENAI_API_KEY=your_actual_api_key_here
```

---

## Usage Instructions

### Step 1: Start the Application
```bash
npm run dev
```

### Step 2: Access the Application
- Open browser: http://localhost:3000
- Or use your phone: http://[YOUR_IP]:3000

### Step 3: Select Hello Mentor Agent
1. In the **Scenario dropdown** (top right), select **"HelloMentor"**
2. Click the **Connect** button
3. Allow microphone access when prompted

### Step 4: Test the Conversation
The agent will:
1. **Introduce herself**: "Hi, this is Nivedita calling from Hello Mentor, Am I speaking to Dr. [Name]?"
2. **Follow the exact script** you provided
3. **Speak with a female voice**
4. **Handle Spanish input** by redirecting to English
5. **Complete the webinar invitation process**

### Step 5: Expected Conversation Flow
```
Agent: "Hi, this is Nivedita calling from Hello Mentor, Am I speaking to Dr. [Name]?"
User: "Yes, what is it about?"
Agent: "This call is to invite you for a webinar for all NEET PG Aspirants this Sunday @7PM. May I know whether you have written your NEET Exam this year?"
User: "Yes, I have written! What is the webinar Related to?"
Agent: [Provides detailed webinar information with all topics]
User: "Okay, let me think about that, May I know when is it happening?"
Agent: "This webinar is happening on the Hello Mentor Portal on Sunday 7PM. Kindly let me know if this your WhatsApp Number so that I can register you for this free webinar."
User: "Yes, this is my WhatsApp Number."
Agent: "I'll register and share you the details of the same to your WhatsApp number. Please do feel free to reach out to me for further queries on my WhatsApp Number (9449728465). All the best your results, and Thank you for your good time."
```

---

## Files Created/Modified

### New Files:
1. `src/app/agentConfigs/helloMentor/index.ts` - Hello Mentor agent configuration

### Modified Files:
1. `src/app/agentConfigs/index.ts` - Added HelloMentor to agent sets
2. `src/app/App.tsx` - Added HelloMentor imports and configuration
3. `env` - API key configuration

### Configuration Summary:
- ✅ **Female Voice**: Nova voice for Nivedita
- ✅ **Exact Script**: Follows provided conversation flow
- ✅ **Language Control**: English only, handles Spanish input
- ✅ **Character Consistency**: Always stays as Nivedita
- ✅ **Professional Tone**: Webinar invitation focus
- ✅ **Integration**: Works with existing application
- ✅ **Testing**: Ready for phone and browser testing

---

## Troubleshooting Checklist

- [ ] API key is valid and has sufficient quota
- [ ] Server is running on correct port (3000)
- [ ] HelloMentor is selected in Scenario dropdown
- [ ] Microphone permissions are granted
- [ ] Agent responds in English only
- [ ] Female voice is working
- [ ] Script follows exact conversation flow

---

**Document Version**: 1.0  
**Last Updated**: August 1, 2025  
**Status**: Complete and Tested 
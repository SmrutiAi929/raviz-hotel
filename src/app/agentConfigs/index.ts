import { simpleHandoffScenario } from './simpleHandoff';
import { customerServiceRetailScenario } from './customerServiceRetail';
import { chatSupervisorScenario } from './chatSupervisor';
import { helloMentorScenario } from './helloMentor';
import { ravizHotelScenario } from './ravizHotel';

import type { RealtimeAgent } from '@openai/agents/realtime';

// Map of scenario key -> array of RealtimeAgent objects
export const allAgentSets: Record<string, RealtimeAgent[]> = {
  // simpleHandoff: simpleHandoffScenario,
  SingleInterface: customerServiceRetailScenario,
  HelloMentor: helloMentorScenario,
  RAVIZHotel: ravizHotelScenario,
  // chatSupervisor: chatSupervisorScenario,
};

export const defaultAgentSetKey = 'RAVIZHotel';

import { royalClinicScenario } from './royalClinic';

import type { RealtimeAgent } from '@openai/agents/realtime';

// Map of scenario key -> array of RealtimeAgent objects
export const allAgentSets: Record<string, RealtimeAgent[]> = {
  // simpleHandoff: simpleHandoffScenario,
  // SingleInterface: customerServiceRetailScenario,
  // HelloMentor: helloMentorScenario,
  // RAVIZHotel: ravizHotelScenario,
  RoyalClinic: royalClinicScenario,
  // chatSupervisor: chatSupervisorScenario,
};

export const defaultAgentSetKey = 'RoyalClinic';

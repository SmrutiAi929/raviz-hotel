"use client";

import React, { createContext, useContext, useState, FC, PropsWithChildren } from 'react';

export interface DataPoint {
  id: string;
  name: string;
  value: string | null;
  status: 'pending' | 'captured' | 'verified';
  timestamp?: Date;
}

interface DataCollectionContextValue {
  capturedData: DataPoint[];
  captureDataPoint: (dataId: string, value: string, status?: 'captured' | 'verified') => void;
  updateDataPoint: (dataId: string, updates: Partial<DataPoint>) => void;
  resetAllData: () => void;
  getCompletionPercentage: () => number;
  getCapturedCount: () => number;
  exportData: () => any;
}

const DataCollectionContext = createContext<DataCollectionContextValue | undefined>(undefined);

export const useDataCollection = () => {
  const context = useContext(DataCollectionContext);
  if (context === undefined) {
    throw new Error('useDataCollection must be used within a DataCollectionProvider');
  }
  return context;
};

export const DataCollectionProvider: FC<PropsWithChildren> = ({ children }) => {
  const [capturedData, setCapturedData] = useState<DataPoint[]>([
    { id: 'guest_name', name: 'Guest Name', value: null, status: 'pending' },
    { id: 'reservation_number', name: 'Reservation Number / Booking ID', value: null, status: 'pending' },
    { id: 'check_in_date', name: 'Check-in Date', value: null, status: 'pending' },
    { id: 'check_out_date', name: 'Check-out Date', value: null, status: 'pending' },
    { id: 'room_number_type', name: 'Room Number / Type', value: null, status: 'pending' },
    { id: 'number_of_guests', name: 'Number of Guests', value: null, status: 'pending' },
    { id: 'contact_number', name: 'Contact Number', value: null, status: 'pending' },
    { id: 'email_id', name: 'Email ID', value: null, status: 'pending' },
    { id: 'special_requests', name: 'Special Requests', value: null, status: 'pending' },
    { id: 'airport_pickup', name: 'Airport Pickup Requirement', value: null, status: 'pending' },
    { id: 'food_preferences', name: 'Food Preferences', value: null, status: 'pending' },
    { id: 'payment_method', name: 'Payment Method', value: null, status: 'pending' },
    { id: 'loyalty_program', name: 'Loyalty Program / Membership ID', value: null, status: 'pending' },
    { id: 'complaint_issue', name: 'Complaint / Issue Logged', value: null, status: 'pending' },
    { id: 'escalation_status', name: 'Escalation Status', value: null, status: 'pending' },
    { id: 'additional_notes', name: 'Additional Notes', value: null, status: 'pending' },
  ]);

  const captureDataPoint = (dataId: string, value: string, status: 'captured' | 'verified' = 'captured') => {
    console.log(`[DataCollection] Capturing ${dataId}: ${value}`);
    setCapturedData(prev => prev.map(item => 
      item.id === dataId 
        ? { ...item, value, status, timestamp: new Date() }
        : item
    ));
  };

  const updateDataPoint = (dataId: string, updates: Partial<DataPoint>) => {
    setCapturedData(prev => prev.map(item => 
      item.id === dataId 
        ? { ...item, ...updates, timestamp: new Date() }
        : item
    ));
  };

  const resetAllData = () => {
    setCapturedData(prev => prev.map(item => ({
      ...item,
      value: null,
      status: 'pending' as const,
      timestamp: undefined
    })));
  };

  const getCompletionPercentage = () => {
    const capturedCount = capturedData.filter(item => item.status === 'captured' || item.status === 'verified').length;
    return Math.round((capturedCount / capturedData.length) * 100);
  };

  const getCapturedCount = () => {
    return capturedData.filter(item => item.status === 'captured' || item.status === 'verified').length;
  };

  const exportData = () => {
    return capturedData
      .filter(item => item.value)
      .reduce((acc, item) => {
        acc[item.name] = {
          value: item.value,
          timestamp: item.timestamp?.toISOString(),
          status: item.status
        };
        return acc;
      }, {} as any);
  };

  const value: DataCollectionContextValue = {
    capturedData,
    captureDataPoint,
    updateDataPoint,
    resetAllData,
    getCompletionPercentage,
    getCapturedCount,
    exportData,
  };

  return (
    <DataCollectionContext.Provider value={value}>
      {children}
    </DataCollectionContext.Provider>
  );
}; 
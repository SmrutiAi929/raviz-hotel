import React from 'react';
import {
  UserCircleIcon,
  ClipboardDocumentListIcon,
  ArrowDownTrayIcon,
  ShareIcon,
  ClockIcon,
  CheckCircleIcon,
  BuildingOfficeIcon,
  PhoneIcon,
  MapPinIcon,
  EnvelopeIcon,
  IdentificationIcon,
  CalendarIcon,
  UserIcon,
  HomeIcon,
  GlobeAltIcon,
  CreditCardIcon,
  TruckIcon,
  UsersIcon,
  StarIcon,
  ExclamationTriangleIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/solid';
import { useDataCollection } from '../contexts/DataCollectionContext';

const AgentVisualizer = ({ isExpanded }: { isExpanded: boolean }) => {
  const { 
    capturedData, 
    getCompletionPercentage, 
    getCapturedCount, 
    exportData,
    captureDataPoint // For demo purposes
  } = useDataCollection();

  if (!isExpanded) {
    return null;
  }

  // Calculate completion percentage
  const completionPercentage = getCompletionPercentage();
  const capturedCount = getCapturedCount();

  // Download collected data as JSON
  const downloadData = () => {
    const collectedData = exportData();
    const dataStr = JSON.stringify(collectedData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `raviz-hotel-guest-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Icon mapping for data points
  const getDataPointIcon = (dataId: string) => {
    const iconMap: Record<string, React.ComponentType<any>> = {
      'guest_name': UserIcon,
      'reservation_number': IdentificationIcon,
      'check_in_date': CalendarIcon,
      'check_out_date': CalendarIcon,
      'room_number_type': BuildingOfficeIcon,
      'number_of_guests': UsersIcon,
      'contact_number': PhoneIcon,
      'email_id': EnvelopeIcon,
      'special_requests': ChatBubbleLeftRightIcon,
      'airport_pickup': TruckIcon,
      'food_preferences': StarIcon,
      'payment_method': CreditCardIcon,
      'loyalty_program': StarIcon,
      'complaint_issue': ExclamationTriangleIcon,
      'escalation_status': ExclamationTriangleIcon,
      'additional_notes': ChatBubbleLeftRightIcon,
    };
    return iconMap[dataId] || ClipboardDocumentListIcon;
  };

  // Static data
  const currentAgent = {
    name: 'RAVIZ Hotel Agent',
    description: 'Collecting guest information and handling hotel services.',
    status: 'Active',
  };

  const handoffAgents = [
    { name: 'Hotel Staff' },
    { name: 'Manager' },
  ];

  const metrics = [
    { name: 'Data Completion', value: `${completionPercentage}%`, icon: ClipboardDocumentListIcon },
    { name: 'Call Duration', value: '2:34', icon: ClockIcon },
    { name: 'Guest Satisfaction', value: '4.8/5', icon: StarIcon },
  ];

  return (
    <div className="flex-1 bg-gray-100 rounded-lg overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white p-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">RAVIZ Hotel Data Collection</h2>
          <p className="text-sm text-blue-200">Live Customer Onboarding</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <span className="text-sm font-medium">COLLECTING</span>
        </div>
      </div>

      <div className="p-4 overflow-y-auto space-y-6">
        {/* Current Agent */}
        <div className="bg-blue-500 text-white p-4 rounded-lg shadow-lg flex items-center justify-between">
          <div className="flex items-center">
            <UserCircleIcon className="h-10 w-10 mr-4" />
            <div>
              <h3 className="text-lg font-bold">{currentAgent.name}</h3>
              <p className="text-sm text-blue-100">{currentAgent.description}</p>
            </div>
          </div>
          <div className="text-center">
            <p className="text-xs text-blue-200">STATUS</p>
            <p className="font-bold text-md">{currentAgent.status}</p>
          </div>
        </div>

        {/* Data Collection Progress */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-md font-semibold text-gray-700 flex items-center">
              <ClipboardDocumentListIcon className="h-5 w-5 mr-2 text-gray-500" />
              Guest Information Collection
            </h3>
            <button
              onClick={downloadData}
              disabled={capturedCount === 0}
              className="flex items-center text-sm bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <ArrowDownTrayIcon className="h-4 w-4 mr-1" />
              Download ({capturedCount})
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="bg-gray-200 rounded-full h-2 mb-3">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
          
          <div className="bg-white rounded-lg p-3 space-y-2 shadow-sm max-h-64 overflow-y-auto">
            {capturedData.map((dataPoint) => {
              const IconComponent = getDataPointIcon(dataPoint.id);
              return (
                <div key={dataPoint.id} className="flex items-center justify-between text-gray-600 border-b border-gray-100 pb-2 last:border-b-0">
                  <div className="flex items-center">
                    <IconComponent className={`h-5 w-5 mr-3 ${
                      dataPoint.status === 'captured' || dataPoint.status === 'verified' 
                        ? 'text-green-500' 
                        : 'text-gray-400'
                    }`} />
                    <span className="text-sm font-medium">{dataPoint.name}</span>
                  </div>
                  <div className="flex items-center">
                    {dataPoint.value ? (
                      <div className="text-right">
                        <span className="text-sm text-gray-800 font-medium">{dataPoint.value}</span>
                        {dataPoint.timestamp && (
                          <p className="text-xs text-gray-500">
                            {dataPoint.timestamp.toLocaleTimeString()}
                          </p>
                        )}
                      </div>
                    ) : (
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                        Pending
                      </span>
                    )}
                    {(dataPoint.status === 'captured' || dataPoint.status === 'verified') && (
                      <CheckCircleIcon className="h-4 w-4 ml-2 text-green-500" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Agent Network */}
        <div>
          <h3 className="text-md font-semibold text-gray-700 mb-2 flex items-center">
            <ShareIcon className="h-5 w-5 mr-2 text-gray-500" />
            RAVIZ Hotel Services
          </h3>
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <p className="text-sm text-gray-500 mb-2">Available services:</p>
            <div className="flex flex-wrap gap-2">
              {handoffAgents.map((agent) => (
                <span key={agent.name} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {agent.name}
                </span>
              ))}
            </div>
          </div>
        </div>

                 {/* Live Metrics */}
         <div>
           <h3 className="text-md font-semibold text-gray-700 mb-2 flex items-center">
             <ClockIcon className="h-5 w-5 mr-2 text-gray-500" />
             Session Metrics
           </h3>
           <div className="bg-white rounded-lg p-3 shadow-sm">
             <div className="flex items-center justify-between">
               {metrics.map((metric, index) => (
                 <div key={metric.name} className="flex items-center flex-1 justify-center">
                   <metric.icon className="h-5 w-5 mr-2 text-green-500" />
                   <div className="text-center">
                     <p className="text-xs text-gray-500">{metric.name}</p>
                     <p className="font-bold text-sm text-gray-800">{metric.value}</p>
                   </div>
                   {index < metrics.length - 1 && (
                     <div className="mx-4 text-gray-300">|</div>
                   )}
                 </div>
               ))}
             </div>
           </div>
         </div>

        {/* Demo Buttons for Testing */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <p className="text-sm text-yellow-700 mb-2 font-medium">Demo: Simulate RAVIZ Hotel Data Capture</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => captureDataPoint('guest_name', 'John Smith')}
              className="text-xs bg-blue-500 text-white px-2 py-1 rounded"
            >
              Guest Name
            </button>
            <button
              onClick={() => captureDataPoint('reservation_number', 'RZ-2024-001234')}
              className="text-xs bg-blue-500 text-white px-2 py-1 rounded"
            >
              Reservation Number
            </button>
            <button
              onClick={() => captureDataPoint('check_in_date', '2024-12-25')}
              className="text-xs bg-blue-500 text-white px-2 py-1 rounded"
            >
              Check-in Date
            </button>
            <button
              onClick={() => captureDataPoint('room_number_type', 'Room 205 - Deluxe Suite')}
              className="text-xs bg-blue-500 text-white px-2 py-1 rounded"
            >
              Room Details
            </button>
            <button
              onClick={() => captureDataPoint('special_requests', 'Early check-in, High floor')}
              className="text-xs bg-blue-500 text-white px-2 py-1 rounded"
            >
              Special Requests
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentVisualizer; 
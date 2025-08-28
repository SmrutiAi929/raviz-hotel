import React, { useState, useEffect } from 'react';
import { useDataCollection } from '../contexts/DataCollectionContext';

const AgentVisualizer = ({ isExpanded, sessionStatus }: { isExpanded: boolean; sessionStatus: string }) => {
  const { 
    capturedData, 
    getCompletionPercentage, 
    getCapturedCount, 
    exportData,
    captureDataPoint
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
    link.download = `royal-clinic-patient-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Real-time call duration timer
  const [callDuration, setCallDuration] = useState(0);
  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null);

  // Timer logic based on session status
  useEffect(() => {
    if (sessionStatus === "CONNECTED") {
      // Start timer when connected
      if (!sessionStartTime) {
        setSessionStartTime(Date.now());
        setCallDuration(0);
      }
      
      const timer = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (sessionStatus === "DISCONNECTED") {
      // Stop timer when disconnected but KEEP the final duration
      setSessionStartTime(null);
      // Don't reset callDuration - keep the final value visible
    }
  }, [sessionStatus, sessionStartTime]);

  // Format duration as MM:SS
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const metrics = [
    { name: 'Data Completion', value: `${completionPercentage}%` },
    { name: 'Call Duration', value: formatDuration(callDuration) },
  ];

  return (
    <div className="flex-1 bg-gray-100 rounded-lg overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white p-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Royal Clinic Data Collection</h2>
          <p className="text-sm text-blue-200">Live Patient Onboarding</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="relative flex h-3 w-3">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
              sessionStatus === "CONNECTED" ? 'bg-green-400' : 'bg-gray-400'
            } opacity-75`}></span>
            <span className={`relative inline-flex rounded-full h-3 w-3 ${
              sessionStatus === "CONNECTED" ? 'bg-green-500' : 'bg-gray-500'
            }`}></span>
          </span>
          <span className="text-sm font-medium">
            {sessionStatus === "CONNECTED" ? 'CONVERSATION ACTIVE' : 'WAITING FOR CALL'}
          </span>
        </div>
      </div>

      <div className="p-4 overflow-y-auto space-y-6">
        {/* Current Agent */}
        <div className="bg-blue-500 text-white p-4 rounded-lg shadow-lg flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-10 w-10 mr-4 bg-white rounded-full flex items-center justify-center">
              <svg className="h-6 w-6 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5zM12 22c-4.75-1.19-8-4.46-8-8.28V8.3l8-4 8 4v5.42c0 3.82-3.25 7.09-8 8.28z"/>
                <path d="M9 14h6v2H9z"/>
                <path d="M11 10h2v4h-2z"/>
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold">Royal Clinic Agent</h3>
              <p className="text-sm text-blue-100">Collecting patient information and handling medical consultations.</p>
            </div>
          </div>
          <div className="text-center">
            <p className="text-xs text-blue-200">STATUS</p>
            <p className="font-bold text-md">Active</p>
          </div>
        </div>

        {/* Data Collection Progress */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-md font-semibold text-gray-700 flex items-center">
              <span className="mr-2">📋</span>
              Patient Information Collection
            </h3>
            <button
              onClick={downloadData}
              disabled={capturedCount === 0}
              className="flex items-center text-sm bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <span className="mr-1">⬇️</span>
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
              // Get the appropriate icon for each field
              const getFieldIcon = (fieldId: string) => {
                                 const iconMap: Record<string, string> = {
                   'patient_name': '👤',
                   'contact_number': '📱',
                   'age': '📊',
                   'gender': '⚧',
                   'service_interest': '🏥',
                   'specific_concern': '💭',
                   'preferred_datetime': '📅',
                   'doctor_preference': '👨‍⚕️',
                   'source_channel': '🔍',
                   'consent_channel': '✉️',
                   'email_id': '📧'
                 };
                return iconMap[fieldId] || '📝';
              };

              return (
                <div key={dataPoint.id} className="flex items-center justify-between text-gray-600 border-b border-gray-100 pb-2 last:border-b-0">
                  <div className="flex items-center">
                    <span className="mr-3 text-lg">{getFieldIcon(dataPoint.id)}</span>
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
                      <span className="ml-2 text-green-500">✅</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Royal Clinic Services */}
        <div>
          <h3 className="text-md font-semibold text-gray-700 mb-2 flex items-center">
            <span className="mr-2">🏥</span>
            Royal Clinic Services
          </h3>
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <p className="text-sm text-gray-500 mb-2">Available services:</p>
            <div className="flex flex-wrap gap-2">
              {['Cosmetic Surgery', 'Skin & Laser', 'Hair Restoration', 'Dental Aesthetics', 'Breast Surgery', 'Gynecology', 'Weight Loss', 'Home Healthcare'].map((service) => (
                <span key={service} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {service}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Live Metrics */}
        <div>
          <h3 className="text-md font-semibold text-gray-700 mb-2 flex items-center">
            <span className="mr-2">⏱️</span>
            Session Metrics
          </h3>
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <div className="flex items-center justify-between">
              {metrics.map((metric, index) => (
                <div key={metric.name} className="flex items-center flex-1 justify-center">
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
          <p className="text-sm text-yellow-700 mb-2 font-medium">Demo: Simulate Royal Clinic Data Capture</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => captureDataPoint('patient_name', 'Ahmed Al Mansouri')}
              className="text-xs bg-blue-500 text-white px-2 py-1 rounded"
            >
              Patient Name
            </button>
            <button
              onClick={() => captureDataPoint('contact_number', '+971 50 123 4567')}
              className="text-xs bg-blue-500 text-white px-2 py-1 rounded"
            >
              Contact Number
            </button>
            <button
              onClick={() => captureDataPoint('age', '35')}
              className="text-xs bg-blue-500 text-white px-2 py-1 rounded"
            >
              Age
            </button>
            <button
              onClick={() => captureDataPoint('service_interest', 'Cosmetic Surgery')}
              className="text-xs bg-blue-500 text-white px-2 py-1 rounded"
            >
              Service Interest
            </button>
            <button
              onClick={() => captureDataPoint('preferred_datetime', 'Tomorrow 2 PM')}
              className="text-xs bg-blue-500 text-white px-2 py-1 rounded"
            >
              Preferred Time
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentVisualizer; 
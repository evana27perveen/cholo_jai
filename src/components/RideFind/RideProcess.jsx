import React, { useState, useEffect } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';

const RideProcess = () => {
  const [processing, setProcessing] = useState(false);
  const [status, setStatus] = useState('');

  const simulateRideProcessing = () => {
    setProcessing(true);
    // Simulating some asynchronous ride processing
    setTimeout(() => {
      setProcessing(false);
      setStatus('Ride processed successfully');
    }, 3000); // Simulate processing for 3 seconds
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {processing ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <>
          <Text style={{ marginBottom: 20 }}>{status}</Text>
          <Button title="Process Ride" onPress={simulateRideProcessing} />
        </>
      )}
    </View>
  );
};

export default RideProcess;

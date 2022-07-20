import React from 'react';

import { View, Text } from 'react-native';

interface Props {
  name: string;
  // TODO get props once firebase is available
}

const BikeSummary: React.FC<Props> = ({ name }) => {
  return (
    <View>
      <Text>{name}</Text>
    </View>
  );
};

export default BikeSummary;

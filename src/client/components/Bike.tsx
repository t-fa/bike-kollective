import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { BikeType } from './types';
import { db, getDoc } from '../../../server';

interface Props {
  id: string;
}

const Bike: React.FC<Props> = ({ id }) => {
  const [bikeData, setBikeData] = useState<BikeType | null>();

  useEffect(() => {}, [id]);

  return <View></View>;
};

export default Bike;

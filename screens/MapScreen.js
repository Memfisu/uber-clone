import React, {useEffect} from 'react'
import {View} from 'react-native';
import tw from 'twrnc';
import {Map} from '../components/Map';
import {useDispatch} from 'react-redux';
import {setOrigin} from '../slices/navSlice';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {NavigateCard} from '../components/NavigateCard';
import {RideOptionsCard} from '../components/RideOptionsCard';

export const MapScreen = () => {
    const dispatch = useDispatch()
    const Stack = createNativeStackNavigator()

    useEffect(() => {
        return () => {
            dispatch(setOrigin(null))
        }
    }, []);

    return (
        <View>
            <View style={tw`h-1/2`}>
                <Map />
            </View>

            <View style={tw`h-1/2`}>
                <Stack.Navigator>
                    <Stack.Screen
                        name="NavigateCard"
                        component={NavigateCard}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="RideOptionsCard"
                        component={RideOptionsCard}
                        options={{
                            headerShown: false,
                        }}
                    />
                </Stack.Navigator>
            </View>
        </View>
    );
}
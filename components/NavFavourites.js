import React from 'react'
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import { Icon } from 'react-native-elements'
import tw from 'twrnc';
import {setDestination, setOrigin} from '../slices/navSlice';
import {useDispatch} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/core';

const data = [
    {
        id: '123',
        icon: 'home',
        location: 'Home',
        destination: '37 Vakhtang Bochorishvili',
        origin: {
            description: '37 Vakhtang Bochorishvili Street, Tbilisi',
            geometry: {
                location: {
                    lat: 41.72282608753623,
                    lng:  44.78097302553142
                }
            }
        }
    },
    {
        id: '456',
        icon: 'briefcase',
        location: 'Work',
        destination: '17d Kalistrate Kutateladze',
        origin: {
            description: '17d Kalistrate Kutateladze St, Tbilisi',
            geometry: {
                location: {
                    lat: 41.721615075977425,
                    lng: 44.743342054366785
                }
            }
        }
    }
]

export const NavFavourites = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation();
    const route = useRoute();

    const handlePress = (origin) => {
        if (route?.name === 'HomeScreen') {
            dispatch(setOrigin({
                location: origin?.geometry?.location,
                description: origin?.description
            }))
            dispatch(setDestination(null))
            navigation.navigate('MapScreen')
        }
        if (route?.name === 'NavigateCard') {
            dispatch(setDestination({
                location: origin?.geometry?.location,
                description: origin?.description
            }))
            navigation.navigate('RideOptionsCard')
        }
    }

    return (
        <FlatList
            data={data}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => (
                <View style={[tw`bg-gray-200`, { height: 0.6 }]} />
            )}
            renderItem={({ item: { location, destination, icon, origin } }) => (
                <TouchableOpacity style={tw`flex-row items-center p-5`} onPress={() => handlePress(origin)}>
                   <Icon
                       style={tw`mr-4 rounded-full bg-gray-300 p-3`}
                       name={icon}
                       type='ionicon'
                       color='white'
                       size={18}
                   />
                   <View>
                       <Text style={tw`font-semibold text-lg`}>{location}</Text>
                       <Text style={tw`text-gray-500`}>{destination}</Text>
                   </View>
                </TouchableOpacity>
            )}
        />
    );
}
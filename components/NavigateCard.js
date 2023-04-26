import React from 'react'
import {SafeAreaView, Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {selectDestination, setDestination} from '../slices/navSlice';
import { GOOGLE_MAPS_KEY } from '@env'
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/core';
import {NavFavourites} from '../components/NavFavourites';
import {Icon} from 'react-native-elements';

export const NavigateCard = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const destination = useSelector(selectDestination)

    return (
        <SafeAreaView style={tw`bg-white flex-1`}>
            <Text style={tw`text-center py-5 text-xl`}>Good morning!</Text>
            <View style={tw`border-t border-gray-200 flex-shrink`}>
                <GooglePlacesAutocomplete
                    nearbyPlacesAPI='GooglePlacesSearch'
                    debounce={400}
                    placeholder='Where To?'
                    minLength={2}
                    fetchDetails
                    enablePoweredByContainer={false}
                    returnKeyType='search'
                    query={{
                        key: GOOGLE_MAPS_KEY,
                        language: 'en',
                    }}
                    styles={toInputBoxStyles}
                    onPress={(data, details = null) => {
                        dispatch(setDestination({
                            location: details?.geometry?.location,
                            description: data?.description
                        }))

                        navigation.navigate('RideOptionsCard')
                    }}
                />
            </View>

            <View style={tw`flex-1`}>
                <NavFavourites />
            </View>

            <View style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}>
                <TouchableOpacity
                    style={tw`flex flex-row bg-black w-24 px-4 py-3 rounded-full justify-between`}
                    onPress={() => navigation.navigate('RideOptionsCard')}
                    disabled={!destination}
                >
                    <Icon name='car' type="font-awesome" color="white" size={16} />
                    <Text style={tw`text-white text-center`}>Rides</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={tw`flex flex-row w-24 px-4 py-3 rounded-full justify-between`}
                    disabled={!destination}
                >
                    <Icon name='fast-food-outline' type="ionicon" color="black" size={16} />
                    <Text style={tw`text-center`}>Eats</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const toInputBoxStyles = StyleSheet.create({
    container: {
        flex: 0,
        backgroundColor: 'white',
        paddingTop: 20,
    },
    textInput: {
        fontSize: 18,
        backgroundColor: '#DDDDDF',
        borderBottomWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderTopWidth: 0,
    },
    textInputContainer: {
        paddingHorizontal: 20,
        paddingBottom: 0,
    }
})
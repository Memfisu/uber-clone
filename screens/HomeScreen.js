import React, {useRef} from 'react'
import {Image, SafeAreaView, View} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import tw from 'twrnc';
import {NavOptions} from '../components/NavOptions';
import {NavFavourites} from '../components/NavFavourites';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_KEY } from '@env'
import {useDispatch, useSelector} from 'react-redux';
import {setDestination, setOrigin} from '../slices/navSlice';

export const HomeScreen = () => {
    const ref = useRef();
    const dispatch = useDispatch()

    useFocusEffect(
        React.useCallback(() => {
            if (ref.current) {
                ref.current.clear();
            }
        }, [])
    );

    return (
        <SafeAreaView style={tw`bg-white h-full`}>
            <View style={tw`p-5`}>
                <Image
                    style={{
                        width: 100,
                        height: 100,
                        resizeMode: 'contain'
                    }}
                    source={{
                      uri: 'https://links.papareact.com/gzs',
                    }}
                />

                <GooglePlacesAutocomplete
                    ref={ref}
                    nearbyPlacesAPI='GooglePlacesSearch'
                    debounce={400}
                    placeholder='Where From?'
                    minLength={2}
                    fetchDetails
                    enablePoweredByContainer={false}
                    returnKeyType='search'
                    query={{
                        key: GOOGLE_MAPS_KEY,
                        language: 'en',
                    }}
                    styles={{
                        container: {
                            flex: 0,
                        },
                        textInput: {
                            fontSize: 18,
                        }
                    }}
                    onPress={(data, details = null) => {
                        dispatch(setOrigin({
                            location: details?.geometry?.location,
                            description: data?.description
                        }))

                        dispatch(setDestination(null))
                    }}
                />

                <NavOptions />
                <NavFavourites />
            </View>
        </SafeAreaView>
    );
}
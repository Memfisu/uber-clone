import React, {useRef, useEffect, useState} from 'react'
import tw from 'twrnc';
import MapView, { Marker } from 'react-native-maps';
import {useDispatch, useSelector} from 'react-redux';
import {selectDestination, selectOrigin, setTravelTimeInformation} from '../slices/navSlice';
import MapViewDirections from 'react-native-maps-directions'
import { GOOGLE_MAPS_KEY } from '@env'

export const Map = () => {
    const dispatch = useDispatch()
    const origin = useSelector(selectOrigin)
    const destination = useSelector(selectDestination)
    const mapRef = useRef(null)

    useEffect(() => {
        if (!origin || !destination) return;

        const region = {
            latitude: (origin.location.lat + destination.location.lat) / 2,
            longitude: (origin.location.lng + destination.location.lng) / 2,
            latitudeDelta: Math.abs(origin.location.lat - destination.location.lat) + 0.005,
            longitudeDelta: Math.abs(origin.location.lng - destination.location.lng) + 0.005,
        };

        mapRef.current.animateToRegion(region, 1000);
    }, [origin, destination]);

    useEffect(() => {
        if (!origin || !destination) return;

        const getTravelTime = async () => {
            const URL =
                `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_KEY}`

            const result = await fetch(URL)
            const preparedResult = await result?.json()
            dispatch(setTravelTimeInformation(preparedResult.rows[0].elements[0]))
        }

        getTravelTime()
    }, [origin, destination, GOOGLE_MAPS_KEY]);


    return (
        <MapView
            ref={mapRef}
            style={tw`flex-1`}
            mapType='mutedStandard'
            initialRegion={{
                latitude: origin.location.lat,
                longitude: origin.location.lng,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }}
        >
            {origin && destination && (
                <MapViewDirections
                    origin={origin.description}
                    destination={destination.description}
                    apikey={GOOGLE_MAPS_KEY}
                    strokeWidth={3}
                    strokeColor='black'
                />
            )}

            {origin?.location && (
                <Marker
                    coordinate={{
                        latitude: origin.location.lat,
                        longitude: origin.location.lng,
                    }}
                    title="Origin"
                    description={origin.description}
                    identifier='origin'
                />
            )}

            {destination?.location && (
                <Marker
                    coordinate={{
                        latitude: destination.location.lat,
                        longitude: destination.location.lng,
                    }}
                    title="Destination"
                    description={destination.description}
                    identifier='destination'
                />
            )}
        </MapView>
    );
}
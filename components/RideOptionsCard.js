import React, {useState} from 'react'
import {FlatList, Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import tw from 'twrnc';
import {Icon} from 'react-native-elements';
import {useNavigation} from '@react-navigation/core';
import {useSelector} from 'react-redux';
import {selectTravelTimeInformation} from '../slices/navSlice';

const data = [
    {
        id: 'uber-X-123',
        title: 'UberX',
        multiplier: 1,
        image: 'https://links.papareact.com/3pn'
    },
    {
        id: 'uber-XL-456',
        title: 'UberXL',
        multiplier: 1.2,
        image: 'https://links.papareact.com/5w8'
    },
    {
        id: 'uber-LUX-789',
        title: 'Uber LUX',
        multiplier: 1.75,
        image: 'https://links.papareact.com/7pf'
    }
]

const SURGE_CHARGE_RATE = 1.5

export const RideOptionsCard = () => {
    const navigation = useNavigation()
    const [selected, setSelected] = useState(null);
    const travelTimeInformation = useSelector(selectTravelTimeInformation)

    return (
        <SafeAreaView style={tw`bg-white flex-grow`}>
            <View>
                <TouchableOpacity
                    onPress={() => navigation.navigate("NavigateCard")}
                    style={[tw`absolute top-3 left-5 p-3 rounded-full z-50`]}
                >
                    <Icon name='chevron-left' type='fontawesome' />
                </TouchableOpacity>
                <Text style={tw`text-center py-5 text-xl`}>Select a ride - {travelTimeInformation?.distance?.text}</Text>
            </View>

            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item: { id, title, multiplier, image }, item }) => (
                    <TouchableOpacity
                        style={tw`flex-row items-center justify-between px-10 ${id === selected?.id && 'bg-gray-200'}`}
                        onPress={() => setSelected(item)}
                    >
                        <Image
                            style={{
                                height: 100,
                                width: 100,
                                resizeMode: 'contain'
                            }}
                            source={{ uri: image}}
                        />
                        <View style={tw`-ml-6`}>
                            <Text style={tw`text-xl font-semibold`}>{title}</Text>
                            <Text>{travelTimeInformation?.duration?.text} Travel Time</Text>
                        </View>
                        <Text style={tw`text-xl`}>
                            {new Intl.NumberFormat('en-gb', {
                                style: 'currency',
                                currency: 'GBP'
                            }).format(
                                (travelTimeInformation?.duration?.value * SURGE_CHARGE_RATE * multiplier) / 100
                            )}
                        </Text>
                    </TouchableOpacity>
                )}
            />

            <View style={tw`mt-auto border-t border-gray-200`}>
                <TouchableOpacity
                    style={tw`bg-black py-3 m-3 ${!selected && 'bg-gray-300'}`}
                    disabled={!selected}
                >
                    <Text style={tw`text-center text-white text-xl`}>Choose {selected?.title}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
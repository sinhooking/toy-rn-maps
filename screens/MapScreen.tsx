import MapView, { Marker } from 'react-native-maps';

import { StyleSheet, View, Dimensions, Image } from 'react-native';
import React, { useEffect, useState } from 'react';

import * as Location from 'expo-location';

export default function MapScreen() {
    const [location, setLocation] = useState<any>({ latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.000922, longitudeDelta: 0.000421 });

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                return;
            }

            let lo = await Location.getCurrentPositionAsync({});

            setLocation({
                ...location,
                latitude: lo.coords.latitude,
                longitude: lo.coords.longitude
            });
        })();
    }, []);

    return (
        <View style={styles.container}>
            <MapView region={location} style={styles.map}
                showsUserLocation={true}
                showsMyLocationButton={true}
                initialRegion={location}
            >
                <Marker
                    coordinate={{ latitude: location.latitude, longitude: location.longitude }}
                    title="This should be me"
        description="Some description"
                >
                    <Image source={require('../assets/images/bicycle.png')} style={{ width: 40, height: 40 }} />
                </Marker>
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
   
});
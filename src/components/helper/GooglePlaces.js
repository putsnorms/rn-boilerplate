import React, {useEffect, useState} from 'react';
import {
    View,
    Image,
    Text,
    SafeAreaView
} from 'react-native';
import {Container} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CustomHeader as Header } from 'src/components/Header';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useNavigation } from '@react-navigation/native';
import {t, color} from 'react-native-tailwindcss';
import { ScrollView } from 'react-native-gesture-handler';

const GooglePlaces = ({ navigation, route }) => {

  return (
      <View style={[t.flex1]}>
        <Header
            title=""
            leftIcon={
                <Icon active name="arrow-back" size={30} onPress={() => navigation.goBack()}/>
            }
        />

        <GooglePlacesAutocomplete
            placeholder='Search'
            minLength={2}
            autoFocus={true}
            returnKeyType={'search'}
            keyboardAppearance={'light'}
            listViewDisplayed={false}
            fetchDetails={true}
            renderDescription={row => row.description || row.formatted_address || row.name}
            onPress={(data, details = null) => {
              navigation.navigate('EditProfile', {location: data.description});
            }}
            getDefaultValue={() => route.params.location}
            query={{
              key: '_YOU_API_KEY_',
              language: 'en',
              types: '(cities)'
            }}
            styles={{
              textInputContainer: {
                borderRadius: 12,
                borderWidth: 1,
                overflow: 'visible',
                backgroundColor: 'white',
                borderColor: '#C4C4C4',
                margin: 5
              },
              listView: {
                backgroundColor: 'transparent'
              },
              row: {
                zIndex: 1,
                backgroundColor: 'white'
              }
            }}
            currentLocation={false}
            currentLocationLabel="Current location"
            nearbyPlacesAPI='GooglePlacesSearch'
            GooglePlacesSearchQuery={{
              rankby: 'distance',
            }}
            GooglePlacesDetailsQuery={{
              fields: 'formatted_address',
            }}
            filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
            debounce={200}
        />
      </View>
  );
}

export default GooglePlaces;
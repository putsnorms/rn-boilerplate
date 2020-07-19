import React from 'react';
import {
    View,
    Text,
} from 'react-native';
import {
    Container,
    Button,
    Item,
    Input
} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Avatar} from 'src/variables/global';
import {t, color} from 'react-native-tailwindcss';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const Search = () => {

    const navigation = useNavigation();

    return(
        <Container style={[t.flex1]}>
            <SafeAreaView style={[t.pT8]}/>

            <View style={[t.flex1, t.flexRow, t.pX2, t.alignCenter]}>
                <Button transparent style={[t.pR3]}>
                    <Icon name='arrow-back' size={30} onPress={() => navigation.goBack()}/>
                </Button>

                <Item style={[
                    t.borderT2,
                    t.borderR2,
                    t.borderB2,
                    t.borderL2,
                    t.w4_5,
                    t.h12,
                    {borderRadius: 50}
                ]}>
                    <Input
                        placeholder="Search.."
                        style={[t.mX3]}
                    />
                </Item>
            </View>
        </Container>
    )
}

export default Search
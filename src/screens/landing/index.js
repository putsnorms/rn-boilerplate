import React, {useRef, useState} from 'react';
import {
    Container,
    Content,
    Text,
} from 'native-base';
import {
    View,
    Image,
    ScrollView,
} from 'react-native';
import {t, color} from 'react-native-tailwindcss';
import {LOGO, SCREEN_HEIGHT} from 'src/variables/global';
import {useNavigation} from '@react-navigation/native';
import Button from 'src/components/Button'

const Landing = () => {
    const navigation = useNavigation();

    return (
        <Container>
            <View style={[t.flex1]}>
                <Content padder>
                    <View style={[{height: SCREEN_HEIGHT-250}, t.itemsCenter, t.justifyCenter ]}>
                        <Text style={[t.text2xl, t.textGray700]}>Mobile App for Developers</Text>
                        <Image source={LOGO} style={{width: 180, height: 180}} />
                    </View>

                    <View style={[t.itemsCenter]}>
                        <Button 
                            rounded 
                            primary 
                            title="SIGN UP"
                            style={[t.w4_5, t.justifyCenter, t.mB3]} 
                            onPress={() => navigation.push('Register')}
                        />

                        <Button 
                            rounded 
                            success 
                            title="SIGN IN"
                            style={[t.w4_5, t.justifyCenter]} 
                            onPress={() => navigation.push('Login')}
                        />
                    </View>
                </Content>
            </View>
        </Container>
    )
};

export default Landing;
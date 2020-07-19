import React from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {
    View,
    StatusBar,
    Image,
} from 'react-native';
import {
    Container,
    Content,
    Item,
    Input,
    Text,
} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {t, color} from 'react-native-tailwindcss';
import {CustomHeader as Header} from 'src/components/Header';
import {Avatar} from 'src/variables/global';
import { ScrollView } from 'react-native-gesture-handler';

const Dashboard = () => {
    const user = useSelector(state => state.AuthReducer.user);
    const navigation = useNavigation();

    const handleClick = () => {
        console.log('clicked!')
    }

    return (
        <Container style={[t.flex1]}>
            <Header
                title="Home"
                leftIcon={
                    <Icon active name="menu" size={30} onPress={() => navigation.toggleDrawer()}/>
                }
                rightIcon={
                    <View style={[t.flexRow]}>
                        <Icon name="search" size={30} color={'#000'} onPress={() => navigation.navigate('Search')} style={[t.mR2]} />
                        <Icon active name="account-circle" size={30} onPress={() => navigation.navigate('Profile')}/>
                    </View>
                }
            />

            <Content padder scrollEnabled>
                <Text style={[t.textLg]}>Welcome {user.name}!</Text>
            </Content>
        </Container>
    )
};

export default Dashboard;
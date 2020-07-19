import React from 'react';
import {
    View,
    Text,
    Image,
} from 'react-native';
import {
    Container,
    Thumbnail,
    Content,
    Button,
    List,
    ListItem,
    Left,
    Right
} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import {Avatar} from 'src/variables/global';
import {t, color} from 'react-native-tailwindcss';
import * as Animatable from 'react-native-animatable';
import {CustomHeader as Header} from 'src/components/Header';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';

const Profile = () => {
    const user = useSelector(state => state.AuthReducer.user)
    const navigation = useNavigation();

    return (
        <Container style={[t.flex1]}>
            <Header
                title="Profile"
                leftIcon={
                    <Icon active name="arrow-back" size={30} onPress={() => navigation.goBack()}/>
                }
                rightIcon={
                    <Icon active name="edit" size={30} onPress={() => navigation.navigate('EditProfile')}/>
                }
            />

            <Content padder>
                <View>
                    <Animatable.View
                        animation="zoomIn"
                        delay={500}
                        easing="ease-in"
                    >
                        <View style={[t.selfCenter, t.mY8]}>
                            <Image
                                source={{uri: user.profile ? user.profile.photo : Avatar}}
                                style={[
                                    t.w32,
                                    t.h32,
                                    t.roundedFull,
                                ]}
                            />
                        </View>
                    </Animatable.View>

                    <Animatable.View
                        animation="fadeIn"
                        delay={500}
                        duration={1800}
                        easing="ease-in"
                    >
                        <Text style={[t.text2xl, t.selfCenter]}>{user.name}</Text>
                    </Animatable.View>

                    <List>
                        <ListItem itemHeader first>
                            <Text style={[t.fontExtrabold]}>About me</Text>
                        </ListItem>
                        <ListItem>
                            <Icon name="place" size={20} />
                            <Text> {user.profile.location}</Text>
                        </ListItem>
                        <ListItem>
                            <Icon name="mail" size={20} />
                            <Text> {user.email}</Text>
                        </ListItem>
                    </List>
                </View>
            </Content>
        </Container>
    )
}

export default Profile;

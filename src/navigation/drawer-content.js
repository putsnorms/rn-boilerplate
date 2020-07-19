import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as authActions from 'src/redux/auth/actions';
import {
    View,
    Text,
    Image,
    SafeAreaView,
    AsyncStorage
} from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { 
    Icon as NativeIcon, 
    Button, 
    Footer, 
    Drawer, 
    Content 
} from 'native-base';
import {Avatar} from 'src/variables/global';
import {t, color} from 'react-native-tailwindcss';

export function DrawerContent(props) {
    const user = useSelector(state => state.AuthReducer.user);
    const dispatch = useDispatch()

    const logout = () => {
        dispatch(authActions.setUser(null))
        dispatch(authActions.setToken(null))
        AsyncStorage.clear()
    }

    return (
        <View style={[t.flex1]}>
            <DrawerContentScrollView {...props}>
                <Content padder>
                    <View style={[t.hAuto, t.pY4, t.mB6, t.borderB, t.borderGray300]}>
                        <View style={[t.mT5, t.itemsCenter]}>
                            <Image
                                source={{ uri: user.profile ? user.profile.photo : Avatar }}
                                style={[t.w32, t.h32, t.roundedFull]}
                            />
                        </View>

                        <View style={[t.itemsCenter, t.mT6]}>
                            <Text style={[t.textLg]}>{user.name}</Text>
                            <Text style={[t.textSm]}>{user.email}</Text>
                        </View>
                    </View>

                    <DrawerItem
                        icon={({color, size}) => (
                            <Icon name="home" size={size} />
                        )}
                        label="Home"
                        labelStyle={[t.fontBold]}
                        onPress={() => props.navigation.navigate('DashboardNavigation')}
                    />
                    <DrawerItem
                        icon={({color, size}) => (
                            <Icon name="settings" size={size} />
                        )}
                        label="Settings"
                        labelStyle={[t.fontBold]}
                        onPress={() => props.navigation.navigate('SettingsNavigation')}
                    />

                    <DrawerItem
                        style={[t.mT5]}
                        icon={({color, size}) => (
                            <NativeIcon name="log-out" size={size} />
                        )}
                        iconContainerStyle={[t.fontBold]}
                        label="Logout"
                        labelStyle={[t.fontBold]}
                        onPress={logout}
                    />
                </Content>
            </DrawerContentScrollView>
        </View>
    )
}
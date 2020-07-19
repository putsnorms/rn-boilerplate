import React, {useEffect, useState} from 'react';
import {
    View,
    AsyncStorage,
} from 'react-native';
import {
    Container,
    Content,
    Text,
    List,
    ListItem,
    Left,
    Right,
    Switch
} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import {Avatar} from 'src/variables/global';
import {t, color} from 'react-native-tailwindcss';
import * as Animatable from 'react-native-animatable';
import {CustomHeader as Header} from 'src/components/Header';

const Settings = () => {
    const navigation = useNavigation();
    const [settings, setSettings] = useState([]);

    useEffect(() => {
        const initializeSettings = async() => {
            const fingerPrint = await AsyncStorage.getItem('fingerPrint');

            setSettings({
                fingerPrint: JSON.parse(fingerPrint) ? true : false
            })
        }

        initializeSettings()
    }, [])

    const handleSwitch = async(e, name) => {
        let config = {...settings}

        config[name] = e.nativeEvent.value
        setSettings(config)
        AsyncStorage.setItem(name, JSON.stringify(e.nativeEvent.value))
    }

    return (
        <Container style={[t.flex1]}>
            <Header
                title="Settings"
                leftIcon={
                    <Icon active name="menu" size={30} onPress={() => navigation.toggleDrawer()}/>
                }
            />

            <Content padder>
                <List>
                    <ListItem itemHeader first>
                        <Text style={[t.fontExtrabold]}>Security</Text>
                    </ListItem>
                    <ListItem>
                        <Left>
                            <Text>Fingerprint</Text>
                        </Left>
                        <Right>
                            <Switch value={settings.fingerPrint} onChange={e => handleSwitch(e, "fingerPrint")} />
                        </Right>
                    </ListItem>
                    <ListItem onPress={() => navigation.navigate('ChangePassword')}>
                        <Left>
                            <Text>Change Password</Text>
                        </Left>
                        <Right>
                            <Icon name="chevron-right" size={24} />
                        </Right>
                    </ListItem>

                    <ListItem itemHeader first style={[t.mT3]}>
                        <Text style={[t.fontExtrabold]}>App</Text>
                    </ListItem>
                    <ListItem>
                        <Left>
                            <Text>Version</Text>
                        </Left>
                        <Right>
                            <Text style={[t.textGray700]}>v0.0.1</Text>
                        </Right>
                    </ListItem>
                </List>
            </Content>
        </Container>
    )
}

export default Settings;

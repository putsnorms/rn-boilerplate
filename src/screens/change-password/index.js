import React, {useState} from 'react';
import {
    View,
    Alert
} from 'react-native';
import {
    Container,
    Content,
    Text,
    Input,
    Item,
    Form,
} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import {Avatar} from 'src/variables/global';
import {t, color} from 'react-native-tailwindcss';
import * as Animatable from 'react-native-animatable';
import {CustomHeader as Header} from 'src/components/Header';
import {TextInput} from 'src/components/TextInput';
import Button from 'src/components/Button'

const ChangePassword = () => {
    const navigation = useNavigation();

    const [secured, setSecured] = useState(true);
    const [errors, setErrors] = useState(false);
    const [form, setForm] = useState({
        current_password: null,
        password: null,
        password_confirmation: null
    })

    const changeInput = async (key, value) => {
        let input = {...form}
        input[key] = value
        setForm(input)
    }

    const handleSubmit = async() => {
        try {
            let response = await axios.post(`change-password`, form)

            navigation.goBack()
        } catch(err) {
            let response = err.response

            if ('errors' in response.data) {
                setErrors(response.data.errors)
                throw response.status
            }

            Alert.alert('Something went wrong! Please try again.')
        }
    }

    return (
        <Container style={[t.flex1]}>
            <Header
                title="Change Password"
                leftIcon={
                    <Icon active name="arrow-back" size={30} onPress={() => navigation.goBack()}/>
                }
            />

            <Content padder>
                <Form>
                    <TextInput
                        name="current_password"
                        secureTextEntry
                        value={form.current_password || ``}
                        placeholder="Current Password"
                        onChangeText={value => changeInput('current_password', value)}
                        errors={errors}
                    />

                    <TextInput
                        name="password"
                        secureTextEntry={secured}
                        value={form.password || ``}
                        placeholder="New Password"
                        onChangeText={value => changeInput('password', value)}
                        rightIcon={
                            secured ?
                                <Icon active name="visibility" size={30} onPress={() => setSecured(!secured)}/>
                                :
                                <Icon active name="visibility-off" size={30} onPress={() => setSecured(!secured)}/>
                        }
                        errors={errors}
                    />

                    <TextInput
                        secureTextEntry={secured}
                        value={form.password_confirmation || ``}
                        placeholder="Confirm Password"
                        onChangeText={value => changeInput('password_confirmation', value)}
                    />

                    <Button 
                        rounded 
                        block 
                        title="Change Password"
                        style={[t.mT3]} 
                        onPress={handleSubmit}
                    />
                </Form>
            </Content>
        </Container>
    )
}

export default ChangePassword;

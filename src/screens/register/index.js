import React, {useRef, useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import {
    Form,
    Text,
} from 'native-base';
import {
    View,
    Alert,
    ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {t, color} from 'react-native-tailwindcss';
import {TextInput} from 'src/components/TextInput';
import {SCREEN_WIDTH, SCREEN_HEIGHT, LOGO} from 'src/variables/global';
import Button from 'src/components/Button'

const Register = () => {
    const navigation = useNavigation();

    const [secured, setSecured] = useState(true)
    const [errors, setErrors] = useState([])
    const [form, setForm] = useState({
        name: null,
        email: null,
        password: null,
        password_confirmation: null,
    })

    const handleInput = async (e, name) => {
        let input = {...form}
        input[name] = e.nativeEvent.text
        setForm(input)
    }

    const handleSubmit = async() => {
        try {
            let response = await axios.post(`register`, form);
        } catch(err) {
            let response = err.response.data

            if ('errors' in response) {
                setErrors(response.errors)
                throw err;
            }

            Alert.alert("Something went wrong! Please try again.")
        }
    }

    return (
        <View style={[t.flex1]}>
            <View style={[{height: SCREEN_HEIGHT}, t.justifyCenter]}>
                <View style={[t.pX5, t.selfCenter, t.mB3]}>
                    <Text style={[t.text2xl]}>Register</Text>
                </View>

                <Form style={[t.pX5, {width: SCREEN_WIDTH}]}>
                    <TextInput
                        name="name"
                        value={form.name}
                        placeholder="Name *"
                        onChange={(e) => handleInput(e, "name")}
                        errors={errors}
                    />

                    <TextInput
                        name="email"
                        value={form.email}
                        placeholder="Email *"
                        onChange={(e) => handleInput(e, "email")}
                        errors={errors}
                    />

                    <TextInput
                        name="password"
                        secureTextEntry={secured}
                        value={form.password}
                        placeholder="Password *"
                        onChange={(e) => handleInput(e, "password")}
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
                        onChange={(e) => handleInput(e, 'password_confirmation')}
                    />

                    <Button 
                        rounded
                        block 
                        title="Create Account"
                        onPress={handleSubmit}
                    />
                </Form>
            </View>
        </View>
    )
}

export default Register;
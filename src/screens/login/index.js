import React, {useRef, useState} from 'react';
import {useDispatch} from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import * as authActions from 'src/redux/auth/actions';
import {
    View,
    Alert,
    ImageBackground,
    AsyncStorage
} from 'react-native';
import {
    Form,
    Text,
    ListItem,
    Body,
    CheckBox,
} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {t, color} from 'react-native-tailwindcss';
import {TextInput} from 'src/components/TextInput';
import {
    SCREEN_WIDTH,
    SCREEN_HEIGHT, 
    LOGO
} from 'src/variables/global';
import InputValidator from 'src/services/InputValidator';
import Button from 'src/components/Button'

const Login = () => {
    const navigation = useNavigation()
    const [secured, setSecured] = useState(true)
    const [error, setError] = useState(null)
    const [errors, setErrors] = useState([])
    const [remember, setRemember] = useState(false)
    const [form, setForm] = useState({
            email: '',
            password: ''
        })

    const dispatch = useDispatch()

    const handleInput = async (e, name) => {
        let input = {...form}
        input[name] = e.nativeEvent.text
        setForm(input)
    }

    const handleSubmit = async () => {
        const email = InputValidator.ValidateEmail(form.email)
        const password = InputValidator.ValidatePassword(form.password)

        if (!email.valid || !password.valid) {
            setErrors({
                email: email.message,
                password: password.message
            })
            throw 422
        }

        try {
            let response = await axios.post(`login`, form)

            await AsyncStorage.setItem('_token_', response.data.access_token)
            await AsyncStorage.setItem('userData', JSON.stringify(response.data.user))
            
            dispatch(authActions.setUser(response.data.user))
            dispatch(authActions.setToken(response.data.access_token))
        } catch(err) {
            let response = err.response

            if ('message' in response.data) {
                setError(response.data.message)
                throw response.status
            }

            Alert.alert("Something went wrong! Please try again.")
        }
    }

    return (
        <View style={[t.flex1]}>
            <View style={[{height: SCREEN_HEIGHT}, t.justifyCenter]}>

                <Form style={[t.pX5, {width: SCREEN_WIDTH}]}>
                    <View style={[t.flexRow, t.mB3]}>
                        <Text style={[t.textXl, t.selfCenter]}>Sign in your account</Text>
                    </View>

                    { error && <Text style={[t.textSm, t.textRed500, t.pL4]}>* {error}</Text> }

                    <TextInput
                        name="email"
                        value={form.email || ``}
                        placeholder="Email"
                        onChange={e => handleInput(e, 'email')}
                        errors={errors}
                    />

                    <TextInput
                        name="password"
                        secureTextEntry={secured}
                        value={form.password || ``}
                        placeholder="Password"
                        onChange={e => handleInput(e, 'password')}
                        rightIcon={
                            secured ?
                                <Icon active name="visibility" size={30} onPress={() => setSecured(!secured)}/>
                                :
                                <Icon active name="visibility-off" size={30} onPress={() => setSecured(!secured)}/>
                        }
                        errors={errors}
                    />

                    <ListItem style={[t.mB10, t.borderB0]}>
                        <CheckBox checked={remember} onPress={() => setRemember(!remember)}/>
                        <Body>
                            <Text>Remember me</Text>
                        </Body>
                    </ListItem>

                    <Button 
                        rounded
                        block 
                        title="Login"
                        onPress={handleSubmit}
                    />

                    <Button
                        transparent
                        title="Forgot your password?"
                        titleStyle={[t.textBlack]}
                        style={[t.selfCenter, t.mY5]}
                        onPress={() => navigation.navigate('ForgotPassword')}
                    />
                </Form>
            </View>
        </View>
    )
};

export default Login;
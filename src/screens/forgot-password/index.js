import React, {useRef, useState} from 'react';
import {
    Form,
    Item,
    Text,
} from 'native-base';
import {
    View,
    Image,
    ScrollView,
    Alert
} from 'react-native';
import {TextInput} from 'src/components/TextInput';
import {t, color} from 'react-native-tailwindcss';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from 'src/variables/global';
import { useNavigation } from '@react-navigation/native';
import InputValidator from 'src/services/InputValidator';
import Button from 'src/components/Button'

const ForgotPassword = () => {
    const navigation = useNavigation()
    const [secured, setSecured] = useState(true)
    const [error, setError] = useState([])
    const [email, setEmail] = useState('')

    const handleSubmit = async() => {
        const validatedEmail = InputValidator.ValidateEmail(email)

        if (!validatedEmail.valid) {
            setError({ email: validatedEmail.message })
            throw 422
        }

        try {
            let response = await axios.post(`forgot-password`, {email: email})

            setEmail(null)
            toastMessage(response.data.message)
        } catch(err) {
            let response = err.response

            if ('errors' in response.data) {
                setError(response.data.errors)
                throw 422
            }

            Alert.alert("Something went wrong! Please try again.")
        }
    }

    const toastMessage = (msg) => {
        Alert.alert(msg)
    }

    return (
        <View style={[t.flex1]}>
            <View style={[{height: SCREEN_HEIGHT}, t.justifyCenter]}>
                <View style={[t.pX5, t.selfCenter]}>
                    <Text style={[t.text2xl]}>Forgot Password</Text>
                </View>

                <Form style={[t.pX5, t.mT10, {width: SCREEN_WIDTH}]}>
                    <Text style={[t.pX3, t.textGray700]}>Enter your email to send reset password link.</Text>
                    
                    <TextInput
                        name="email"
                        value={email || ``}
                        placeholder="Email *"
                        onChange={e => setEmail(e.nativeEvent.text)}
                        errors={error}
                    />

                    <Button 
                        block 
                        title="Send Reset Password Link"
                        style={[t.mT6]} 
                        onPress={handleSubmit}
                    />
                </Form>
            </View>
        </View>
    )
}

export default ForgotPassword;
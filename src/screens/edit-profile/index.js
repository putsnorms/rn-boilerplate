import React, {useEffect, useState} from 'react';
import * as authActions from 'src/redux/auth/actions'
import {useSelector, useDispatch} from 'react-redux'
import {
    View,
    Alert,
} from 'react-native';
import {
    Container,
    Content,
    Text,
    Input,
    Item,
    Form,
    Button
} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import {Avatar} from 'src/variables/global';
import {t, color} from 'react-native-tailwindcss';
import * as Animatable from 'react-native-animatable';
import {CustomHeader as Header} from 'src/components/Header';
import {TextInput} from 'src/components/TextInput';

const EditProfile = ({navigation, route}) => {
    const [secured, setSecured] = useState(true)
    const user = useSelector(state => state.AuthReducer.user)
    const [errors, setErrors] = useState([])
    const [form, setForm] = useState({})

    const dispatch = useDispatch()

    useEffect(() => {
        setForm({
            name: user.name,
            email: user.email,
            location: user.profile.location
        })
    }, [])

    useEffect(() => {
        if(route.params?.location !== form.location) {
            changeInput('location', route.params?.location)
        }
    }, [route.params?.location])

    const changeInput = async (key, value) => {
        let input = {...form}
        input[key] = value
        setForm(input)
    }

    const handleSubmit = async() => {
        try {
            let response = await axios.patch(`user/update/${user.id}`, form)

            dispatch(authActions.setUser(response.data))
            navigation.goBack()
        }catch(e) {
            let response = e.response;

            if('errors' in response.data) {
                setErrors(response.data.errors)
                throw 422
            }
            
            Alert.alert('Something went wrong! Please try again.')
        }
    }

    return (
        <Container style={[t.flex1]}>
            <Header
                title="Edit Profile"
                leftIcon={
                    <Icon active name="arrow-back" size={30} onPress={() => navigation.goBack()}/>
                }
            />

            <Content padder>
                <Form>
                    <TextInput
                        name="name"
                        value={form.name || ``}
                        placeholder={`Enter name`}
                        onChangeText={value => changeInput('name', value)}
                        errors={errors}
                    />

                    <TextInput
                        name="email"
                        value={form.email || ``}
                        placeholder={`Enter email`}
                        onChangeText={value => changeInput('email', value)}
                        errors={errors}
                    />

                    <TextInput
                        name="location"
                        value={form.location || ``}
                        placeholder={`Location`}
                        onFocus={() => navigation.navigate('GooglePlaces', {
                            location: form.location,
                        })}
                        errors={errors}
                    />

                    <Button rounded block style={[t.w5_6, t.selfCenter, t.mY4]} onPress={handleSubmit}>
                        <Text>Save Changes</Text>
                    </Button>
                </Form>
            </Content>
        </Container>
    )
}

export default EditProfile;

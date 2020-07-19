import React from 'react';
import {View} from 'react-native';
import {TextInput} from './TextInput';
import {t} from 'react-native-tailwindcss';

const components = {
    input: TextInput
}

export const Form = ({
    formFields,
    data,
    errors,
    ...rest
}) => {

    const FormFields = key => {
        let type = formFields[key].type || `input`;
        let Field = components[type] || components[`input`];

        return (
            <Field form={formFields[key]} keyIndex={key} data={data} {...rest} />
        )
    }

    return Object.keys(formFields).map((value, index) => (
        <View key={`${value}.${index}`}>
            {FormFields(value)}
        </View>
    ))
}
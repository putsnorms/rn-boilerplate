import React from 'react'
import {
    Text,
    Item,
    Input,
} from 'native-base'
import {t} from 'react-native-tailwindcss'

export const TextInput = ({
    name,
    value,
    errors,
    placeholder,
    onChangeText,
    rightIcon,
    ...rest
})=> {
    const error = errors ? errors.hasOwnProperty(name) : false;

    return (
        <>
            <Item inlineLabel style={[t.mB3]} error={error}>
                <Input
                    {...rest}
                    value={value || ``}
                    placeholder={placeholder}
                    onChangeText={onChangeText}
                />
                {rightIcon}
            </Item>
            
            {error ? 
                <Text style={[t.textSm, t.textRed500, t.pL4]}>{errors[name]}</Text> 
                :  null}
        </>
    )
}
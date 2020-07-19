import React from 'react'
import {Text} from 'react-native'
import {Button as NBButton} from 'native-base'
import {t} from 'react-native-tailwindcss'

const Button = ({
    title,
    titleStyle,
    onPress,
    ...rest
}) => {

    return (
        <NBButton
            onPress={onPress} 
            {...rest}
        >
            <Text style={[t.textWhite, t.textBase, titleStyle]}>
                {title}
            </Text>
        </NBButton>
    )
}

export default Button;
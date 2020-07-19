import React from 'react';
import {useSelector} from 'react-redux';
import {
    Header,
    Left,
    Body,
    Right,
    Button,
    Title
} from 'native-base';
import {t} from 'react-native-tailwindcss';

export const CustomHeader = ({
    title,
    leftIcon,
    rightIcon
}) => {

    return (
        <Header transparent>
            <Left>
                {leftIcon}
            </Left>
            <Body>
                <Title style={[t.textPurple700, t.fontBold]}>{title}</Title>
            </Body>
            <Right>
                {rightIcon}
            </Right>
        </Header>
    )
};
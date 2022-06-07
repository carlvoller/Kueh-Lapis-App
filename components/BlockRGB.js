import React from "react";
import { View, Text } from "react-native";

export default function BlockRGB(props) {
    return (
        <View
            style={{
                backgroundColor: `rgb(${props.red}, ${props.green}, ${props.blue})`,
                padding: 30,
                width: '100%'
            }}
        ></View>
    )
}
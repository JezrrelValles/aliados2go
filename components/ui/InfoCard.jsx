import { View, Image, Text } from "react-native";
import React from "react";
import Logo from "../../assets/img/small_logo.png"

const InfoCard = ({ title, subtitle }) => {
  return (
    <View className="items-center bg-background w-full">
      <Image source={Logo} className="w-24 h-24" resizeMode="contain" />
      <Text
        className="text-4xl text-foreground text-center"
      >
        {title}
      </Text>
      <Text className="text-xl text-foreground/50 text-center">
        {subtitle}
      </Text>
    </View>
  );
};

export default InfoCard;

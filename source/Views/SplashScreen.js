import React, { Component } from 'react';
import { View, TouchableOpacity, ImageBackground, Text, StatusBar, Animated } from 'react-native';
const image = { uri: "https://images.pexels.com/photos/2224933/pexels-photo-2224933.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" }

export default class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnimation: new Animated.Value(0)
    };
  }


  componentDidMount() {
    Animated.timing(this.state.fadeAnimation, {
      toValue: 1,
      duration: 10000,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      this.props.navigation.navigate('MainHome')
    }, 7000)
  }


  render() {
    return (
      <View style={{
        backgroundColor: "#000000",
        flex: 1,
      }}>

        <StatusBar backgroundColor={'transparent'} translucent />

        <View>
          <ImageBackground source={image}
            style={{
              opacity: 0.4,
              width: "100%",
              height: "100%",
            }}>
          </ImageBackground>
        </View>


        <View style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          borderRadius: 15,
          justifyContent: 'center',
          alignItems: 'center',
        }}>


          <Animated.View style={{ width: "100%", opacity: this.state.fadeAnimation }}>

            <Text style={{
              fontSize: 30,
              fontWeight: 'bold',
              textAlign: 'center',
              color: '#ffffff',

            }}>Search your Bussiness{'\n'} with CNPJ</Text>

          </Animated.View>

        </View>

      </View>
    );
  }
}

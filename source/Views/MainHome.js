import React, { Component } from 'react';
import { View, Text, Dimensions, StatusBar, TextInput, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux'
import ReducersProps from '../../source/data/local/reducers/ReducersProps'
import ReducersActions from '../../source/data/local/reducers/ReducersActions'
import formatCnpj from '@brazilian-utils/format-cnpj';
import { cnpj } from 'cpf-cnpj-validator'
import Helper from '../utils/Helper'
import ApiHandler from '../data/remote/ApiHandler';
import Urls from '../data/remote/Urls';

const image = { uri: "https://images.pexels.com/photos/2224933/pexels-photo-2224933.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" }
const helper = new Helper()
const apiHandler = new ApiHandler()



class MainHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            beautifyNumber: "",
            loading: false,
            dataReceive: false
        };
    }

    componentDidMount() {
    }

    serachCNPJController() {
        let { theme, } = this.props
        let { beautifyNumber } = this.state
        var rawCNPJ = ""

        rawCNPJ = beautifyNumber.replace(".", "")
        rawCNPJ = rawCNPJ.replace(".", "")
        rawCNPJ = rawCNPJ.replace("/", "")
        rawCNPJ = rawCNPJ.replace("-", "")

        if (rawCNPJ.length < 14) {
            helper.showToast("Please Enter 14-Digit CNPJ Number", theme.alert)
            return
        }
        if (!cnpj.isValid(rawCNPJ)) {
            helper.showToast("Please Enter Valid CNPJ Number", theme.alert)
            return
        }


        this.setState({ loading: true })

        apiHandler.sendSimpleGetRequest(
            Urls.GetBusinessDetails + rawCNPJ,
            "",
            (resp) => {
                this.props.navigation.navigate("RecordDisplay", resp)
                this.setState({ loading: false })
            },
            (error) => {
                console.log(error)
                helper.showToast(error, theme.alert)
                this.setState({ loading: false })
            }
        )

    }

    render() {
        let { loading, dataReceive } = this.state
        return (
            <View style={{
                backgroundColor: "#fff",
                flex: 1,
                alignItems: "center",
            }}>

                <StatusBar backgroundColor={'transparent'} translucent />

                {/* Background Image */}


                <Image source={image}
                    style={{

                        width: Dimensions.get('window').width,
                        height: Dimensions.get('window').height + 50,
                    }}
                    blurRadius={10}>
                </Image>

                <View style={{
                    height: "100%",
                    width: "100%",
                    marginTop: "20%",
                    position: "absolute"
                }}>


                    {/* Text input field */}
                    <TextInput
                        style={{
                            width: "80%",
                            height: 55,
                            marginHorizontal: "10%",
                            borderWidth: 1,
                            // borderBottomLeftRadius:30,
                            borderBottomRightRadius: 30,
                            borderTopLeftRadius: 30,
                            borderTopRightRadius: 30,
                            borderColor: "#000000",
                            textAlign: 'center',
                            color: "#000000",
                            marginTop: "50%",
                            fontSize: 20,
                        }}
                        onChangeText={(value) => {
                            this.setState({
                                beautifyNumber: formatCnpj(value)
                            })
                        }}
                        value={this.state.beautifyNumber}
                        placeholder="Enter your CNPJ"
                        keyboardType="numeric"
                        placeholderTextColor="#000000"
                    />
                    {loading &&
                        <ActivityIndicator
                            size="large"
                            color="#000"
                            style={{
                                marginTop: "20%"
                            }}
                        />}


                    {/* Search Button */}
                    {!loading &&
                        <TouchableOpacity style={{
                            width: "60%",
                            height: 50,
                            backgroundColor: "black",
                            marginTop: "15%",
                            justifyContent: "center",
                            alignSelf: "center",
                            borderRadius: 30,

                        }}
                            onPress={() => this.serachCNPJController()}
                        >

     
                            <Text style={{
                                fontSize: 25,
                                fontWeight: 'bold',
                                textAlign: "center",
                                color: "#ffffff"
                            }}>Search</Text>

                        </TouchableOpacity>}
                </View>
            </View>
        );
    }
}
export default connect(ReducersProps, ReducersActions)(MainHome)
import React, { Component } from 'react';
import { View, Text,  StatusBar,  Image, } from 'react-native';
import { connect } from 'react-redux'
import ReducersProps from '../../source/data/local/reducers/ReducersProps'
import ReducersActions from '../../source/data/local/reducers/ReducersActions'

const image = { uri: "https://images.pexels.com/photos/2224933/pexels-photo-2224933.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" }

class RecordDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.route.params.data

        };
    }
    componentDidMount() {
        console.log(this.state.data)
    }

    textInputField(title, desc) {
        return (
            <View
                style={{
                    height: "8%",
                    width: "90%",
                    marginHorizontal: "5%",
                    marginTop: "5%",
                }}>


                <View
                    style={{
                        width: "100%",
                        height: "80%",
                        borderRadius: 15,
                        marginTop: 3,
                        borderWidth: 0.8,
                        borderColor: "#000000",

                    }}>
                    <Text style={{
                        height: "100%",
                        width: "100%",
                        fontWeight: "bold",
                        textAlign: "center",
                        paddingTop: "7%"
                    }}>{desc}</Text>


                </View>
                <Text style={{
                    height: "40%",
                    width: "42%",
                    bottom: 57,
                    borderRadius: 15,
                    marginLeft: "5%",
                    textAlign: "center",
                    textAlignVertical: "center",
                    backgroundColor: "#000",
                    fontFamily: ' tahoma',
                    color: "#fff"
                }}>{title}</Text>


            </View>
        )
    }

    dateFormatter(date) {
        return (date.split("T")[0])
    }

    render() {
        let { data } = this.state;
        return (
            <View style={{
                flex: 1,
                backgroundColor: "#fff",
                alignItems: "center",
            }}>

                {/* Background Image */}

                <Image source={image}
                    style={{
                        width: "100%",
                        height: "100%",
                        opacity: 0.6
                    }}
                    blurRadius={10}>
                </Image>

                <StatusBar backgroundColor={'transparent'} translucent />

                {/* view for results */}
                <View style={{
                    height: "100%",
                    width: "100%",
                    marginTop: "25%",
                    position: "absolute"
                }}>

                    <Text style={{
                        textAlign: "center",
                        fontSize: 24,
                        fontWeight: "bold",
                        fontFamily: "courier",
                        marginBottom: 18
                    }}>detalhes de negócios</Text>


                    {/*..............  Status/situacao */}

                    {this.textInputField("Situacao", data.situacao)}
                    {this.textInputField("Telefone", data.telefone)}
                    {this.textInputField("Atividade_principal", data.atividade_principal.length)}
                    {this.textInputField("Capital_Social", data.capital_social.split(".")[0])}
                    {this.textInputField("Fantasia", data.fantasia == "" ? "Nome da empresa não disponível" : data.fantasia)}
                    {this.textInputField("Nome", data.nome)}
                    {this.textInputField("Ultima_Atualizacao", this.dateFormatter(data.ultima_atualizacao))}
      
                </View>
            </View>


        );
    }
}
export default connect(ReducersProps, ReducersActions)(RecordDisplay)

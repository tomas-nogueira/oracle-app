import React, { useEffect, useState, useRef } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View, FlatList, Animated } from "react-native";
import Produto from "./Produto";
import { useFocusEffect } from "@react-navigation/native";

export default function Home() {

  const[ produtos, setProdutos ] = useState([]);
  const[error, setError] = useState(false)

  const fade = useRef(new Animated.Value(0) ).current;

    useFocusEffect( // toda vez que a tela for carregada ele carrega junto
        React.useCallback(() => {
          fade.setValue(0);
            Animated.timing(fade, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,

            }
            ).start();
        },[])
    );

  async function getProdutos(){
    await fetch('https://fakestoreapi.com/products', {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        },
    })
    .then( res => (res.ok == true) ? res.json() : false)
    .then( json => setProdutos(json))
    .catch(err => setError(true))
  }

  useEffect( () => {
    getProdutos()
  },[])

  return(
    <View style={css.container}>
      <Animated.View style={{ opacity: fade }}>
        <View style={css.boximg}>
            <Image source={require('../../assets/oracle.png')} style={css.img}/>
          </View>
          {produtos.length > 0 ? 
          <FlatList
            data={produtos}
            renderItem={({ item }) => <Produto item={item}/>}
            keyExtractor={ (item) => item.id }
            />
          : 
          <ActivityIndicator size='large' color='red'/> }
        </Animated.View>
    </View>
  );
}

const css = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#111123'
  },
  img: {
    alignItems: 'center',
    height: 200,
    width: 200,
    resizeMode: 'contain'
  },
  boximg: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 140
  }
})
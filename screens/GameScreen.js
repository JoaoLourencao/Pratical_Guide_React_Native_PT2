import React, {useState, useRef, useEffect} from 'react';
import { Alert, View, TextInput, StyleSheet, Text, Button, TouchableWithoutFeedback, Keyboard } from 'react-native';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import Input from '../components/Input';
import Colors from '../constants/colors';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max-min)) + min;

    if(rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    }else{
        return rndNum;
    }
};

const GameScreen = props => {
    const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, props.userChoice));

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    useEffect(()=>{
        if(currentGuess === props.userChoice){
            
        }
    });

    const nextGuessHandler = direction => {
        if((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)){
            Alert.alert('Não minta!', 'Você sabe que está errado...', [{text:'Desculpe', style:'cancel'}]);
            return;
        }
        if(direction === 'lower'){
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
    };

    return(
        <View style={styles.screen}>
            <Text>Resposta do oponente</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.btnContainer}>
                <Button title="MENOR" onPress={nextGuessHandler.bind(this, 'lower')}/>
                <Button title="MAIOR" onPress={nextGuessHandler.bind(this, 'greater')}/>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    btnContainer:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '80%'
    }
});

export default GameScreen;
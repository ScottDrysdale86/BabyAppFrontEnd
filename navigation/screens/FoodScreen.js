import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Text, Image, Button, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import VerticalSlider from 'rn-vertical-slider';
import {postFeed} from '../FeedService.js'
import logo from './baby-logo.jpeg'




export default function FoodScreen({route, navigation}){
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [finalValue, setFinalValue] = useState(0)

    const { baby } = route.params;

  console.log(baby)

    const saveFeed = async () => {
        console.log("set time on press ", date)
        console.log("set time on press: ", finalValue)

        newFeed = {
           "time": date,
           "volume": finalValue,
           "baby": {
             "id": baby.id,
                   }
          }
        console.log(newFeed);
        postFeed(newFeed)
        navigation.navigate('List')
    }

    return (
         <View style={styles.container}>
            <TouchableOpacity onPress={()=> navigation.navigate('Home')}>
              <Image source={logo} style={styles.logo} />
            </TouchableOpacity>
            <Text style={styles.foodText1}>Time of Feed: </Text>

            <>
              <TouchableOpacity style={styles.buttonContainer} onPress={() => setOpen(true)} >
                <Text style={styles.buttonText}>Start Time</Text>
                </TouchableOpacity>
              <DatePicker
                modal
                open={open}
                date={date}
                onConfirm={(date) => {
                  setOpen(false)
                  setDate(date)
                  console.log("set time: ", date)
                }}
                onCancel={() => {
                  setOpen(false)
                }}
              />

            </>

            <Text style={styles.foodText2}>{moment(date).utcOffset('+0100').format('MMM Do, h:mm a')} oz</Text>

            <VerticalSlider
                      value={0}
                      disabled={false}
                      min={0}
                      max={12}
                      onChange={(value: number) => {
                         setFinalValue(value);
                         console.log("set amount: ", finalValue)

                      }}
                      width={50}
                      height={300}
                      step={0.5}
                      borderRadius={5}
                      minimumTrackTintColor={"#FE8E0D"}
                      maximumTrackTintColor={"#BAE6F2"}
                    />
            <Text style={styles.foodText3}>Amount: {finalValue} oz</Text>


            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={saveFeed}>
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>

         </View>
    )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4F6C73',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 15,
    height: 5,
    marginBottom: 7,
    padding: 60,
    borderColor: 'black',
    borderWidth: 2.5,
    borderRadius: 200 /2
  },
  foodText1: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 5,
  },
  foodText2: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 15,
  },
  foodText3: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 5,
  },
  buttonContainer: {
    elevation: 8,
    backgroundColor: "#FE8E0D",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
});
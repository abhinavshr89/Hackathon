import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { images } from '../../constants'
import { Image } from 'react-native'
import { storeEmergencyNumbers } from '../../appwrite/appwrite'
import { getCurrentAccount } from '../../appwrite/appwrite'

const AddContacts = () => {
  const [form, setForm] = useState({
    contactOne: "",
    contactTwo: "",
    contactThree: "",
    contactFour: "",
    contactFive: ""
  });

  const [userId,setUserId] = useState("");
  
  
  const handleChangeText = (key, value) => {
    setForm(prevState => ({ ...prevState, [key]: value }));
  };
  const handlePress= async()=>{
    console.log(form);
    const account = await getCurrentAccount();
    console.log(account.$id);
  }

  return (
    <SafeAreaView className="bg-primary w-full h-full">
      <ScrollView>
        <View className="bg-primary h-full w-full px-4 py-3 ">
          <View className="flex flex-row items-end">
            <Image source={images.wsaLogo} resizeMode="contain"
              className="w-[47px] ml-[-7px] h-[35px] mt-[60px]"
            />
            <Text className="text-white text-2xl font-psemibold">Safe </Text>
            <Text className="text-second text-2xl font-psemibold">Her</Text>
          </View>
          <Text className="text-white font-psemibold text-3xl mt-3">
            Add Contacts
          </Text>


          {Object.keys(form).map((key, index) => (
            <FormField
              key={index}
              title={`Contact ${index + 1}`}
              value={form[key]}
              handleChangeText={(e) => handleChangeText(key, e)}
              otherStyles="mt-4"
              inputStyles={"px-10"}
              keyboardType="phone-pad"

            />
          ))}
          <CustomButton
            title={"Add Contacts"}
            containerStyles={"mt-5"}
            handlePress={handlePress}
          />

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default AddContacts

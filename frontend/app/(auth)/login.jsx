import CustomButton from "../../components/CustomButton";
import facebookImg from "../../assets/images/facebook.png";
import googleImg from "../../assets/images/google.png";
import { router, Link } from "expo-router";
import { useToast } from 'react-native-toast-notifications';
import axios from "axios";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import {useState} from 'react'
import * as Yup from 'yup'
const Login = () => {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")

  const handleLogin = async() =>{
    const validationSchema = Yup.object().shape({
      password: Yup.string().required("Password is required"),
      email: Yup.string().email().required("Email is required"),
    })

    if(!email || !password){
      alert('please fill in all the inputs')
    }
    try{
      await validationSchema.validate({email, password})
      const user = {
        email: email,
        password: password
      };
      const response = await axios.post("http://10.5.223.206:5000/api/v1/auth/login", user);
      toast.show('user logged in successfully', { type: 'success' });
      console.log(response.data)
      router.push("/home")
    }
    catch(err){
      console.log("the catch error",err)
      toast.show('invalid credentials', {type: 'error'})
    }

  }
  return (
    <SafeAreaView className="bg-[#3366cc] h-full ">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
          marginTop: 100,
        }}
      >
        <View className="h-full bg-white w-full rounded-t-[25px] flex items-center px-5 py-[15%] mt-[25%]">
          <TouchableOpacity
            onPress={() => {
              router.push("/home");
            }}
          >
            <Text className="text-4xl font-bold">
              POST
              <Text className="text-[#3366cc]">LINE</Text>
            </Text>
          </TouchableOpacity>
          <View className="flex flex-col items-center gap-2 py-5">
            <Text className="font-bold text-secondary text-lg">
              Welcome ...
            </Text>
            <Text className="text-third">Sign In to continue</Text>
          </View>
          <View className="flex flex-col w-full">
            <View className="flex flex-row items-center justify-between border w-full h-[50px] rounded-md border-third p-4 ">
              <MaterialCommunityIcons
                name="email-outline"
                size={18}
                color="#b1b6c8"
              />
              <TextInput
              value={email}
                onChangeText={(e)=> setEmail(e)}
                placeholder="Your Email"
                className="flex-1 px-3 items-center h-[50px]"
              />
            </View>
            <View className="flex flex-row items-center mt-5 justify-between border w-full h-[50px] rounded-md border-third overflow-hidden py-4 pl-4">
              <MaterialIcons name="lock-outline" size={17} color="#b1b6c8" />
              <TextInput
                value={password}
                onChangeText={(e)=> setPassword(e)}
                placeholder="Password"
                className="flex-1 px-3 items-center h-[50px]"
              />
            </View>
          </View>
          <View className="flex w-full items-center py-4">
            <CustomButton
              handlePress={handleLogin}
              content="Sign In"
            />
          </View>
          <View className="flex flex-col items-center pt-5">
            <Text className="text-primary font-bold">Forgot Password? </Text>
            <Text className="text-third mt-2">
              Don't have an account?{" "}
              <Link href="/signup" className="text-primary font-bold">
                Register
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

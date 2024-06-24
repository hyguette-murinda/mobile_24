import { useEffect, useState } from 'react';
import CustomButton from '../../components/CustomButton';
import useAuth from '../../hooks/useAuth';
import { useRouter } from 'expo-router';
import { FlatList, Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

export default function HomeScreen() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Fetching posts from JSONPlaceholder using axios
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        setPosts(response.data); // Assuming response.data is an array of posts
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  return (
        <SafeAreaView className='bg-white h-full px-3 pt-3'>
      <FlatList
        data={posts}
        ListEmptyComponent={() => (
          <View className='h-full justify-center items-center bg-gray-50 rounded-lg'>
            <Image
              source={require('../../assets/images/no-data.png')}
              style={{ width: 200, height: 200 }}
              className='rounded-lg'
            />
            <Text className='text-lg text-gray-700 pt-3'>No posts available</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className='p-3 rounded-lg mb-3 border border-gray-200 shadow-sm'>
            <Text className='text-lg font-semibold'>{item.title}</Text>
            <Text className='text-base text-gray-500 mb-3'>{item.body}</Text>
            <CustomButton
              handlePress={() => router.push(`/post/${item.id}`, { postId: item.id })}
              title='View'
              containerStyles='mt-3'
              variant='outline'
              titleStyles='text-base'
              content="Read Post"
            />
          </View>
        )}
        ListHeaderComponent={() => (
          <View className='mb-6'>
            <Text className='text-xl text-gray-800 font-rubiksemibold'>Welcome {user?.name}</Text>
            <Text className='text-gray-500 text-base'>Here are the posts available</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

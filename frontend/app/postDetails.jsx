import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PostDetails = () => {
  const route = useRoute();
  const { postId } = route.params;

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loadingPost, setLoadingPost] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);

  useEffect(() => {
    // Fetch post details
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then(response => response.json())
      .then(data => {
        setPost(data);
        setLoadingPost(false);
      })
      .catch(error => {
        console.error('Error fetching post:', error);
        setLoadingPost(false);
      });

    // Fetch comments
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
      .then(response => response.json())
      .then(data => {
        setComments(data);
        setLoadingComments(false);
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
        setLoadingComments(false);
      });
  }, [postId]);

  if (loadingPost) {
    return (
      <SafeAreaView className='flex-1 justify-center items-center'>
        <ActivityIndicator size='large' color='#0000ff' />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className='p-3 px-5 h-full'>
      {post && (
        <View className='mb-6'>
          <Text className='text-xl font-rubiksemibold text-gray-800'>{post.title}</Text>
          <Text className='text-gray-600 text-base'>{post.body}</Text>
        </View>
      )}
      <Text className='text-lg font-rubiksemibold text-gray-800 mb-3'>Comments</Text>
      {loadingComments ? (
        <ActivityIndicator size='large' color='#0000ff' />
      ) : (
        <FlatList
          data={comments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View className='p-3 mb-3 rounded-lg border border-gray-200 shadow-sm'>
              <Text className='text-base font-semibold'>{item.name}</Text>
              <Text className='text-sm text-gray-500'>{item.email}</Text>
              <Text className='text-base'>{item.body}</Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default PostDetails;

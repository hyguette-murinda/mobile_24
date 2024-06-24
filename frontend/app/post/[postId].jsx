import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePathname, useRouter } from 'expo-router';
import { useToast } from 'react-native-toast-notifications';
import Ioicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';
import SmallButton from '../../components/SmallButton';

const PostView = () => {
  const toast = useToast();
  const pathname = usePathname();
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loadingPost, setLoadingPost] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (pathname) {
      const id = pathname.split('/')[2];
  
      // Fetch post details
      axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(response => {
          setPost(response.data);
          setLoadingPost(false);
        })
        .catch(error => {
        
          setLoadingPost(false);
        });
  
      // Fetch comments
      axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
        .then(response => {
          setComments(response.data);
          setLoadingComments(false);
        })
        .catch(error => {
          console.error('Error fetching comments:', error);
          setLoadingComments(false);
        });
    }
  }, [pathname]);

  const handleDelete = () => {
    if (pathname) {
      const id = pathname.split('/')[2];
      setDeleting(true);

      axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(response => {
          if (response.status === 200) {
            toast.show('Post deleted successfully', { type: 'success' });
            router.push('/home');
          } else {
            throw new Error('Failed to delete post');
          }
        })
        .catch(error => {
          toast.show(error.message, { type: 'danger' });
        })
        .finally(() => {
          setDeleting(false);
        });
    }
  };

  const confirmDelete = () => {
    Alert.alert(
      'Delete Post',
      'Are you sure you want to delete this post?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: handleDelete,
        },
      ],
      { cancelable: true }
    );
  };

  if (loadingPost) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' color='#0000ff' />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ backgroundColor: 'white', paddingHorizontal: 20, paddingVertical: 20, flex: 1 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
        <TouchableOpacity
          onPress={() => router.push('/home')}
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <Ioicons name='arrow-back' size={24} />
          <Text style={{ marginLeft: 5 }}>Back to posts</Text>
        </TouchableOpacity>
        <SmallButton
          isLoading={deleting}
          handlePress={confirmDelete}
          content='Delete'
          variant='outline'
          titleStyles={{ color: 'red' }}
          containerStyles={{ width: 80 }}
        />
      </View>
      <View style={{ marginBottom: 20 }}>
        {post && (
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#333' }}>{post.title}</Text>
            <Text style={{ fontSize: 16, color: '#666', marginTop: 10 }}>{post.body}</Text>
          </View>
        )}
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 10 }}>Comments</Text>
        {loadingComments ? (
          <ActivityIndicator size='large' color='#0000ff' />
        ) : (
          <FlatList
            data={comments}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={{ marginBottom: 20, backgroundColor: 'white', borderRadius: 10, padding: 20, borderWidth: 1, borderColor: '#E5E7EB', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 5 }}>{item.name}</Text>
                <Text style={{ fontSize: 14, color: '#666', marginBottom: 5 }}>{item.email}</Text>
                <Text style={{ fontSize: 16, color: '#333' }}>{item.body}</Text>
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default PostView;

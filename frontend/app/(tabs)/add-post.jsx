import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useToast } from 'react-native-toast-notifications';
import axios from 'axios'; // Import axios library

const AddPost = () => {
    const toast = useToast();

    const [formData, setFormData] = useState({
        title: '',
        body: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = () => {
        if (!formData.title || !formData.body) {
            return toast.show("Please fill in all fields", {
                type: 'danger'
            });
        }

        setIsLoading(true);

        axios.post('https://jsonplaceholder.typicode.com/posts', formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            setIsLoading(false);
            toast.show("Post created successfully", {
                type: 'success'
            });
            console.log(formData)
            setFormData({
                title: '',
                body: ''
            });
        })
        .catch(error => {
            setIsLoading(false);
            toast.show("Error creating post", {
                type: 'danger'
            });
            console.error('Error:', error);
        });
    };

    return (
        <SafeAreaView style={{ padding: 16 }}>
            <View>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#333' }}>Add Post</Text>
                <Text style={{ fontSize: 16, color: '#666' }}>Fill in the form below to add a new Post</Text>
            </View>
            <View className='my-8'>
                <CustomInput
                    value={formData.title}
                    label='Post Title'
                    placeholder='Enter post title'
                    onChangeText={(val) => setFormData({ ...formData, title: val })}
                />
                <CustomInput
                    value={formData.body}
                    label='Body'
                    placeholder='Enter post body'
                    onChangeText={(val) => setFormData({ ...formData, body: val })}
                    multiline
                    numberOfLines={4}
                    containerStyles={{ marginTop: 12 }}
                />
            </View>
            <CustomButton
                content='Add Post'
                handlePress={handleSubmit}
                isLoading={isLoading}
                containerStyles={{ marginTop: 16, backgroundColor: '#007bff' }}
            />
        </SafeAreaView>
    );
};

export default AddPost;

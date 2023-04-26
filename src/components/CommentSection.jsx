import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, FlatList} from 'react-native';
import { db } from "../Firebase";
import { collection, getDocs, addDoc } from "@firebase/firestore";
import { useUser } from './UserProvider';

const Comment = ({ comment }) => {
  
  return (
    <View style={styles.commentContainer}>
      <Image style={styles.userImage} source={{ uri: comment.user_img }} />
      <View style={styles.commentTextContainer}>
        <Text style={styles.userName}>{comment.username}</Text>
        <Text style={styles.commentText}>{comment.comment}</Text>
      </View>
    </View>
  );
};

const CommentInput = ({ onSubmit }) => {
  const [text, setText] = useState('');

  const handleTextChange = (inputText) => {
    setText(inputText);
  };

  const handleCommentSubmit = () => {
    onSubmit(text);
    setText('');
  };

  return (
    <View style={styles.commentInputContainer}>
      <TextInput
        style={styles.commentInput}
        placeholder="Add a comment..."
        value={text}
        onChangeText={handleTextChange}
      />
      <TouchableOpacity style={styles.commentButton} onPress={handleCommentSubmit}>
        <Text style={styles.ButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export const CommentSection = ({ componentId }) => {
  const [comments, setComments] = useState([]);
  const commentsCollectionsRef = collection(db, "commentsApp");
  const { user } = useUser();

  useEffect(() => {
    const getComments = async () => {
      //obtiene toda la info de la base de datos en un json
      const data = await getDocs(commentsCollectionsRef);
      //filtra solo la data necesaria (los docs y el id)
      setComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getComments();
  }, []);

  const createComment = async (text) => {
    await addDoc(commentsCollectionsRef, {
      meal_id: componentId,
      username: user.name,
      user_img: user.picture,
      comment: text,
    });
    setComments([
      ...comments,
      { meal_id: componentId, username: user.name, comment: text, user_img: user.picture },
    ]);
  };

  return (
    <View>
      <FlatList
        data={comments.filter(item => item.meal_id == componentId)}
        renderItem={({ item }) => <Comment comment={item} />}
        keyExtractor={(item) => item.id}
        scrollEnabled={true}
      />
      <CommentInput onSubmit={createComment} />
    </View>
  );
};

const styles = StyleSheet.create({
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    marginHorizontal: 10,
  },
  userImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  userName: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  commentText: {
    flex: 1,
    flexWrap: 'wrap',
  },
  commentTextContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },

  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
    paddingVertical: 10
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 5
  },
  commentButton: {
    width: 75,
    height: 40,
    backgroundColor: '#3f51b5',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin:5,
    fontWeight: 'bold',
    fontSize: 16
  }, 
  ButtonText: {
    color: 'white',
    fontSize: 15,
  }
});

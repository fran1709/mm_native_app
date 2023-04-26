import React from 'react'
import { db } from "../Firebase";
import { collection, getDocs, addDoc } from "@firebase/firestore";
import { useState, useEffect } from "react";
import {View, Text, StyleSheet, TextInput, Button, Image, Touchable, TouchableOpacity} from "react-native";
import { useUser } from './UserProvider';


function CommentSection({ componentId }) {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [visibleComments, setVisibleComments] = useState(2); // número de comentarios visibles
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

  const createComment = async () => {
    await addDoc(commentsCollectionsRef, {
      meal_id: componentId,
      username: user.name,
      user_img: user.picture,
      comment: newComment,
    });
    setComments([
      ...comments,
      { meal_id: componentId, username: user.name, comment: newComment, user_img: user.picture },
    ]);
    setNewComment("");
  };

  const handleLoadMoreComments = () => {
    setVisibleComments(visibleComments + 2); // aumenta el número de comentarios visibles por 2
  };
    
  return (
    <View style={styles.container}>
      <Text style={styles.instructionsTitle}>Add Comment</Text>
      <View style={{justifyContent:'center', alignItems:'center'}}>
        <TextInput
          style={{ borderWidth: 1, borderColor: 'gray', padding: 5, width: 300,}}
          placeholder="Enter your comment"
          value={newComment}
          multiline={true} 
          textAlignVertical='top' 
          onChangeText={setNewComment}
        />
      </View>
      <View style={{justifyContent:'center', alignItems:'center'}}>
        <TouchableOpacity style={styles.button} onPress={createComment} >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.instructionsTitle}>Comments</Text>
      {comments.filter((comment) => comment.meal_id == componentId)
      .slice(0, visibleComments) // muestra solo los primeros visibleComments comentarios
      .map((comment) => (
        <View key={comment.id} style={styles.commentContainer}>
            <Image source={{uri: comment.user_img}} style={styles.userImage}></Image>
            <View style={styles.commentTextContainer}>
              <Text style={styles.userName}> {comment.username} </Text>
              <Text style={styles.commentText}>{comment.comment}</Text>
            </View>   
        </View>
      ))}
      {comments.filter((comment) => comment.meal_id == componentId).length > visibleComments && (
        <TouchableOpacity style={styles.button2} onPress={handleLoadMoreComments}>
          <Text style={styles.buttonText2}>Load more comments</Text>
        </TouchableOpacity>
      )}
    </View>

  )
}
const styles = StyleSheet.create({
  
  button: {
    width: 120,
    height: 50,
    backgroundColor: '#3f51b5',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin:10
  },
  button2: {
    width: 120,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal:10,
  },
  buttonText2: {
    color: 'blue',
    fontSize: 13,
  },
  buttonText: {
      color: 'white',
      fontSize: 15,
  },
  instructionsTitle:{
      padding:10,
      fontSize:18,
      fontWeight:'bold'
  },
  strInstructionsContainer:{
      flex:1,
      padding:5,
      justifyContent:'center'
  },
  strInstructions:{
      fontSize:16,
      justifyContent:'flex-start',
      padding:5
  },
  container:{
      flexDirection:'column',
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    marginHorizontal: 10,
  },
  userImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
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
});
export default CommentSection
import { useEffect } from "react";
import store from "../..";
import { toast } from "react-toastify";
import fire from "../../config/fire";
import { storage } from "../../config/fire";
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage"



const setPostsLoading = (message) => ({
    type: "SET_POSTS_LOADING",
    payload: message,
});
const setUploaded = (message) => ({
    type: "SET_UPLOADED",
    payload: message,
});
const setPosts = (data) => ({
    type: "SET_POSTS",
    payload: data,
});

setInterval(() => {
    getPosts();
}, 1000);

var count = 0;

export const getPosts = () => async(dispatch) => {
    // const myInterval = setInterval(async () => {
    dispatch(setPostsLoading(true));

    const posts = await fire.firestore().collection("posts").get();

    const allPosts = [];

    posts.forEach((post) => {
        if (post.id !== "27g9Q1JzQmEZbQ8AxaBg") {
            allPosts.push({ post: post.data(), postId: post.id });
        }
    });

    dispatch(setPostsLoading(false));
    dispatch(setPosts(allPosts));



    // }, 5000);
};

const addPost = (post) => ({
    type: "ADD_POST",
    payload: post,
});


export const newPost =
    (data, author, nameAuthor, setProgress) => (dispatch) => {
        fire
            .firestore()
            .collection("posts")
            .add({
                title: data.title,
                category: data.category,
                description: data.description,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                price: data.price,
                image: null,
                author,
                likes: 0,
                comments: [],
                postedBy: nameAuthor,
                currency: data.currency,
                option: data.option,
                tp: data.tp,
                sLValue: data.sLValue,
                tpValue: data.tpValue,
                signalCategory: data.signalCategory,
            })
            .then((doc) => {
                const fileUpload = ref(storage, `posts/${doc.id}`);
                const uploadTask = uploadBytesResumable(fileUpload, data.image);
                    

                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        const progress =
                            Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        setProgress(progress);
                    },
                    (error) => {
                        return toast.error(error.message);
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            fire
                                .firestore()
                                .collection("posts")
                                .doc(doc.id)
                                .update({
                                    image: downloadURL,
                                })
                                .then(async(post) => {
                                    const docum = await doc.get();
                                    const docData = docum.data();
                                    docData.image = downloadURL;
                                    dispatch(addPost({ data: docData, postId: doc.id }));
                                    setProgress(100);

                                    dispatch(getPosts());


                                });
                        });
                    }
                );

            
            });
            
    };



const addComment = (data) => ({
    type: "ADD_COMMENT",
    payload: data,
});

export const doComment = (id, comments, data) => (dispatch) => {
    fire
        .firestore()
        .collection("posts")
        .doc(id)
        .update({ comments: [...comments, data], updatedAt: Date.now() })
        .then(async() => {
            dispatch(addComment({ id, comment: data }));
        });
};

const addReply = (data) => ({
    type: "ADD_REPLY",
    payload: data,
});
export const doReply = (i, postId, comments, reply) => (dispatch) => {
    // console.log(id, comments, name, email, reply);
    const currentComment = comments.find((comment, id) => i === id);
    currentComment.replies = [...currentComment.replies, reply];
    const updatedComments = comments.map((comment, id) =>
        id === i ? currentComment : comment
    );
    fire
        .firestore()
        .collection("posts")
        .doc(postId)
        .update({ comments: updatedComments, updatedAt: Date.now() })
        .then(async() => {
            dispatch(addReply({ id: i, postId, updatedComments }));
        });
};

const removeComment = (data) => ({
    type: "DELETE_COMMENT",
    payload: data,
});

export const deleteComment = (id, postId, comments) => (dispatch) => {
    const filteredComments = comments.filter((comment, i) => i !== id);
    fire
        .firestore()
        .collection("posts")
        .doc(postId)
        .update({
            comments: filteredComments,
            updatedAt: Date.now(),
        })
        .then(() => {
            dispatch(removeComment({ filteredComments, postId }));
        });
};

const deletePost = (postId) => ({
    type: "DELETE_POST",
    payload: postId,
});

export const postDel = (postId) => (dispatch) => {
    fire
        .storage()
        .ref(`posts/${postId}`)
        .delete()
        .then(() => {
            fire
                .firestore()
                .collection("posts")
                .doc(postId)
                .delete()
                .then(() => {
                    dispatch(deletePost(postId));
                });
        });
};

const updatePost = (data) => ({
    type: "UPDATE_POST",
    payload: data,
});

export const postUpdate = (postId, data) => (dispatch) => {
    fire
        .firestore()
        .collection("posts")
        .doc(postId)
        .update({
            title: data.title,
            category: data.category,
            description: data.description,
        })
        .then(() => {
            dispatch(updatePost({ postId, data }));
        });
};
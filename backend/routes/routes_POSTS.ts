import express from "express";

export const router = express.Router();

const DUMMY_POSTS = [
    {
        id: "1",
        title: "YEEEY",
        description: "lorem ipsum sudo lomen"
    },{
        id: "2",
        title: "YEEEY 2",
        description: "lorem ipsum sudo lomen"
    },{
        id: "3",
        title: "YEEEY 3",
        description: "lorem ipsum sudo lomen"
    },{
        id: "4",
        title: "YEEEY 4",
        description: "lorem ipsum sudo lomen"
    },
]

router.get('/:postID', (req, res, next) => {
    const postID = req.params.postID;
    const post = DUMMY_POSTS.find( p => {
        return p.id === postID;
    });
    res.json({ post: post });
});




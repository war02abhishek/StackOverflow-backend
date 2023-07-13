import Questions from "../models/Questions.js"
import mongoose from 'mongoose'

export const postqComment = async (req,res) =>{
    const { id: _id } = req.params;
    const {commentBody , userCommented} = req.body;
    const userId = req.userId;
    

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('question unavailable...');
    }
    try{
        const updatedQuestion = await Questions.findByIdAndUpdate(_id, {$addToSet: {'Comment':[{commentBody,userCommented, userId}]}})
        res.status(200).json(updatedQuestion)
        
    }catch(error){
        console.log(error)
        res.status(409).json("couldnt post a new comment")
    }

}
 
export const deleteComment = async ( req, res ) => {
    const { id:_id } = req.params;
    const { commentId } = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('comment unavailable...');
    }
    if(!mongoose.Types.ObjectId.isValid(commentId)){
        return res.status(404).send('comment unavailable...');
    }
    
    try{
        await Questions.updateOne(
            { _id }, 
            { $pull: { 'Comment': { _id: commentId } } }
        )
        res.status(200).json({ message: "Successfully deleted..."})
    }catch(error){
        res.status(405).json(error)
    }
}
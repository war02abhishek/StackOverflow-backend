
import mongoose from 'mongoose'

import Questions from "../models/Questions.js"

export const postaComment = async (req,res) =>{
    const { id: _id } = req.params;
    const {answerId,commentBody,userCommented} = req.body;
    const userId = req.userId;
    

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('comment unavailable...');
    }
    if(!mongoose.Types.ObjectId.isValid(answerId)){
        return res.status(404).send('answer unavailable...');
    }

    try{
       
        const updatedQuestion = await Questions.updateOne(
            { 'answer._id' : answerId}, 
            { $push: { 
           "answer.$.Comment": { 
             commentBody, 
             userCommented,
             userId }
            } 
           })
        res.status(200).json(updatedQuestion) 

        
    }catch(error){
        console.log(error)
        res.status(409).json("couldnt post a new comment")
    }

}
 
export const deleteaComment = async ( req, res ) => {
    const { id:_id } = req.params;
    const { answerId,commentId } = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('question unavailable...');
    }
    if(!mongoose.Types.ObjectId.isValid(answerId)){
        return res.status(404).send('comment unavailable...');
    }
    if(!mongoose.Types.ObjectId.isValid(commentId)){
        return res.status(404).send('comment unavailable...');
    }
    
    try{
        
        // await Questions.updateOne(
        //     {_id, "answer._id": answerId},{
        //         $pull:{
        //             "answer.$.Comment":{
        //                 "_id": commentId
        //             }
        //         }
        //     }
        // )


        await Questions.updateOne(
            { 'answer._id': answerId},{
                $pull:{
                    'answer.$.Comment' : { '_id' :commentId}
                }
            }
        )

        res.status(200).json({ message: "Successfully deleted..."})
    }catch(error){
        res.status(409).json(error)
        console.log(error)
    }
}
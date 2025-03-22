




const getAllReviews = async function(req,res){
    try {
        //get the data
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}



module.exports = {
    getAllReviews
}
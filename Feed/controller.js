const Feed = require("./schema");
const { ObjectId } = require('mongodb');
const { isValidObjectId } = require("mongoose");

/**
 * Validates the given feed's elements
 * @param {Feed} feed 
 * @returns {boolean}
 */
const validateFeed = async (feed)=>{

    try {

        // will throw if fails
        await new Feed(feed).validate();
        return true;

    } catch (error){
        return false;
    }

};
exports.validateFeed = validateFeed;


/**
 * @param {Feed} feed 
 * @returns {Feed}
 */
const createFeed = async (feed)=>{

    const valid = await validateFeed(feed);
    if ( !valid ) return valid;

    const newFeed = await new Feed(feed).save();
    return newFeed;

};
exports.createFeed = createFeed;

/**
 * @param {ObjectId} oid 
 * @returns {Feed}
 */
 const findFeed = async (oid)=>{

    if ( ! isValidObjectId(oid) ) return false;

    const feed = await Feed.findOne({ _id: new ObjectId(oid) });
    return feed;

};
exports.findFeed = findFeed;

/**
 * @param {ObjectId} oid 
 * @param {Object} update 
 * @returns {Feed}
 */
const updateFeed = async (oid, update)=>{

    if ( ! isValidObjectId(oid) ) return false;

    const modFeed = await Feed.updateOne({ _id: new ObjectId(oid) }, { ...update })
    return modFeed.modifiedCount;

};
exports.updateFeed = updateFeed;


/**
 * @param {ObjectId} oid 
 * @returns {Feed}
 */
const deleteFeed = async (oid)=>{

    if ( ! isValidObjectId(oid) ) return false;

    const feed = await Feed.deleteOne({ _id: new ObjectId(oid) });
    return feed.deletedCount;

};
exports.deleteFeed = deleteFeed;
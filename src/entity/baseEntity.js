const mongoose = require("mongoose")


let databaseService = {

    connect: async () => {
        await mongoose.connect("mongodb://localhost:27017/coupons", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
        mongoose.set("debug", true)
    },
    insert: async (model, data) => {

        let response = await new model(data).save()
        return response
    },
    findOne: async (model, conditions) => {
        let response = await model.findOne(conditions).lean()
        return response
    },
    edit: async (model, query, update, options) => {
        await model.updateOne(query, update)
        return
    },
    aggregate: async (model, pipeline) => {
        return await model.aggregate(pipeline)
    }

}




module.exports = { databaseService }
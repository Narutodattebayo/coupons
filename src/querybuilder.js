

const allCoupons = (payload) => {
    let pipeline = [];
    let matchConditions = []
    matchConditions.push({ isDelete: false })
    pipeline.push({ $match: { $and: matchConditions } })
    pipeline.push({ $skip: ((payload.page - 1) * payload.limit) })
    pipeline.push({ $sort: { createdAt: -1 } })
    return pipeline;
}

module.exports = {
   
    allCoupons
}
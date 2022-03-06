const BaseDao = require("../helper/BaseDao");
const { ObjectId } = require("mongodb");


const UserModel = class UserModel extends BaseDao {

    async getAllUser() {
        try {
            let data = await (await this.find()).toArray();
            return this.response(true, data, []);
        } catch (error) {
            return this.response(false, [], [error.message])
        }
    }

    async createUser(request) {
        try {
            let data = await (await this.insertOne(request));
            console.log(data);
            if (data.acknowledged) {
                return this.response(true, data, ['success add data'])
            } else {
                return this.response(false, {}, ['create user failed'])
            }
        } catch (err) {
            return this.response(false, {}, [err.message])
        }
    }

    async findById(id) {
        try {
            let data = await (await this.findOne({ '_id':  ObjectId(id) }))
            if (data) {
                return this.response(true, data, []);
            }
            return this.response(true, [], []);
        } catch (error) {
            return this.response(false, [], [error.message])
        }
    }


    async updateUser(request) {
        try {
            let new_data = request.body;
            let query = { '_id': ObjectId(request.params.id) }
        
            let update = await (await this.updateOne(query, { '$set': new_data }));
            if (update) {
                return this.response(true, update, []);
            }
            return this.response(false, [], ['data not updated'])

        } catch (error) {
            return this.response(false, [], [error.message]);
        }
    }


    async deleteUser(id) {
        let query = { '_id': ObjectId(id) };
        try {
            let data = await (await this.deleteOne(query))
            if (data) {
                return this.response(true, data, []);
            }
            return this.response(true, [], []);
        } catch (error) {
            return this.response(false, [], [err.message]);
        }
    }
    
    response(success, data, message) {
        return { success: success, data: data, message: message }
    }
}

module.exports = UserModel;
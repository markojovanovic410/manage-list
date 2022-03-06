let db_connect;
let COLLECTION_NAME = 'contacts';
let DB_NAME = 'contacts';
const BaseDao = class BaseDao {
    static injectDB(conn) {
        if (db_connect) {
            return;
        }
        try {
            db_connect = conn.db(DB_NAME);
        } catch (e) {
            console.error(e);
        }
    }

    async aggregate(query) {
        let cursor;
        try {
            cursor = await db_connect.collection(COLLECTION_NAME).aggregate(query);
        } catch (error) {
            console.log(error);
            return []
        }
        return cursor;
    }

    async findOne(query, project = {}) {
        let cursor;
        try {
            cursor = await db_connect.collection(COLLECTION_NAME).findOne(query, project);
        } catch (error) {
            console.log(error);
            return [];
        }
        return cursor;
    }

    async find(query, project = {}) {
        let cursor;
        try {
            console.log(db_connect);
            cursor = await db_connect.collection(COLLECTION_NAME).find(query, project);
        } catch (error) {
            console.log(error);
            return [];
        }
        return cursor;
    }

    /**
     *
     * @param  query
     * @param  set
     * @returns
     */
    async updateOne(query, set) {
        let cursor;
        try {
            cursor = await db_connect.collection(COLLECTION_NAME).updateOne(query, set);
        } catch (error) {
            return error.message;
        }
        return cursor;
    }

    /**
     *
     * @param  query
     * @param  set
     * @returns
     */
    async updateMany(query, set) {
        let cursor;
        try {
            cursor = await db_connect.collection(COLLECTION_NAME).updateMany(query, set);
        } catch (error) {
            console.log(error);
            return [];
        }
        return cursor;
    }

    /**
     * 
     * @param  query
     * @returns 
     */
    async insertOne(query) {
        let cursor;
        try {
            cursor = await db_connect.collection(COLLECTION_NAME).insertOne(query);
        } catch (error) {
            console.log(error);
            return;
        }
        return cursor;
    }

    /**
     * 
     * @param  query
     * @returns 
     */
    async insertMany(query) {
        let cursor;
        try {
            cursor = await db_connect.collection(COLLECTION_NAME).insertMany(query);
        } catch (error) {
            console.log(error);
            return;
        }
        return cursor;
    }

    async deleteOne(query) {
        let cursor;
        try {
            cursor = await db_connect.collection(COLLECTION_NAME).deleteOne(query);
        } catch (error) {
            console.log(error);
            return;
        }
        return cursor;
    }
}

module.exports = BaseDao
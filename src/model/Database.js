var SQLite = require('react-native-sqlite-storage');
//SQLite.DEBUG(true);
//SQLite.enablePromise(true);

export default class Database {

    static databaseInstance = null;

    static NAME = "pennsylvania";
    static VERSION = "0.5";
    static VERSION = "0.4";
    static DESCRIPTION = "Pennsylvania Database";
    // Database size in bytes (32MB)
    static DB_SIZE = 1024 * 1024 * 32;

    static USERS_TABLE = "users";
    static BRANDS_TABLE = "brands";
    static COLORS_TABLE = "colors";
    static PRESENTATIONS_TABLE = "presentations";
    static PRODUCTS_TABLE = "products";
    static DEALERS_TABLE = "dealers";
    static DEALER_TYPES_TABLE = "dealer_types";
    static DEALERS_TYPES_TABLE = "dealers_types";
    static SURVEYS_TABLE = "surveys";
    static SURVEY_PRODUCTS_TABLE = "survey_products";
    static SURVEY_COMMENTS_TABLE = "survey_brands";

    static getInstance() {
        if (Database.databaseInstance == null) {
            Database.databaseInstance = new Database();
            Database.databaseInstance.setup();
        }
        return Database.databaseInstance;
    }

    constructor() {
        this.db = null;
    }

    async setup() {
        this.db = await SQLite.openDatabase(Database.NAME, Database.VERSION, Database.DESCRIPTION, Database.DB_SIZE, this.onOpenDatabase, this.onOpenErrorDatabase);
        this.db.executeSql("CREATE TABLE IF NOT EXISTS " + Database.USERS_TABLE + " (id INT PRIMARY KEY, email TEXT, password TEXT, name TEXT, date TEXT, active INT)");
        this.db.executeSql("CREATE TABLE IF NOT EXISTS " + Database.BRANDS_TABLE + " (id INT PRIMARY KEY, name TEXT, date TEXT, sort INT, active INT)");
        this.db.executeSql("CREATE TABLE IF NOT EXISTS " + Database.COLORS_TABLE + " (id INT PRIMARY KEY, name TEXT, date TEXT, sort INT, active INT)");
        this.db.executeSql("CREATE TABLE IF NOT EXISTS " + Database.DEALER_TYPES_TABLE + " (id INT PRIMARY KEY, name TEXT, date TEXT, sort INT, active INT)");
        this.db.executeSql("CREATE TABLE IF NOT EXISTS " + Database.PRESENTATIONS_TABLE + " (id INT PRIMARY KEY, name TEXT, date TEXT, sort INT, active INT)");
        this.db.executeSql("CREATE TABLE IF NOT EXISTS " + Database.DEALERS_TABLE + " (id INT PRIMARY KEY, name TEXT, date TEXT, active INT)");
        this.db.executeSql("CREATE TABLE IF NOT EXISTS " + Database.DEALERS_TYPES_TABLE + " (dealer_id INT, type_id INT)");
        this.db.executeSql("CREATE TABLE IF NOT EXISTS " + Database.PRODUCTS_TABLE + " (id INT PRIMARY KEY, brand_id INT, name TEXT, brand TEXT, family TEXT, capacity TEXT, date TEXT, active INT)");
        this.db.executeSql("CREATE TABLE IF NOT EXISTS " + Database.SURVEYS_TABLE + " (id INTEGER PRIMARY KEY, user_id INT, dealer_id INT, time INT, date TEXT, sync INT, exclusive INT, active INT)");
        this.db.executeSql("CREATE TABLE IF NOT EXISTS " + Database.SURVEY_PRODUCTS_TABLE + " (id INTEGER PRIMARY KEY, survey_id INT, product_id INT, color_id INT, presentation_id INT, price REAL, date TEXT, sync INT, active INT, type_id INT, photo TEXT)");
        this.db.executeSql("CREATE TABLE IF NOT EXISTS " + Database.SURVEY_COMMENTS_TABLE + " (id INTEGER PRIMARY KEY, survey_id INT, brand_id INT, comment TEXT, date TEXT, sync INT, active INT)");
        this.db.executeSql("CREATE INDEX date_index ON " + Database.SURVEYS_TABLE + " (date)");
        this.db.executeSql("CREATE INDEX dealer_id_index ON " + Database.DEALERS_TYPES_TABLE + " (dealer_id)");
    }

    drop() {
        this.db.executeSql("DROP INDEX IF EXISTS date_index");
        this.db.executeSql("DROP INDEX IF EXISTS dealer_id_index");
        this.db.executeSql("DROP TABLE IF EXISTS " + Database.USERS_TABLE);
        this.db.executeSql("DROP TABLE IF EXISTS " + Database.BRANDS_TABLE);
        this.db.executeSql("DROP TABLE IF EXISTS " + Database.COLORS_TABLE);
        this.db.executeSql("DROP TABLE IF EXISTS " + Database.DEALERS_TABLE);
        this.db.executeSql("DROP TABLE IF EXISTS " + Database.DEALER_TYPES_TABLE);
        this.db.executeSql("DROP TABLE IF EXISTS " + Database.PRESENTATIONS_TABLE);
        this.db.executeSql("DROP TABLE IF EXISTS " + Database.DEALERS_TYPES_TABLE);
        this.db.executeSql("DROP TABLE IF EXISTS " + Database.PRODUCTS_TABLE);
        this.db.executeSql("DROP TABLE IF EXISTS " + Database.SURVEYS_TABLE);
        this.db.executeSql("DROP TABLE IF EXISTS " + Database.SURVEY_COMMENTS_TABLE);
        this.db.executeSql("DROP TABLE IF EXISTS " + Database.SURVEY_PRODUCTS_TABLE);
    }

    onOpenDatabase() {
        console.log("Database opened " + Database.NAME);
    }

    onOpenErrorDatabase() {
        console.log("Database error " + Database.NAME);
    }

    insert(table, row) {
        let values = [];
        let sql = "INSERT INTO " + table + " (";
        for (let key in row) {
            sql += key + ","
        }
        sql = sql.substring(0, sql.length - 1);
        sql += ") VALUES (";
        for (let key in row) {
            sql += "?,"
            values.push(row[key]);
        }
        sql = sql.substring(0, sql.length - 1);
        sql += ")";

        return new Promise((resolve, reject) => {
            this.db.transaction(tx => {
                tx.executeSql(sql, values, (tx, results) => {
                    resolve(results);
                });
            });
        });
    }

    update(table, row, where) {
        let values = [];
        let sql = "UPDATE " + table + " SET ";
        for (let key in row) {
            sql += key + "=?,"
            values.push(row[key]);
        }
        sql = sql.substring(0, sql.length - 1);
        if (where.length > 0) {
            sql += " WHERE "
        }
        for (let filter of where) {
            sql += filter.column;
            sql += filter.comparator;
            sql += "?";
            sql += " " + filter.operator + " ";
            values.push(filter.value);
        }
        return new Promise((resolve, reject) => {
            this.db.transaction(tx => {
                tx.executeSql(sql, values, (tx, results) => {
                    resolve(results);
                });
            });
        });
    }

    select(table, fields, where, order) {
        let values = [];
        let sql = "SELECT ";
        for (let field of fields) {
            sql += field + ","
        }
        sql = sql.substring(0, sql.length - 1);
        sql += " FROM " + table;

        if (where.length > 0) {
            sql += " WHERE "
        }

        for (let filter of where) {
            sql += filter.column;
            sql += filter.comparator;
            sql += "?";
            sql += " " + filter.operator + " ";
            values.push(filter.value);
        }

        if (order.length > 0) {
            sql += " ORDER BY "
            for (let filter of order) {
                sql += filter.column + " " + filter.sort + ",";
            }
            sql = sql.substring(0, sql.length - 1);
        }

        return new Promise((resolve, reject) => {
            this.db.transaction(tx => {
                tx.executeSql(sql, values, (tx, results) => {
                    let data = results.rows;
                    resolve(data);
                });
            });
        });
    }

    getLastInsertedId() {
        return new Promise((resolve, reject) => {
            this.db.transaction(tx => {
                tx.executeSql("SELECT last_insert_rowid() AS id", [], (tx, results) => {
                    let data = results.rows;
                    resolve(data);
                });
            });
        });
    }

    getSurveyProducts(surveyId, brandId) {
        let sql = "SELECT a.id, a.survey_id, a.product_id, a.color_id, a.presentation_id, a.price, a.photo, a.sync, a.active, a.date, a.type_id FROM " + Database.SURVEY_PRODUCTS_TABLE + " AS a INNER JOIN " + Database.PRODUCTS_TABLE + " AS b ON a.product_id = b.id WHERE a.survey_id = " + surveyId + " AND b.brand_id = " + brandId + " AND a.active = 1 ORDER BY b.name ASC";
        return new Promise((resolve, reject) => {
            this.db.transaction(tx => {
                tx.executeSql(sql, [], (tx, results) => {
                    let data = results.rows;
                    resolve(data);
                });
            });
        });
    }

    getDealers() {
        let sql = "SELECT a.id, a.name, a.date, a.active, GROUP_CONCAT(b.type_id) as types FROM " + Database.DEALERS_TABLE + " AS a LEFT JOIN " + Database.DEALERS_TYPES_TABLE + " AS b ON a.id = b.dealer_id WHERE a.active = 1 GROUP BY a.id ORDER BY a.name ASC";
        return new Promise((resolve, reject) => {
            this.db.transaction(tx => {
                tx.executeSql(sql, [], (tx, results) => {
                    let data = results.rows;
                    resolve(data);
                });
            });
        });
    }

    getDealerTypes(dealerId) {
        let sql = "SELECT type_id FROM " + Database.DEALERS_TYPES_TABLE + " WHERE dealer_id = " + dealerId;
        return new Promise((resolve, reject) => {
            this.db.transaction(tx => {
                tx.executeSql(sql, [], (tx, results) => {
                    let data = results.rows;
                    resolve(data);
                });
            });
        });
    }

    flushDealerTypes() {
        let sql = "DELETE FROM " + Database.DEALERS_TYPES_TABLE;
        return new Promise((resolve, reject) => {
            this.db.transaction(tx => {
                tx.executeSql(sql, [], (tx, results) => {
                    let data = results.rows;
                    resolve(data);
                });
            });
        });
    }

    getUnsyncSurveyProducts() {
        let sql = "SELECT a.id, a.survey_id, a.product_id, a.color_id, a.presentation_id, a.price, a.photo, a.sync, a.active, a.date, a.type_id FROM " + Database.SURVEY_PRODUCTS_TABLE + " AS a INNER JOIN " + Database.PRODUCTS_TABLE + " AS b ON a.product_id = b.id WHERE a.sync = 0";
        return new Promise((resolve, reject) => {
            this.db.transaction(tx => {
                tx.executeSql(sql, [], (tx, results) => {
                    let data = results.rows;
                    resolve(data);
                });
            });
        });
    }

    getNumberOfUnsyncProducts(surveyId) {
        let sql = "SELECT COUNT(*) AS total FROM " + Database.SURVEY_PRODUCTS_TABLE + " WHERE sync = 0 AND survey_id = " + surveyId;
        return new Promise((resolve, reject) => {
            this.db.transaction(tx => {
                tx.executeSql(sql, [], (tx, results) => {
                    let data = results.rows;
                    resolve(data);
                });
            });
        });
    }

    getNumberOfUnsyncComments(surveyId) {
        let sql = "SELECT COUNT(*) AS total FROM " + Database.SURVEY_COMMENTS_TABLE + " WHERE sync = 0 AND survey_id = " + surveyId;
        return new Promise((resolve, reject) => {
            this.db.transaction(tx => {
                tx.executeSql(sql, [], (tx, results) => {
                    let data = results.rows;
                    resolve(data);
                });
            });
        });
    }
}
module.exports = function(sequelize, DataTypes) {
    var Item = sequelize.define("Item", {
        name: {
            type: DataTypes.STRING
        }
    });
    return Item;
};
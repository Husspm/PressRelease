module.exports = function(sequelize, DataTypes) {
    var Item = sequelize.define("Item", {
        synthType: {
            type: DataTypes.INTEGER
        },
        pitchDecay: {
            type: DataTypes.FLOAT
        },
        intensity: {
            type: DataTypes.INTEGER
        }
    });
    return Item;
};
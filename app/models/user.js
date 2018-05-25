module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("users", {
        username: DataTypes.STRING,
        localemail: DataTypes.STRING,
        localpassword: DataTypes.STRING,
        facebookid: DataTypes.STRING,
        facebooktoken: DataTypes.STRING,
        facebookemail: DataTypes.STRING,
        facebookname: DataTypes.STRING,
        twitterid: DataTypes.STRING,
        twittertoken: DataTypes.STRING,
        twitterdisplayname: DataTypes.STRING,
        twitterusername: DataTypes.STRING,
        googleid: DataTypes.STRING,
        googletoken: DataTypes.STRING,
        googleemail: DataTypes.STRING,
        googlename: DataTypes.STRING
    });

    return User;
};
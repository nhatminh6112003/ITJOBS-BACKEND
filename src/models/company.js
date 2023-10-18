'use strict';

const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      company.belongsTo(models.user_account,{
        foreignKey: 'user_account_id',
        as: 'user_account'
      })
    }
  }
  company.init({
    id:{
      type: DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      primaryKey:true,
    },
    user_acount_id: DataTypes.UUID,
    company_name: DataTypes.STRING,
    company_type: DataTypes.INTEGER,
    company_size: DataTypes.STRING,
    logo: DataTypes.STRING,
    company_website_url: DataTypes.STRING,
    banner: DataTypes.STRING,
    company_sumary: DataTypes.TEXT,
    tax_code: DataTypes.STRING,
    address: DataTypes.STRING,
    contact_name: DataTypes.STRING,
    contact_phone: DataTypes.STRING,
    position: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'company',
    tableName: 'company'
  });
  return company;
};
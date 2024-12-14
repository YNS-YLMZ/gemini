import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config';

class Employee extends Model {
  public id!: number;
  public employeeId!: string;
  public firstName!: string;
  public lastName!: string;
  public salaryUSD!: number;
  public bonusUSD!: number;
  public bonusRUB!: number;
  public bankAdvanceRUB!: number;
  public advancePaymentRUB!: number;
  public bankSalaryRUB!: number;
  public cashSalaryRUB!: number;
  public exchangeRate!: number;
  public period!: string;
  public totalAmount!: number;
}

Employee.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  employeeId: {
    type: DataTypes.STRING(7),
    allowNull: false,
    validate: {
      len: [7, 7],
      isNumeric: true,
    },
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value: string) {
      this.setDataValue('firstName', value.toUpperCase());
    },
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value: string) {
      this.setDataValue('lastName', value.toUpperCase());
    },
  },
  salaryUSD: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  bonusUSD: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
  },
  bonusRUB: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
  },
  bankAdvanceRUB: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
  },
  advancePaymentRUB: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
  },
  bankSalaryRUB: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
  },
  cashSalaryRUB: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
  },
  exchangeRate: {
    type: DataTypes.DECIMAL(10, 4),
    allowNull: false,
  },
  period: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  totalAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Employee',
  indexes: [
    {
      unique: true,
      fields: ['employeeId', 'period'],
    },
  ],
});

export default Employee;
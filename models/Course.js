import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./User.js";
import Lesson from "./Lesson.js";

const Course = sequelize.define('Course', {
    name: {type: DataTypes.STRING, allowNull: false, validate: {len: [3, 255]}},
    description: {type: DataTypes.STRING, allowNull: true},
    start_date: {type: DataTypes.DATE, allowNull: false},
    end_date: {type: DataTypes.DATE, allowNull: false, validate: {
        isAfterStart(value) {
            if (this.start_date && value <= this.start_date) {
                throw new Error("A data deve ser maior que a data inicial");
            }
        }
    }},
     creator_id: {  
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
});

Course.belongsTo(User, {as: 'creator', foreignKey: 'creator_id'});
Course.hasMany(Lesson, {as: 'lessons', foreignKey: 'course_id'});

export default Course;
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Lesson = sequelize.define('Lesson', {
    title: {type: DataTypes.STRING, allowNull: false, validate:
        {
            len: [3, 255]
        }
    },
    status: {type: DataTypes.ENUM('draft', 'published'), allowNull: false, defaultValue: "draft"},
    video_url: {type: DataTypes.STRING, allowNull: true, validate: {
        isUrl: true
    }},
    course_id: {type: DataTypes.INTEGER, allowNull: false, references: {
        model: 'Courses',
        key: 'id'
    }}
});
export default Lesson;
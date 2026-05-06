import Lesson from '../models/Lesson.js';
import Course from '../models/Course.js';
import User from '../models/User.js';

//Criar aulas (somente o criador do curso pode fazer isso)
export const createLessons = async (req, res) => {
    try {
        const {title, status, video_url, course_id} = req.body;

        const course = await Course.findByPk(course_id);

        if (!course) {
            res.status(404).json("Curso não encontrado");
        }

        if(course.creator_id !== req.user.id) {
            res.status(403).json("Apenas o criador do curso pode adicionar aulas!");
        }
    
        const lesson = await Lesson.create({
            title,
            status: status || "draft",
            video_url,
            course_id
        });
        res.status(201).json({message: "Aula criada com sucesso!"});
    } catch (err) {
        res.status(500).json({error: 'Erro ao criar aulas!'});
    }
}

export const listLessons = async (req, res) => {
    try {
        const {courseId} = req.params;
        const course = await Course.findByPk(courseId);
        if (!course) {
            res.status(404).json({error: "Curso não encontrado"});
        }

        const lessons = await Lesson.findAll(
            {
                where: {course_id: courseId},
                order: [['createdAt', 'ASC']]
            }
        )
        res.json(lessons);
    } catch {
        res.status(500).json({error: "Erro ao listar cursos"});
    }
}

//Atualizar aulas (somente autenticados)
export const updateLesson = async (req, res) => {
    try {
        const {id} = req.params;
        const {title, status, video_url} = req.body;

        const lesson = await Lesson.findByPk(id);
        if (!lesson) {
            return res.status(404).json({error: 'Curso não encontrado'})
        }
        //Precisamos primeiro verificar se o usuário é dono do curso
        const course = await Course.findByPk(lesson.course_id);
        if (course.creator_id !== req.user.id) {
            res.status(403).json({error: "Somente o criador do curso pode atualizar cursos!"})
        }
        await lesson.update({title, status, video_url});
        res.status(201).json({message: "Aula atualizada com sucesso!"})
    } catch {
        res.status(500).json({error: "Erro ao atualizar curso"});
    }
}

//Excluir aulas
export const deleteLesson = async (req, res) => {
    try {
        const { id } = req.params;
        const lesson = await Lesson.findByPk(id);
        const course = await Course.findByPk(lesson.course_id);
        if (!lesson) {
            return res.status(404).json({error: "Aula não encontrada"});
        }

        //Verificaremos se o usuário é dono do curso
        if (course.creator_id !== req.user.id) {
            return res.status(403).json({error: "Apenas o criador do curso pode excluir aulas!"})
        }
        await lesson.destroy();
        res.json({message: "Aula excluída com sucesso!"});
    } catch {
        res.status(500).json({error: "Erro ao excluir aula!"});
    }
}

import Course from "../models/Course.js";
import User from "../models/User.js";

//Listar Cursos
export const listCourses = async (req, res) => {
    try {
        const courses = await Course.findAll({
            where: {creator_id: req.user.id},
            order: [['createdAt', 'DESC']]
        });
        res.json(courses);
    } catch (err) {
        res.status(500).json({error: 'Erro ao listar cursos'});
    }
}

//Criar Curso
export const createCourse = async (req, res) => {
    try {
        const {name, description, start_date, end_date} = req.body;
        const creator_id = req.user.id;

        const course = await Course.create({name, description, start_date, end_date, creator_id});
        res.status(201).json({message: 'Curso criado com sucesso!', course});
    } catch (err) {
        res.status(500).json({error: 'Erro ao criar curso'});
    }
};

//Atualizar curso
export const updateCourse = async (req, res) => {
    try {
        const course = await Course.findByPk(req.params.id);
        if (!course) return res.status(404).json({error: 'Curso não encontrado'})
        if (course.creator_id !== req.user.id) {
            return res.status(403).json({error: 'Você não tem permissão para editar esse curso!'});
        }
        await course.update(req.body);
        res.status(201).json({message: 'Curso atualizado com sucesso!'});
    } catch (err) {
        res.status(500).json({error: 'Erro ao atualizar curso'})
    }
}

//Excluir curso
export const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findByPk(req.params.id);
        if (!course) return res.status(404).json({error: "Curso não encontrado"});

        if (course.creator_id !== req.user.id) {
            return res.status(403).json({error: "Você não tem permissão para excluir este curso!"})
        }
        await course.destroy();
        res.json({message: "Curso excluído com sucesso!"});
    } catch (err) {
        res.status(500).json({error: 'Erro ao excluir curso'});
    }
};
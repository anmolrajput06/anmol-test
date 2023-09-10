const { Assignment } = require("../Model/Assignments.model")
const multer = require('multer');

const storage = multer.memoryStorage(); // Store the file in memory as Buffer
const upload = multer({ storage: storage });


class Assignments {

    async addAssignment(req, res) {
        const newAssignment = new Assignment({
            title: req.body.title,
            description: req.body.description,
            pdf: req.file.buffer, // Store the file buffer in the 'pdf' field
            user_id: req.body.user_id
        });


        try {
            await newAssignment.save();
            res.send({ msg: 'Assignment saved successfully', status: true });
        } catch (err) {
            console.error(err);
            res.status(500).send('Error saving assignment');
        }
    }

    async GetAssignment(req, res) {
        var user_id = req.body.user_id
        // console.log("user_id",user_id);
        var GetAllAssignment = await Assignment.find({ user_id: user_id })

        if (!GetAllAssignment) {
            res.send({ msg: 'Empty data', status: false, data: GetAllAssignment });

        }
        res.send({ msg: 'Get all Assignment', status: true, data: GetAllAssignment });

    }

    async updateassigment(req, res) {
        console.log("don");
        console.log("formData", req.body);
        // console.log("formData",req.file);
        const assignmentsId = req.body
        // console.log("user_id", user_id);
        const newData = {
            pdf: pdf,
        };
        var GetAllAssignment = await Assignment.findByIdAndUpdate(assignmentsId, newData)

        if (!GetAllAssignment) {
            res.send({ msg: 'Empty data', status: false, data: GetAllAssignment });

        }
        res.send({ msg: 'Update Assignment', status: true, data: GetAllAssignment });

    }


    async DeleteAssignment(req, res) {

        const { user_id } = req.body
        // console.log(user_id);
        var GetAllAssignment = await Assignment.find({ _id: user_id })
        // console.log(GetAllAssignment, 'GetAllAssignment');
        if (!GetAllAssignment || GetAllAssignment.length == 0) {
            return res.status(404).json({ message: 'Assignment not found' });
        }


        try {
            const result = await Assignment.deleteOne({ _id: user_id });

            if (result.deletedCount === 1) {
                console.log('Assignment deleted successfully');
                return res.status(201).send({ message: 'Assignment deleted successfully' });

            } else {
                console.log('Assignment not found');
                return res.status(404).json({ message: 'Assignment not found' });
            }
        } catch (error) {
            console.error('Error deleting Assignment:', error);
        }
    }



}


module.exports = new Assignments()
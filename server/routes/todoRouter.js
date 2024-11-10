import { Router } from 'express';
//import { emptyOrRows } from '../helper/utils.js'; 
//import {auth} from  '../helper/auth.js';
import { getTasks, postTask,deleteTask} from '../controllers/TaskController.js';

  

const router = Router();

router.get('/', getTasks);

router.post('/create', postTask);

router.delete('/delete/:id', deleteTask);




/*router.post('/create',auth, (req, res,next) => {
    const { description } = req.body;

    // Check if the description is empty or missing
    if (!description || description.trim() === '') {
        return res.status(500).json({ error: 'Task description cannot be empty.'});
    }
    pool.query('insert into task (description) values ($1) returning *',
    [description],
    (error, result) => {
        if (error) 
            return next(error);
            return res.status(200).json({id:result.rows[0].id});
    }
    )
})*/

/*router.delete('/delete/:id', (req, res, next) => {
    const { id } = req.params; // Destructure id from req.params
    pool.query('delete from task where id = $1', [id], (error, result) => {
        if (error) {
            return next(error); // Centralized error handling
        }
        return res.status(200).json({ id: id }); // Respond with the deleted id
    });
});*/


export default router;


import Joi from 'joi';
import Response  from './responses';


const addBookJoi = async (req, res, next) => {
  try {
    const data = await Joi.validate(req.body, bookSchema);
    if (data) return next();
  } catch (error) {
    if (error.details) {
        const errDestails = error.details.map((i) => ({
            message: i.message.replace(/['"]/g, ''),
          }));
        return res.status(400).send(Response.error(400, errDestails[0].message));
      }
    return res.status(500).send(Response.error(500, error.message)); 
  }
}


const bookSchema = Joi.object().keys({
  title: Joi.string().required().trim(),
  description: Joi.string().required().trim(),
});

export default { addBookJoi };
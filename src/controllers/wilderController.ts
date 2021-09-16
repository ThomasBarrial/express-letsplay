import { Request, Response } from 'express';
import { Router } from 'express';
import { wilderService } from '../services';
import createError from 'http-errors';

const WildersRouter = Router();

// * Wilders CRUD
const wilderController = {
  // Create Wilder must be done with unique name
  create: async (req: Request, res: Response) => {
    const createdWilder = await wilderService.create(req.body);
    res.status(201).json({ success: true, createdWilder });
  },
  read: async (req: Request, res: Response) => {
    const wilders = await wilderService.readAll();

    if (!wilders) {
      throw createError(400, `Users not found`);
    }
    res.json({ success: true, wilders });
  },
  readOne: async (req: Request, res: Response) => {
    const wilder = await wilderService.readOne(req.params.id);
    res.send(wilder);
  },
  update: async (req: Request, res: Response) => {
    const updatedWilder = await wilderService.update(req.params.id, req.body);
    res.json({ success: true, updatedWilder });
  },
  // addSkills: async (req: Request, res: Response) => {
  //   const wilderId: any = await WilderModel.findById(req.params.id);
  //   const currentSkills = wilderId?.skills;
  //   const skills = [
  //     ...currentSkills, req.body
  //   ];
  //   const wilderWithNewSkills = await WilderModel.findByIdAndUpdate(
  //     wilderId,
  //     skills,
  //   );
  //   res.json({ success: true, wilderWithNewSkills });
  // },
  delete: async (req: Request, res: Response) => {
    const deletedWilder = wilderService.delete(req.params.id);
    res.json({ success: true, deletedWilder });
  }
};

// Wilders Routes
WildersRouter.post('/', wilderController.create);
WildersRouter.get('/', wilderController.read);
WildersRouter.get('/:id', wilderController.readOne);
WildersRouter.patch('/:id', wilderController.update);
WildersRouter.delete('/:id', wilderController.delete);

export { WildersRouter };
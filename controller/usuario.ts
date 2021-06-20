import  express, {Request, Response}   from 'express';

export const getUsuarios = (req: Request, res: Response) =>{
    res.json({
        msg: 'Get usuarios'
    });
}

export const getUsuario = (req: Request, res: Response) =>{
    const {id} = req.params;
    res.json({
        msg: 'Get usuarios'
    });
}

export const postUsuario = (req: Request, res: Response) =>{
    const {body} = req;
    res.json({
        msg: 'Get usuarios'
    });
}

export const putUsuario = (req: Request, res: Response) =>{
    const {body} = req;
    const {id} = req.params;
    res.json({
        msg: 'Get usuarios'
    });
}
export const deleteUsuario = (req: Request, res: Response) =>{
    const {id} = req.params;
    res.json({
        msg: 'Get usuarios'
    });
}
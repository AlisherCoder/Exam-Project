import Filial from "../models/filial.model.js";
import Major from "../models/major.model.js";
import Reception from "../models/reseption.model.js";
import User from "../models/user.model.js";
import {ReceptionPOST, ReceptionPATCH} from "../validations/reception.validation.js";

export async function findAll (req,res) {
    try{
        let data = await Reception.findAll({include: [Filial,User, Major]})
        if(data.length == 0){
            return res.status(404).json({message: "Not Fount"});
        }
        res.status(200).json({data})
    }catch(e){
        res.status(500).json({message: e.message});
    }   
};

export async function findOne (req,res){
    try{
        let {id} = req.params;
        let data = await Reception.findByPk(id, {include: [Filial, User, Major]})
        if(!data){
            return res.status(404).json({message: "Not Fount"});
        }
        res.status(200).json(data);
    }catch(e){
        res.status(500).json({message: e.message})
    }
};
export async function findBySorted (req,res) {
    try{
        let {limit, offset, asc, desc, ...ress} = req.query;
        let query = {}

        query.limit = limit ? parseInt(limit) : 10;
        query.offset = offset ? parseInt((offset) - 1) * query.limit : 0;
        if(asc){
            let val = Object.values(asc);
            if([val]){
                query.order = [[`${val}`, "ASC"]];
            }
        }
        else if(desc){
            let val = Object.values(desc);
            if([val]){
                query.order = [[`${val}`, "DESC"]];
            }
        }
        if(ress.sort){
            let val = Object.values(ress.sort);
            if([val]){
                query.sort = {[Op.like]: `%${val}%`}
            }
        }
        let data = await Reception.findAll(query);
        if(data.length == 0){
            return res.status(404).json({message: "Limit yetarliy emas"})
        }
        res.status(200).json({data});

    }catch(e){
        res.status(500).json({message: e.message});
    }
}
export async function create (req,res) {
    try{
        let {error, value} = ReceptionPOST.validate(req.body);
        if(error){
            return res.status(401).json({message: error.message});
        }
        let data = await Reception.create(value);
        res.status(201).json({data})
    }catch(e){
        console.log(e);
        res.status(500).json({message: e.message});
    }
};
export async function update (req,res) {
    try{
        let {id} = req.params;
        let {error, value} = ReceptionPATCH.validate(req.body);
        if(error){
            return res.status(401).json({message: error.message})
        }
        let data = await Reception.findByPk(id);
        if(!data){
            return res.status(404).json({message: "Not Fount By id"})
        }
        await Reception.update(value, {where: {id}});
        res.status(200).json({message: "Update"})
    }catch(e){
        res.status(500).json({message:e.message});
    }
};
export async function remove (req,res) {
    try{
        let {id} = req.params;
        let data = await Field.findByPk(id);
        if(!data){
            return res.status(404).json({message: "Not Found filed"})
        }
        await Reception.destroy({where: { id }});
        res.status(200).json({message: "delete"})
    }catch(e){
        res.status(500).json({message: e.message});
    }
};
